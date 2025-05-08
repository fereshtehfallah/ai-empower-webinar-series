
import React from 'react';
import RegistrationForm from '@/components/RegistrationForm';
import WebinarSection from '@/components/WebinarSection';
import { Calendar, Clock, Info, Users, Mail, Phone, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const scrollToRegistration = () => {
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
      registrationForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white" dir="rtl">
      {/* Hero Section */}
      <header className="bg-webinar-primary text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="farsi flex flex-col items-start space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">توانمندسازی دانشگاه‌ها با هوش مصنوعی</h1>
            <p className="text-xl md:text-2xl opacity-90">مجموعه کارگاه‌های آنلاین آموزشی ویژه کتابداران و پژوهشگران</p>
            <Button 
              onClick={scrollToRegistration} 
              className="mt-8 bg-white text-webinar-primary hover:bg-indigo-100 flex items-center gap-2"
            >
              <span>ثبت‌نام در دوره</span>
              <ArrowDown size={16} />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8 order-2 lg:order-1">
            <div className="farsi">
              {/* Date and Time Section */}
              <WebinarSection title="تاریخ و زمان" icon={<Calendar />}>
                <div className="bg-webinar-light p-4 rounded-lg">
                  <p className="font-bold">جلسه اول:</p>
                  <p>دوشنبه، ۲۲ اردیبهشت ۱۴۰۴</p>
                  <p>ساعت ۱۳:۰۰ به وقت تهران</p>
                </div>
              </WebinarSection>

              {/* Description Section */}
              <WebinarSection title="توضیحات" icon={<Info />}>
                <div className="space-y-4">
                  <p className="font-bold">توانمندسازی دانشگاه با هوش مصنوعی</p>
                  <p>مجموعه‌ای از کارگاه‌های آنلاین رایگان ویژه کتابداران و پژوهشگران دانشگاهی</p>
                  <p>ارائه‌شده توسط SCiNiTO </p>
                  
                  <p className="text-gray-700 mt-4">
                  در این مجموعه‌ی کارگاه‌های رایگان، با کاربردهای عملی هوش مصنوعی در محیط‌های دانشگاهی آشنا شوید. در هر جلسه، نقش هوش مصنوعی در پژوهش، آموزش و انتشار علمی بررسی می‌شود و ابزارهایی معرفی می‌گردند که می‌توانید همان لحظه از آن‌ها استفاده کنید.
                  </p>
                </div>
              </WebinarSection>

              {/* Workshops Section */}
              <WebinarSection title="تاریخ‌ها و موضوعات کارگاه‌ها" icon={<Calendar />}>
                <div className="space-y-6">
                  <div className="bg-webinar-light p-4 rounded-lg border-r-4 border-webinar-primary">
                    <p className="font-bold">🔸 کارگاه اول: سواد هوش مصنوعی برای کتابداران دانشگاهی</p>
                    <p>📅 دوشنبه، ۲۲ اردیبهشت ۱۴۰۴ | 🕑 ساعت ۱۳:۰۰ به وقت تهران</p>
                    <p>📌 ایجاد پایه‌ای قوی در مفاهیم هوش مصنوعی، ملاحظات اخلاقی و چگونگی سازگاری کتابخانه‌های دانشگاهی با این فناوری‌ها.</p>
                  </div>

                  <div className="bg-webinar-light p-4 rounded-lg border-r-4 border-webinar-secondary">
                    <p className="font-bold">🔸 کارگاه دوم: آموزش هوش مصنوعی به کاربران کتابخانه</p>
                    <p>📅 چهارشنبه، 14 خرداد ۱۴۰۴ | 🕑 ساعت ۱۳:۰۰ به وقت تهران</p>
                    <p>📌 یادگیری طراحی و ارائه آموزش‌های هوش مصنوعی برای دانشجویان، اساتید و پژوهشگران؛ شامل ابزارها، برنامه درسی و روش‌های تدریس.</p>
                  </div>

                  <div className="bg-webinar-light p-4 rounded-lg border-r-4 border-webinar-accent">
                    <p className="font-bold">🔸 کارگاه سوم: راهکارهای هوش مصنوعی برای پژوهش و انتشار علمی</p>
                    <p>📅 چهارشنبه ۲8 خرداد ۱۴۰۴ | 🕑 ساعت ۱۳:۰۰ به وقت تهران</p>
                    <p>📌 بررسی نحوه استفاده از هوش مصنوعی برای جستجوی منابع، برنامه‌ریزی پژوهش، بهبود مقاله، و فرآیند ارسال به مجلات علمی.</p>
                  </div>

                  <p className="text-center">⏱️ هر جلسه به‌مدت ۹۰ دقیقه برگزار می‌شود.</p>
                </div>
              </WebinarSection>

              {/* Speaker Section */}
              <WebinarSection title="سخنران ویژه" icon={<Users />}>
                <div className="bg-gradient-to-r from-webinar-light to-indigo-100 p-6 rounded-lg">
                  <p className="font-bold text-lg mb-2">پدرام عطایی</p>
                  <p>معمار هوش مصنوعی، مدرس، و نویسنده کتاب «درس‌های نامتعارف هوش مصنوعی».</p>
                  <p className="mt-2">دارای مدرک دکتری در مهندسی برق و کامپیوتر از دانشگاه بریتیش کلمبیا و مخترع پنج پتنت ثبت‌شده در حوزه هوش مصنوعی (تملک‌شده توسط شرکت Meta).</p>
                  <p className="mt-2">پدرام با ترکیبی از تخصص فنی و دیدگاه دانشگاهی، بر پذیرش اخلاقی و اثربخش هوش مصنوعی در نهادهای علمی تمرکز دارد.</p>
                </div>
              </WebinarSection>

              {/* Audience Section */}
              <WebinarSection title="این کارگاه مناسب چه کسانی است؟" icon={<Users />}>
                <ul className="list-none space-y-2 text-right">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✔️</span>
                    <span>کتابداران دانشگاهی</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✔️</span>
                    <span>اعضای هیئت‌علمی و پژوهشگران</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✔️</span>
                    <span>مربیان سواد دیجیتال</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✔️</span>
                    <span>تمامی افراد فعال در حوزه پژوهش، انتشار یا آموزش عالی</span>
                  </li>
                </ul>
              </WebinarSection>
            </div>
          </div>

          {/* Registration Form */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="sticky top-4" id="registration-form">
              <RegistrationForm />
              
              <div className="mt-8 bg-white rounded-lg shadow-lg p-6 farsi">
                <h3 className="text-xl font-bold mb-4 text-webinar-dark">اطلاعات تماس</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-gray-700">info@scinito.com</span>
                    <Mail className="text-webinar-primary" size={20} />
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-gray-700">۰۲۱-۸۸۸۸۸۸۸۸</span>
                    <Phone className="text-webinar-primary" size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-webinar-dark text-white py-8" dir="rtl">
        <div className="container mx-auto px-4 text-center">
          <p className="farsi">تمامی حقوق برای SCiNiTO محفوظ است. © ۱۴۰۴</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
