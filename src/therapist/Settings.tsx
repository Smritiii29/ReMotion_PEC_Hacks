import {
  User,
  Bell,
  Lock,
  Palette,
  HelpCircle,
  ChevronRight,
} from "lucide-react";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ================= TYPES ================= */

interface SettingSectionProps {
  icon: typeof User;
  title: string;
  description: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

/* ================= COMPONENTS ================= */

function SettingSection({
  icon: Icon,
  title,
  description,
  children,
  onClick,
}: SettingSectionProps) {
  const Wrapper = onClick ? "button" : "div";

  return (
    <Wrapper
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between rounded-2xl border border-border bg-card p-5 text-left transition-all duration-200",
        onClick && "cursor-pointer hover:border-primary/20 hover:shadow-card"
      )}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-medium text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      {children ?? (onClick && (
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      ))}
    </Wrapper>
  );
}

/* ================= PAGE ================= */

export default function Settings() {
  return (
    <div className="max-w-3xl space-y-6 lg:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
          Settings
        </h1>
        <p className="mt-1 text-muted-foreground">
          Manage your account and preferences.
        </p>
      </div>

      {/* Account */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Account
        </h2>
        <div className="space-y-3">
          <SettingSection
            icon={User}
            title="Profile Information"
            description="Update your name, email, and profile photo"
            onClick={() => {}}
          />
          <SettingSection
            icon={Lock}
            title="Password & Security"
            description="Manage your password and security settings"
            onClick={() => {}}
          />
        </div>
      </div>

      {/* Notifications */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Notifications
        </h2>
        <div className="space-y-3">
          <SettingSection
            icon={Bell}
            title="Email Notifications"
            description="Receive updates about patient activity"
          >
            <Switch defaultChecked />
          </SettingSection>
          <SettingSection
            icon={Bell}
            title="Missed Session Alerts"
            description="Get notified when patients miss sessions"
          >
            <Switch defaultChecked />
          </SettingSection>
          <SettingSection
            icon={Bell}
            title="Weekly Summary"
            description="Receive weekly patient progress reports"
          >
            <Switch />
          </SettingSection>
        </div>
      </div>

      {/* Preferences */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Preferences
        </h2>
        <div className="space-y-3">
          <SettingSection
            icon={Palette}
            title="Appearance"
            description="Customize the look and feel"
            onClick={() => {}}
          />
        </div>
      </div>

      {/* Support */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Support
        </h2>
        <div className="space-y-3">
          <SettingSection
            icon={HelpCircle}
            title="Help & Support"
            description="Get help or contact our support team"
            onClick={() => {}}
          />
        </div>
      </div>

      {/* Danger Zone */}
      <div className="border-t border-border pt-6">
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-5">
          <h3 className="mb-2 font-medium text-destructive">
            Danger Zone
          </h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <Button
            variant="outline"
            className="border-destructive/30 text-destructive hover:bg-destructive/10"
          >
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}
