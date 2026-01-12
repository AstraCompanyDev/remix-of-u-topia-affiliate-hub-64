import { useEnvironment } from '@/hooks/useEnvironment';
import { AlertTriangle } from 'lucide-react';

interface TestModeBadgeProps {
  className?: string;
}

export function TestModeBadge({ className = '' }: TestModeBadgeProps) {
  const { isTestMode, isLoading } = useEnvironment();

  if (isLoading || !isTestMode) {
    return null;
  }

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 bg-amber-500 text-amber-950 py-1 px-4 text-center text-sm font-medium ${className}`}>
      <div className="container mx-auto flex items-center justify-center gap-2">
        <AlertTriangle className="w-4 h-4" />
        <span>TEST MODE — Data shown is for testing purposes only</span>
        <AlertTriangle className="w-4 h-4" />
      </div>
    </div>
  );
}

export function TestModeInlineIndicator() {
  const { isTestMode, isLoading } = useEnvironment();

  if (isLoading || !isTestMode) {
    return null;
  }

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/30 text-xs font-medium">
      <AlertTriangle className="w-3 h-3" />
      TEST
    </span>
  );
}
