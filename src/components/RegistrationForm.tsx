
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";
import AdditionalInfoForm from './AdditionalInfoForm';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Select } from "@/components/ui/select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Google Apps Script endpoint URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyii5TXDyImk5eO3PDRny_wKE22EQYmwMfWYgyVJTP5sVR7n4EVV1et7QGwXz17PCsr/exec";

type RegistrationFormData = {
  name: string;
  email: string;
  phone: string;
  role: string;
  university: string;
};

const RegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [registrationId, setRegistrationId] = useState<string | null>(null);

  const form = useForm<RegistrationFormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      role: '',
      university: '',
    },
  });

  // Function to send data to Google Sheets
  const sendToGoogleSheets = async (data: RegistrationFormData) => {
    try {
      // Using no-cors mode as Google Apps Script may not have CORS headers set
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
          source: window.location.hostname,
        }),
      });

      console.log("Data sent to Google Sheets");
      // Note: Due to no-cors mode, we cannot check the response status
    } catch (error) {
      console.error("Error sending data to Google Sheets:", error);
      // We don't show this error to the user as it's not critical
    }
  };

  const handleSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);

    try {
      // First: Save data to Supabase
      const { data: insertedData, error } = await supabase
        .from('info_registeration')
        .insert([data])
        .select('id');

      if (error) {
        if (error.code === '23505') {
          toast.error("این ایمیل قبلا ثبت شده است");
        } else {
          console.error("Supabase error:", error);
          toast.error("خطا در ثبت اطلاعات. لطفا دوباره تلاش کنید");
        }
      } else {
        // Second: Try to send to Google Sheets (but don't block user flow if it fails)
        sendToGoogleSheets(data).catch(console.error);
        
        toast.success("ثبت‌نام شما با موفقیت انجام شد");

        if (insertedData && insertedData.length > 0) {
          // Fix the type error by converting the id to string if needed
          setRegistrationId(String(insertedData[0].id));
          setShowAdditionalInfo(true);
        }

        form.reset();
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("خطا در ثبت اطلاعات. لطفا دوباره تلاش کنید");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdditionalInfoClose = () => {
    setShowAdditionalInfo(false);
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 farsi">
        <h3 className="text-2xl font-bold mb-6 text-webinar-dark">ثبت‌نام در وبینار</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              rules={{ required: "نام و نام خانوادگی الزامی است" }}
              render={({ field }) => (
                <FormItem>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">نام و نام خانوادگی</label>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="لطفا نام خود را وارد کنید"
                      className="text-right"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-right text-red-500 text-xs mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              rules={{ 
                required: "ایمیل الزامی است",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "لطفا یک ایمیل معتبر وارد کنید"
                }
              }}
              render={({ field }) => (
                <FormItem>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">ایمیل</label>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@mail.com"
                      className="text-left"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-right text-red-500 text-xs mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              rules={{ 
                required: "شماره تماس الزامی است",
                pattern: {
                  value: /^(0|\+98)9[0-9]{9}$/,
                  message: "لطفا یک شماره موبایل معتبر وارد کنید (مثال: ۰۹۱۲۳۴۵۶۷۸۹)"
                }
              }}
              render={({ field }) => (
                <FormItem>
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">شماره تماس</label>
                  <FormControl>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="09xxxxxxxxx"
                      className="text-left"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-right text-red-500 text-xs mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              rules={{ required: "نقش شما الزامی است" }}
              render={({ field }) => (
                <FormItem>
                  <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-700">نقش شما</label>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="انتخاب کنید" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="دانشجو">دانشجو</SelectItem>
                        <SelectItem value="هیئت علمی">هیئت علمی</SelectItem>
                        <SelectItem value="کتابدار">کتابدار</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-right text-red-500 text-xs mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="university"
              rules={{ required: "نام دانشگاه الزامی است" }}
              render={({ field }) => (
                <FormItem>
                  <label htmlFor="university" className="block mb-2 text-sm font-medium text-gray-700">نام دانشگاه</label>
                  <FormControl>
                    <Input
                      id="university"
                      placeholder="مثال: دانشگاه تهران"
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
              {isSubmitting ? "در حال ثبت..." : "ثبت‌نام"}
            </Button>
          </form>
        </Form>
      </div>

      <AdditionalInfoForm 
        isOpen={showAdditionalInfo} 
        onClose={handleAdditionalInfoClose} 
        registrationId={registrationId} 
      />
    </>
  );
};

export default RegistrationForm;
