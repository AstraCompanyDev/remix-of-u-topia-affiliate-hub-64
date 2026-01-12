import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type EnvironmentMode = 'test' | 'production';

interface UseEnvironmentResult {
  mode: EnvironmentMode;
  isTestMode: boolean;
  isProductionMode: boolean;
  isLoading: boolean;
  error: string | null;
  setMode: (mode: EnvironmentMode) => Promise<boolean>;
  refetch: () => Promise<void>;
}

export function useEnvironment(): UseEnvironmentResult {
  const [mode, setModeState] = useState<EnvironmentMode>('test');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMode = useCallback(async () => {
    try {
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('platform_settings')
        .select('value')
        .eq('key', 'environment_mode')
        .maybeSingle();

      if (fetchError) {
        console.error('Error fetching environment mode:', fetchError);
        setError('Failed to fetch environment mode');
        return;
      }

      if (data?.value) {
        // Value is stored as JSON string, parse it
        const parsedMode = typeof data.value === 'string' 
          ? data.value.replace(/"/g, '') 
          : data.value;
        if (parsedMode === 'test' || parsedMode === 'production') {
          setModeState(parsedMode);
        }
      }
    } catch (err) {
      console.error('Error in fetchMode:', err);
      setError('Failed to fetch environment mode');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setMode = useCallback(async (newMode: EnvironmentMode): Promise<boolean> => {
    try {
      const { error: updateError } = await supabase
        .from('platform_settings')
        .update({ 
          value: JSON.stringify(newMode),
          updated_at: new Date().toISOString()
        })
        .eq('key', 'environment_mode');

      if (updateError) {
        console.error('Error updating environment mode:', updateError);
        setError('Failed to update environment mode');
        return false;
      }

      setModeState(newMode);
      return true;
    } catch (err) {
      console.error('Error in setMode:', err);
      setError('Failed to update environment mode');
      return false;
    }
  }, []);

  useEffect(() => {
    fetchMode();
  }, [fetchMode]);

  return {
    mode,
    isTestMode: mode === 'test',
    isProductionMode: mode === 'production',
    isLoading,
    error,
    setMode,
    refetch: fetchMode,
  };
}
