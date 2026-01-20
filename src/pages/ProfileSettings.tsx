import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Camera, Upload, User, Check, Loader2 } from "lucide-react";
import { maleAvatars, femaleAvatars, Avatar as AvatarType } from "@/data/avatarLibrary";
import logoDark from "@/assets/u-topia-logo-dark.png";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [selectedAvatarId, setSelectedAvatarId] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        navigate('/auth');
        return;
      }
      
      setUser(session.user);
      
      // Fetch profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', session.user.id)
        .maybeSingle();
      
      if (profile) {
        setFullName(profile.full_name || '');
        setAvatarUrl(profile.avatar_url);
        
        // Check if it's a library avatar
        const allAvatars = [...maleAvatars, ...femaleAvatars];
        const libraryAvatar = allAvatars.find(a => a.url === profile.avatar_url);
        if (libraryAvatar) {
          setSelectedAvatarId(libraryAvatar.id);
        }
      }
      
      setLoading(false);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/auth');
      }
    });

    checkAuth();
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      toast.error('Please upload a JPG or PNG image');
      return;
    }

    // Validate file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be less than 2MB');
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/avatar.${fileExt}`;

      // Delete existing avatar if exists
      await supabase.storage.from('avatars').remove([`${user.id}/avatar.jpg`, `${user.id}/avatar.png`]);

      // Upload new avatar
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Add cache-buster
      const urlWithCacheBuster = `${publicUrl}?t=${Date.now()}`;
      
      setAvatarUrl(urlWithCacheBuster);
      setSelectedAvatarId(null);
      toast.success('Avatar uploaded successfully');
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error('Failed to upload avatar');
    } finally {
      setUploading(false);
    }
  };

  const handleAvatarSelect = (avatar: AvatarType) => {
    setAvatarUrl(avatar.url);
    setSelectedAvatarId(avatar.id);
  };

  const handleSave = async () => {
    if (!user) return;
    
    setSaving(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      toast.success('Profile updated successfully');
    } catch (error: any) {
      console.error('Save error:', error);
      toast.error('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const getInitials = () => {
    if (fullName) {
      return fullName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your account information and preferences</p>
        </div>

        <div className="grid gap-8 md:grid-cols-[280px_1fr]">
          {/* Current Avatar Preview */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-lg">Your Avatar</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <Avatar className="h-32 w-32 border-4 border-primary/20">
                <AvatarImage src={avatarUrl || undefined} alt="Profile" />
                <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              
              <div className="relative w-full">
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/jpeg,image/png"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => document.getElementById('avatar-upload')?.click()}
                  disabled={uploading}
                >
                  {uploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  Upload Photo
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  JPG or PNG, max 2MB
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Profile Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Avatar Library */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Avatar Library
                </CardTitle>
                <CardDescription>Choose from our collection of avatars</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="male" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="male">Male</TabsTrigger>
                    <TabsTrigger value="female">Female</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="male">
                    <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 gap-2 max-h-[300px] overflow-y-auto p-1">
                      {maleAvatars.map((avatar) => (
                        <button
                          key={avatar.id}
                          onClick={() => handleAvatarSelect(avatar)}
                          className={`relative rounded-full p-1 transition-all hover:scale-105 ${
                            selectedAvatarId === avatar.id
                              ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                              : 'hover:ring-2 hover:ring-muted-foreground/30'
                          }`}
                        >
                          <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                            <AvatarImage src={avatar.url} alt={avatar.id} />
                          </Avatar>
                          {selectedAvatarId === avatar.id && (
                            <div className="absolute -top-1 -right-1 bg-primary rounded-full p-0.5">
                              <Check className="h-3 w-3 text-primary-foreground" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="female">
                    <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 gap-2 max-h-[300px] overflow-y-auto p-1">
                      {femaleAvatars.map((avatar) => (
                        <button
                          key={avatar.id}
                          onClick={() => handleAvatarSelect(avatar)}
                          className={`relative rounded-full p-1 transition-all hover:scale-105 ${
                            selectedAvatarId === avatar.id
                              ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                              : 'hover:ring-2 hover:ring-muted-foreground/30'
                          }`}
                        >
                          <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                            <AvatarImage src={avatar.url} alt={avatar.id} />
                          </Avatar>
                          {selectedAvatarId === avatar.id && (
                            <div className="absolute -top-1 -right-1 bg-primary rounded-full p-0.5">
                              <Check className="h-3 w-3 text-primary-foreground" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <img src={logoDark} alt="U-topia" className="h-8 mx-auto mb-4" />
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} U-topia. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProfileSettings;
