
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("ثبت‌نام شما با موفقیت انجام شد");
      setName('');
      setEmail('');
      setPhone('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 farsi">
      <h3 className="text-2xl font-bold mb-6 text-webinar-dark">ثبت‌نام در وبینار</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">نام و نام خانوادگی</label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="لطفا نام خود را وارد کنید"
            required
            className="text-right"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">ایمیل</label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mail.com"
            required
            className="text-left"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">شماره تماس</label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="09xxxxxxxxx"
            required
            className="text-left"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-webinar-primary hover:bg-webinar-accent text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "در حال ثبت..." : "ثبت‌نام"}
        </Button>
      </form>
    </div>
  );
};

export default RegistrationForm;
