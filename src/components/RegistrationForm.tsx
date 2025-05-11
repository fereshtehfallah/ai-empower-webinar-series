
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

type RegistrationFormData = {
  name: string;
  email: string;
  phone: string;
};

const RegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RegistrationFormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const handleSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    
    try {
      // Insert data into Supabase
      const { error } = await supabase
        .from('webinar_registrations')
        .insert([data]);

      if (error) {
        if (error.code === '23505') {
          // Unique constraint violation (duplicate email)
          toast.error("این ایمیل قبلا ثبت شده است");
        } else {
          console.error("Supabase error:", error);
          toast.error("خطا در ثبت اطلاعات. لطفا دوباره تلاش کنید");
        }
      } else {
        toast.success("ثبت‌نام شما با موفقیت انجام شد");
        form.reset();
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("خطا در ثبت اطلاعات. لطفا دوباره تلاش کنید");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
  );
};

export default RegistrationForm;
