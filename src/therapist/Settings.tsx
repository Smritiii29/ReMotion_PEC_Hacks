import { useState } from "react";
import {
  User,
  Bell,
  Lock,
  Palette,
  HelpCircle,
  ChevronRight,
  MapPin,
  Stethoscope,
  Briefcase,
  Calendar,
} from "lucide-react";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

/* ================= TYPES ================= */

interface SettingSectionProps {
  icon: typeof User;
  title: string;
  description: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

// The Data Schema based on your request
interface PhysiotherapistProfile {
  bio: string;
  clinicInfo: {
    address: string;
    clinicName: string;
  };
  createdAt: string;
  email: string;
  licenseNumber: string;
  name: string;
  patients_assigned: string[];
  phoneNumber: string;
  role: string;
  specialization: string;
  updatedAt: string;
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
  // 1. State for the Dialog Open/Close
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // 2. State for the Profile Data (Initialized with your example data)
  const [profile, setProfile] = useState<PhysiotherapistProfile>({
    bio: "15+ years experience in elbow and shoulder injuries",
    clinicInfo: {
      address: "MG Road, Mumbai",
      clinicName: "Elite Upper Limb Rehab",
    },
    createdAt: "26 December 2025 at 15:50:06 UTC+5:30",
    email: "albertgrey@test.com",
    licenseNumber: "A342T",
    name: "Albert Grey",
    patients_assigned: ["97wxvuly2IbWB9O2qWYNLCXVA0J2"],
    phoneNumber: "1234567890",
    role: "physiotherapist",
    specialization: "Upper Limb & Shoulder Rehabilitation",
    updatedAt: "26 December 2025 at 15:50:06 UTC+5:30",
  });

  // Handle standard input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle nested clinicInfo changes
  const handleClinicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      clinicInfo: {
        ...prev.clinicInfo,
        [name]: value,
      },
    }));
  };

  const handleSave = () => {
    // API Call to update profile would go here
    console.log("Saving updated profile:", profile);
    setIsProfileOpen(false);
  };

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
            description="Update your name, bio, and clinic details"
            onClick={() => setIsProfileOpen(true)}
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
          <h3 className="mb-2 font-medium text-destructive">Danger Zone</h3>
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

      {/* ================= OVERLAY: PROFILE EDIT ================= */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="max-h-[90vh] w-full max-w-2xl overflow-y-auto sm:rounded-2xl">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl">Edit Profile</DialogTitle>
            <DialogDescription>
              Update your personal and clinic information visible to patients.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-2">
            {/* Personal Details */}
            <div className="space-y-4">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-primary">
                <User className="h-4 w-4" /> Personal Information
              </h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={profile.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role (Read Only)</Label>
                  <Input
                    id="role"
                    value={profile.role}
                    disabled
                    className="bg-muted capitalize"
                  />
                </div>
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Professional Details */}
            <div className="space-y-4">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-primary">
                <Stethoscope className="h-4 w-4" /> Professional Details
              </h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input
                    id="specialization"
                    name="specialization"
                    value={profile.specialization}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">License Number</Label>
                  <Input
                    id="licenseNumber"
                    name="licenseNumber"
                    value={profile.licenseNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    value={profile.bio}
                    onChange={handleInputChange}
                    className="resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Clinic Details */}
            <div className="space-y-4">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-primary">
                <Briefcase className="h-4 w-4" /> Clinic Information
              </h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="clinicName">Clinic Name</Label>
                  <Input
                    id="clinicName"
                    name="clinicName"
                    value={profile.clinicInfo.clinicName}
                    onChange={handleClinicChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="address"
                      name="address"
                      className="pl-9"
                      value={profile.clinicInfo.address}
                      onChange={handleClinicChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Metadata Footer (Read Only) */}
            <div className="mt-2 flex flex-col gap-2 rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3" />
                <span>Joined: {profile.createdAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-3 w-3" />
                <span>
                  Active Patients Assigned: {profile.patients_assigned.length}
                </span>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6 gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsProfileOpen(false)}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button onClick={handleSave} className="rounded-xl">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}