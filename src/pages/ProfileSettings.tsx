import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, User, Check, Loader2, Bell, Trash2, AlertTriangle } from "lucide-react";
import { maleAvatars, femaleAvatars, Avatar as AvatarType } from "@/data/avatarLibrary";
import logoDark from "@/assets/u-topia-logo-dark.png";

interface NotificationPreferences {
  marketing: boolean;
  referral_updates: boolean;
  commission_alerts: boolean;
  platform_news: boolean;
}

const defaultPreferences: NotificationPreferences = {
  marketing: true,
  referral_updates: true,
  commission_alerts: true,
  platform_news: true,
};

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [selectedAvatarId, setSelectedAvatarId] = useState<string | null>(null);
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>(defaultPreferences);

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
        .select('full_name, avatar_url, notification_preferences')
        .eq('id', session.user.id)
        .maybeSingle();
      
      if (profile) {
        setFullName(profile.full_name || '');
        setAvatarUrl(profile.avatar_url);
        
        // Load notification preferences
        if (profile.notification_preferences) {
          const prefs = profile.notification_preferences as Record<string, unknown>;
          setNotificationPreferences({
            marketing: typeof prefs.marketing === 'boolean' ? prefs.marketing : defaultPreferences.marketing,
            referral_updates: typeof prefs.referral_updates === 'boolean' ? prefs.referral_updates : defaultPreferences.referral_updates,
            commission_alerts: typeof prefs.commission_alerts === 'boolean' ? prefs.commission_alerts : defaultPreferences.commission_alerts,
            platform_news: typeof prefs.platform_news === 'boolean' ? prefs.platform_news : defaultPreferences.platform_news,
          });
        }
        
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
      
      // Save avatar URL to database immediately
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: urlWithCacheBuster, updated_at: new Date().toISOString() })
        .eq('id', user.id);
      
      if (updateError) throw updateError;
      
      setAvatarUrl(urlWithCacheBuster);
      setSelectedAvatarId(null);
      toast.success('Avatar uploaded and saved');
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

  const handleNotificationChange = (key: keyof NotificationPreferences, value: boolean) => {
    setNotificationPreferences(prev => ({
      ...prev,
      [key]: value,
    }));
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
          notification_preferences: notificationPreferences as unknown as Record<string, boolean>,
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

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== 'DELETE') {
      toast.error('Please type DELETE to confirm');
      return;
    }

    setDeleting(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        toast.error('Please log in again to delete your account');
        return;
      }

      const response = await supabase.functions.invoke('delete-account', {
        body: { confirmation: 'DELETE' },
      });

      if (response.error) {
        throw new Error(response.error.message || 'Failed to delete account');
      }

      toast.success('Account deleted successfully');
      await supabase.auth.signOut({ scope: 'local' });
      navigate('/');
    } catch (error: any) {
      console.error('Delete error:', error);
      toast.error(error.message || 'Failed to delete account');
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
      setDeleteConfirmation("");
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

            {/* Notification Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Email Notifications
                </CardTitle>
                <CardDescription>Choose what emails you'd like to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="commission_alerts">Commission Alerts</Label>
                    <p className="text-xs text-muted-foreground">Get notified when you earn commissions</p>
                  </div>
                  <Switch
                    id="commission_alerts"
                    checked={notificationPreferences.commission_alerts}
                    onCheckedChange={(checked) => handleNotificationChange('commission_alerts', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="referral_updates">Referral Updates</Label>
                    <p className="text-xs text-muted-foreground">Updates about your referral activity</p>
                  </div>
                  <Switch
                    id="referral_updates"
                    checked={notificationPreferences.referral_updates}
                    onCheckedChange={(checked) => handleNotificationChange('referral_updates', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="platform_news">Platform News</Label>
                    <p className="text-xs text-muted-foreground">Important updates about U-topia</p>
                  </div>
                  <Switch
                    id="platform_news"
                    checked={notificationPreferences.platform_news}
                    onCheckedChange={(checked) => handleNotificationChange('platform_news', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketing">Marketing & Promotions</Label>
                    <p className="text-xs text-muted-foreground">Special offers and promotional content</p>
                  </div>
                  <Switch
                    id="marketing"
                    checked={notificationPreferences.marketing}
                    onCheckedChange={(checked) => handleNotificationChange('marketing', checked)}
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

            {/* Danger Zone */}
            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription>Irreversible actions that affect your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border border-destructive/30 rounded-lg bg-destructive/5">
                  <div>
                    <h4 className="font-medium text-foreground">Delete Account</h4>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                  </div>
                  <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="gap-2 shrink-0">
                        <Trash2 className="h-4 w-4" />
                        Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2 text-destructive">
                          <AlertTriangle className="h-5 w-5" />
                          Delete Your Account?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="space-y-3">
                          <p>
                            This action is <strong>permanent and irreversible</strong>. All your data will be deleted, including:
                          </p>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            <li>Your profile and personal information</li>
                            <li>Referral history and links</li>
                            <li>Commission records</li>
                            <li>Purchase history</li>
                          </ul>
                          <p className="pt-2">
                            To confirm, please type <strong>DELETE</strong> below:
                          </p>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <Input
                        value={deleteConfirmation}
                        onChange={(e) => setDeleteConfirmation(e.target.value.toUpperCase())}
                        placeholder="Type DELETE to confirm"
                        className="font-mono"
                      />
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDeleteConfirmation("")}>
                          Cancel
                        </AlertDialogCancel>
                        <Button
                          variant="destructive"
                          onClick={handleDeleteAccount}
                          disabled={deleteConfirmation !== 'DELETE' || deleting}
                        >
                          {deleting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Deleting...
                            </>
                          ) : (
                            'Delete My Account'
                          )}
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
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
