import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../lib/i18n';
import { 
  Mail, Phone, MapPin, 
  Twitter, Linkedin, Youtube, Instagram,
  ArrowRight
} from 'lucide-react';

const Footer: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const footerLinks = {
    services: [
      { label: isRTL ? 'خدمات هندسية' : 'Engineering Services', href: '/services/engineering' },
      { label: isRTL ? 'استشارات فنية' : 'Technical Consulting', href: '/services/consulting' },
      { label: isRTL ? 'تدريب وتأهيل' : 'Training & Development', href: '/services/training' },
      { label: isRTL ? 'تصميم هندسي' : 'Engineering Design', href: '/services/design' },
    ],
    company: [
      { label: t.nav.about, href: '/about' },
      { label: t.nav.projects, href: '/projects' },
      { label: t.nav.blog, href: '/blog' },
      { label: t.nav.contact, href: '/contact' },
    ],
    resources: [
      { label: isRTL ? 'الكتب الإلكترونية' : 'E-Books', href: '/store' },
      { label: isRTL ? 'القوالب' : 'Templates', href: '/store' },
      { label: isRTL ? 'الأدوات' : 'Tools', href: '/tools' },
      { label: isRTL ? 'الأسئلة الشائعة' : 'FAQ', href: '/faq' },
    ],
    legal: [
      { label: t.footer.privacy, href: '/privacy' },
      { label: t.footer.terms, href: '/terms' },
    ],
  };

  return (
    <footer className="bg-slate-950 border-t border-amber-500/10">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-amber-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {isRTL ? 'اشترك في نشرتنا البريدية' : 'Subscribe to Our Newsletter'}
              </h3>
              <p className="text-slate-400">
                {isRTL ? 'احصل على آخر الأخبار والعروض الحصرية' : 'Get the latest news and exclusive offers'}
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <input 
                type="email" 
                placeholder={isRTL ? 'بريدك الإلكتروني' : 'Your email'}
                className="flex-1 md:w-80 px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              <motion.button 
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-lg flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isRTL ? 'اشتراك' : 'Subscribe'}
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                <span className="text-slate-950 font-bold text-xl">E</span>
              </div>
              <div>
                <span className="text-xl font-bold text-white">
                  {isRTL ? 'أفكار مهندس' : 'Engineer Ideas'}
                </span>
              </div>
            </div>
            <p className="text-slate-400 mb-6 text-sm leading-relaxed">
              {isRTL 
                ? 'منصتك الهندسية المتكاملة للخدمات والاستشارات والحلول الذكية. نساعدك على تحقيق أهدافك الهندسية.'
                : 'Your complete engineering platform for services, consultations, and smart solutions. We help you achieve your engineering goals.'}
            </p>
            <div className="flex gap-3">
              {[Twitter, Linkedin, Youtube, Instagram].map((Icon, i) => (
                <motion.a 
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-4">
              {isRTL ? 'الخدمات' : 'Services'}
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-slate-400 hover:text-amber-400 transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold mb-4">
              {isRTL ? 'الشركة' : 'Company'}
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-slate-400 hover:text-amber-400 transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-bold mb-4">
              {isRTL ? 'الموارد' : 'Resources'}
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-slate-400 hover:text-amber-400 transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">
              {isRTL ? 'تواصل معنا' : 'Contact Us'}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-400 mt-0.5" />
                <a href="mailto:turkiabdus1000@gmail.com" className="text-slate-400 text-sm hover:text-amber-400 transition-colors">
                  turkiabdus1000@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-400 mt-0.5" />
                <a href="tel:+967778816043" className="text-slate-400 text-sm hover:text-amber-400 transition-colors">
                  +967 778 816 043
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-400 text-sm">
                  {isRTL ? 'اليمن' : 'Yemen'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} {isRTL ? 'أفكار مهندس.' : 'Engineer Ideas.'} {t.footer.rights}
            </p>
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <a key={link.href} href={link.href} className="text-slate-500 hover:text-amber-400 transition-colors text-sm">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;