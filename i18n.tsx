import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'en';

interface Translation {
  nav: {
    home: string;
    about: string;
    services: string;
    projects: string;
    pricing: string;
    blog: string;
    resources: string;
    tools: string;
    affiliate: string;
    store: string;
    bookings: string;
    consultations: string;
    faq: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    cta2: string;
  };
  stats: {
    projects: string;
    clients: string;
    experience: string;
    satisfaction: string;
  };
  services: {
    title: string;
    subtitle: string;
    engineering: string;
    consulting: string;
    training: string;
    design: string;
  };
  about: {
    title: string;
    description: string;
    mission: string;
    vision: string;
    values: string;
  };
  footer: {
    rights: string;
    privacy: string;
    terms: string;
  };
}

const translations: Record<Language, Translation> = {
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'الخدمات',
      projects: 'المشاريع',
      pricing: 'الأسعار',
      blog: 'المدونة',
      resources: 'الموارد',
      tools: 'الأدوات',
      affiliate: 'الأفلييت',
      store: 'المتجر',
      bookings: 'الحجوزات',
      consultations: 'الاستشارات',
      faq: 'الأسئلة الشائعة',
      contact: 'اتصل بنا',
    },
    hero: {
      title: 'أفكار مهندس',
      subtitle: 'منصتك الهندسية المتكاملة للخدمات والاستشارات والحلول الذكية',
      cta: 'استكشف خدماتنا',
      cta2: 'احجز استشارة',
    },
    stats: {
      projects: 'مشروع منجز',
      clients: 'عميل سعيد',
      experience: 'سنة خبرة',
      satisfaction: 'نسبة رضا',
    },
    services: {
      title: 'خدماتنا المتميزة',
      subtitle: 'نقدم مجموعة شاملة من الخدمات الهندسية الاحترافية',
      engineering: 'خدمات هندسية',
      consulting: 'استشارات فنية',
      training: 'تدريب وتأهيل',
      design: 'تصميم هندسي',
    },
    about: {
      title: 'من نحن',
      description: 'نحن فريق من المهندسين المحترفين نسعى لتقديم أفضل الحلول الهندسية',
      mission: 'رسالتنا',
      vision: 'رؤيتنا',
      values: 'قيمنا',
    },
    footer: {
      rights: 'جميع الحقوق محفوظة',
      privacy: 'سياسة الخصوصية',
      terms: 'الشروط والأحكام',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      projects: 'Projects',
      pricing: 'Pricing',
      blog: 'Blog',
      resources: 'Resources',
      tools: 'Tools',
      affiliate: 'Affiliate',
      store: 'Store',
      bookings: 'Bookings',
      consultations: 'Consultations',
      faq: 'FAQ',
      contact: 'Contact',
    },
    hero: {
      title: 'Engineer Ideas',
      subtitle: 'Your Complete Engineering Platform for Services, Consultations & Smart Solutions',
      cta: 'Explore Services',
      cta2: 'Book Consultation',
    },
    stats: {
      projects: 'Projects Completed',
      clients: 'Happy Clients',
      experience: 'Years Experience',
      satisfaction: 'Satisfaction Rate',
    },
    services: {
      title: 'Our Premium Services',
      subtitle: 'We provide a comprehensive range of professional engineering services',
      engineering: 'Engineering Services',
      consulting: 'Technical Consulting',
      training: 'Training & Development',
      design: 'Engineering Design',
    },
    about: {
      title: 'About Us',
      description: 'We are a team of professional engineers striving to provide the best engineering solutions',
      mission: 'Our Mission',
      vision: 'Our Vision',
      values: 'Our Values',
    },
    footer: {
      rights: 'All Rights Reserved',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    isRTL: language === 'ar',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default translations;