
import React from 'react';
import { cn } from '@/lib/utils';

interface WebinarSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

const WebinarSection = ({ title, children, className, icon }: WebinarSectionProps) => {
  return (
    <section className={cn("py-8 border-b border-indigo-100", className)}>
      <div className="mb-4 flex items-center justify-end gap-2">
        {icon && <span className="text-webinar-primary">{icon}</span>}
        <h2 className="text-2xl font-bold text-webinar-dark">{title}</h2>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
};

export default WebinarSection;
