import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

type AdditionalInfoFormData = {
  major: string;
  educationLevel: string;
  previousExperience: string;
  usedScinitoBefore: boolean;
};

const AdditionalInfoForm = ({
  isOpen,
  onClose,
  registrationId,
}: {
  isOpen: boolean;
  onClose: () => void;
  registrationId: string | null;
}) => {
  const form = useForm<AdditionalInfoFormData>({
    defaultValues: {
      major: '',
      educationLevel: '',
      previousExperience: '',
      usedScinitoBefore: false,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: AdditionalInfoFormData) => {
    if (!registrationId) {
      toast.error("خطا: اطلاعات ثبت‌نام معتبر نیست");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('info_registeration')
        .insert([{ ...data, registration_id: registrationId }]);

      if (error) {
        toast.error("خطا در ثبت اطلاعات تکمیلی. لطفا دوباره تلاش کنید");
      } else {
        toast.success("اطلاعات تکمیلی شما با موفقیت ثبت شد");
        onClose();
      }
    } catch {
      toast.error("خطا در ثبت اطلاعات. لطفا دوباره تلاش کنید");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 farsi">
      <h3 className="text-2xl font-bold mb-6 text-webinar-dark">اطلاعات تکمیلی</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {/* رشته تحصیلی */}
          <FormField
            control={form.control}
            name="major"
            rules={{ required: "رشته تحصیلی الزامی است" }}
            render={({ field }) => (
              <FormItem>
                <label htmlFor="major" className="block mb-2 text-sm font-medium text-gray-700">
                  رشته تحصیلی
                </label>
                <FormControl>
                  <Input
                    id="major"
                    placeholder="مثال: مهندسی کامپیوتر"
                    className="text-right"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-right text-red-500 text-xs mt-1" />
              </FormItem>
            )}
          />

          {/* مقطع تحصیلی */}
          <FormField
            control={form.control}
            name="educationLevel"
            rules={{ required: "مقطع تحصیلی الزامی است" }}
            render={({ field }) => (
              <FormItem>
                <label htmlFor="educationLevel" className="block mb-2 text-sm font-medium text-gray-700">
                  مقطع تحصیلی
                </label>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="انتخاب مقطع تحصیلی" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bachelors">لیسانس</SelectItem>
                      <SelectItem value="Masters">فوق‌لیسانس</SelectItem>
                      <SelectItem value="PhD">دکترا</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-right text-red-500 text-xs mt-1" />
              </FormItem>
            )}
          />

          {/* آشنایی قبلی با SCINiTO */}
          <FormField
            control={form.control}
            name="usedScinitoBefore"
            rules={{ required: "آیا قبلاً از SCINiTO استفاده کرده‌اید؟" }}
            render={({ field }) => (
              <FormItem>
                <label htmlFor="usedScinitoBefore" className="block mb-2 text-sm font-medium text-gray-700">
                  آیا قبلاً از SCINiTO استفاده کرده‌اید؟
                </label>
                <FormControl>
                  <Select
                    onValueChange={(val) => field.onChange(val === "true")}
                    value={field.value ? "true" : "false"}
                  >
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="انتخاب وضعیت" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">بله</SelectItem>
                      <SelectItem value="false">خیر</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-right text-red-500 text-xs mt-1" />
              </FormItem>
            )}
          />

          {/* تجربیات قبلی */}
          <FormField
            control={form.control}
            name="previousExperience"
            render={({ field }) => (
              <FormItem>
                <label htmlFor="previousExperience" className="block mb-2 text-sm font-medium text-gray-700">
                  تجربیات یا اطلاعات قبلی شما در این حوزه
                </label>
                <FormControl>
                  <Input
                    id="previousExperience"
                    placeholder="تجربیات خود را وارد کنید"
                    className="text-right"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-right text-red-500 text-xs mt-1" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-webinar-primary hover:bg-webinar-accent text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "در حال ثبت..." : "ثبت اطلاعات"}
          </Button>
        </form>
      </Form>

      <Button className="mt-4 w-full" variant="outline" onClick={onClose}>
        بستن
      </Button>
    </div>
  );
};

export default AdditionalInfoForm;
