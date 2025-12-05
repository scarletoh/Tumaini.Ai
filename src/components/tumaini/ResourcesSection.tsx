import { CrisisResourceCard } from './CrisisResourceCard';
import { crisisResources } from '@/data/mock-data';
import { Phone, Shield, FileText, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ResourcesSection() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-display font-bold text-foreground">Help & Resources</h2>
        <p className="text-muted-foreground mt-2">
          Access support services and manage your privacy settings
        </p>
      </div>

      {/* Emergency Banner */}
      <div className="p-6 bg-destructive/10 border border-destructive/30 rounded-2xl">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-destructive/20 rounded-xl">
            <Phone className="w-6 h-6 text-destructive" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">Need immediate help?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              If you're in crisis or having thoughts of self-harm, please reach out immediately.
            </p>
            <Button variant="destructive" className="mt-4" asChild>
              <a href="tel:1199">Call Kenya Red Cross: 1199</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Crisis Resources */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Mental Health Resources</h3>
        <div className="space-y-3">
          {crisisResources.map((resource) => (
            <CrisisResourceCard key={resource.name} resource={resource} />
          ))}
        </div>
      </div>

      {/* Privacy & Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 bg-card rounded-xl border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Privacy Center</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Control what data is collected and who has access to your information.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground mb-4">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-risk-low" />
              Voice data: Encrypted & anonymized
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-risk-low" />
              Behavior patterns: On-device processing
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-risk-low" />
              Predictions: GDPR compliant
            </li>
          </ul>
          <Button variant="outline" size="sm" className="w-full">
            Manage Privacy Settings
          </Button>
        </div>

        <div className="p-6 bg-card rounded-xl border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Settings className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Support Network</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Add trusted contacts who can receive alerts if your risk level changes significantly.
          </p>
          <div className="space-y-2 mb-4">
            <div className="p-3 bg-muted/50 rounded-lg flex items-center justify-between">
              <span className="text-sm text-foreground">No contacts added</span>
              <Button variant="ghost" size="sm">Add</Button>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full">
            Configure Alerts
          </Button>
        </div>

        <div className="p-6 bg-card rounded-xl border border-border md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Your Data</h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" size="sm">
              Export My Data
            </Button>
            <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/10">
              Delete All Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
