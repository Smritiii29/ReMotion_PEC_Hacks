import { useState } from "react";
import { X, UserPlus, Mail, Phone, User, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface AddPatientDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onPatientAdded: (patient: {
    name: string;
    email: string;
    phone?: string;
  }) => void;
}

export function AddPatientDrawer({ isOpen, onClose, onPatientAdded }: AddPatientDrawerProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    onPatientAdded({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
    });

    toast({
      title: "Patient Added Successfully",
      description: `Login credentials have been sent to ${formData.email}`,
    });

    // Reset after showing success
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({ name: "", email: "", phone: "" });
      onClose();
    }, 2000);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ name: "", email: "", phone: "" });
      setShowSuccess(false);
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-full max-w-md bg-card shadow-elevated z-50 transition-transform duration-300 ease-out flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Add New Patient</h2>
              <p className="text-sm text-muted-foreground">Onboard a patient to ReMotion</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {showSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-success" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Patient Added!
              </h3>
              <p className="text-muted-foreground max-w-xs">
                Login credentials have been sent to the patient's email address.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Patient Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Patient Name <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Enter patient's full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10 h-12 rounded-xl"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="patient@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 h-12 rounded-xl"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number <span className="text-muted-foreground">(optional)</span>
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="pl-10 h-12 rounded-xl"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Info box */}
              <div className="bg-info/5 border border-info/20 rounded-xl p-4">
                <div className="flex gap-3">
                  <Send className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-info">Automatic Credential Delivery</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Login credentials will be automatically sent to the patient's email address. 
                      They can then access ReMotion and begin their recovery journey.
                    </p>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        {!showSuccess && (
          <div className="p-6 border-t border-border bg-muted/30">
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-12 rounded-xl"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 h-12 rounded-xl"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Adding...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    Add Patient
                  </span>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
