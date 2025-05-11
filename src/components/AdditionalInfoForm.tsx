
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface AdditionalInfoFormProps {
  isOpen: boolean;
  onClose: () => void;
  registrationId: string | null;
}

type UserRole = "student" | "faculty" | "librarian" | "other";

const AdditionalInfoForm = ({ isOpen, onClose, registrationId }: AdditionalInfoFormProps) => {
  const [role, setRole] = useState<UserRole>("student");
  const [university, setUniversity] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registrationId) {
      toast.error("خطا در ذخیره‌سازی اطلاعات تکمیلی");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from("webinar_registrations")
        .update({
          role,
          university,
          field_of_study: fieldOfStudy,
        })
        .eq("id", registrationId);

      if (error) {
        console.error("Supabase error:", error);
        toast.error("خطا در ذخیره‌سازی اطلاعات تکمیلی");
      } else {
        toast.success("اطلاعات تکمیلی با موفقیت ثبت شد");
        onClose();
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("خطا در ذخیره‌سازی اطلاعات تکمیلی");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md farsi" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-right">اطلاعات تکمیلی</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <h4 className="mb-3 font-medium">شما در کدام نقش شرکت می‌کنید؟</h4>
              <RadioGroup 
                value={role} 
                onValueChange={(value) => setRole(value as UserRole)} 
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center justify-end space-x-2 space-x-reverse">
                  <Label htmlFor="role-student">دانشجو</Label>
                  <RadioGroupItem value="student" id="role-student" />
                </div>
                <div className="flex items-center justify-end space-x-2 space-x-reverse">
                  <Label htmlFor="role-faculty">عضو هیئت علمی</Label>
                  <RadioGroupItem value="faculty" id="role-faculty" />
                </div>
                <div className="flex items-center justify-end space-x-2 space-x-reverse">
                  <Label htmlFor="role-librarian">کتابدار</Label>
                  <RadioGroupItem value="librarian" id="role-librarian" />
                </div>
                <div className="flex items-center justify-end space-x-2 space-x-reverse">
                  <Label htmlFor="role-other">سایر</Label>
                  <RadioGroupItem value="other" id="role-other" />
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <label htmlFor="university" className="block mb-2 text-sm font-medium text-gray-700">
                دانشگاه یا سازمان شما
              </label>
              <Input
                id="university"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                placeholder="نام دانشگاه یا سازمان خود را وارد کنید"
                className="text-right"
              />
            </div>
            
            <div>
              <label htmlFor="fieldOfStudy" className="block mb-2 text-sm font-medium text-gray-700">
                رشته تحصیلی یا تخصص
              </label>
              <Input
                id="fieldOfStudy"
                value={fieldOfStudy}
                onChange={(e) => setFieldOfStudy(e.target.value)}
                placeholder="رشته تحصیلی یا تخصص خود را وارد کنید"
                className="text-right"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              انصراف
            </Button>
            <Button 
              type="submit" 
              className="bg-webinar-primary hover:bg-webinar-accent"
              disabled={isSubmitting}
            >
              {isSubmitting ? "در حال ثبت..." : "ثبت اطلاعات"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdditionalInfoForm;
