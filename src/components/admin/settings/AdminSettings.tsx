import { PackagesSettings } from './PackagesSettings';
import { AdminWhitelistSettings } from './AdminWhitelistSettings';
import { PlatformSettings } from './PlatformSettings';
import { AuditLog } from './AuditLog';
import { TestEnvironmentSettings } from './TestEnvironmentSettings';
import { Separator } from '@/components/ui/separator';

export function AdminSettings() {
  return (
    <div className="space-y-12">
      <TestEnvironmentSettings />
      
      <Separator />
      
      <PackagesSettings />
      
      <Separator />
      
      <AdminWhitelistSettings />
      
      <Separator />
      
      <PlatformSettings />
      
      <Separator />
      
      <AuditLog />
    </div>
  );
}
