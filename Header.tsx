import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../lib/i18n';
import { useAuth } from '../lib/auth';
import { 
  Menu, X, Globe, ChevronDown, 
  Wrench, MessageSquare, Users, PenTool,
  Calendar, ShoppingBag, BookOpen, LogOut, User,
  LayoutDashboard
} from 'lucide-react';

const Header: React.FC = () => {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navItems = [
    { key: 'home', href: '/' },
    { key: 'about', href: '/about' },
    { 
      key: 'services', 
      href: '/services',
      submenu: [
        { label: isRTL ? 'خدمات هندسية' : 'Engineering Services', href: '/services/engineering', icon: Wrench },
        { label: isRTL ? 'استشارات فنية' : 'Technical Consulting', href: '/services/consulting', icon: MessageSquare },
        { label: isRTL ? 'تدريب وتأهيل' : 'Training & Development', href: '/services/training', icon: Users },
        { label: isRTL ? 'تصميم هندسي' : 'Engineering Design', href: '/services/design', icon: PenTool },
      ]
    },
    { key: 'projects', href: '/projects' },
    { key: 'blog', href: '/blog' },
    { key: 'store', href: '/store' },
    { key: 'tools', href: '/tools' },
    { key: 'contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a 
            href="/"
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              <span className="text-slate-950 font-bold text-xl">E</span>
            </div>
            <div className="flex flex-col">
n              <span className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif' }}>
                {isRTL ? 'أفكار مهندس' : 'Engineer Ideas'}
              </span>
              <span className="text-xs text-amber-400 font-medium -mt-1 hidden sm:block">
                {isRTL ? 'منصتك الهندسية' : 'Your Engineering Platform'}
              </span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div 
                key={item.key}
                className="relative"
                onMouseEnter={() => item.submenu && setActiveDropdown(item.key)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={item.href}
                  className="flex items-center gap-1 px-4 py-2 text-slate-300 hover:text-white transition-colors font-medium text-sm"
                >
                  {t.nav[item.key as keyof typeof t.nav]}
                  {item.submenu && <ChevronDown className="w-4 h-4" />}
                </a>
                
                {/* Dropdown */}
                <AnimatePresence>
                  {item.submenu && activeDropdown === item.key && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`absolute top-full mt-2 w-56 bg-slate-900 border border-amber-500/20 rounded-xl shadow-2xl shadow-black/50 overflow-hidden ${isRTL ? 'right-0' : 'left-0'}`}
                    >
                      {item.submenu.map((subItem) => (
                        <a
                          key={subItem.href}
                          href={subItem.href}
                          className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-amber-400 hover:bg-slate-800/50 transition-colors"
                        >
                          <subItem.icon className="w-5 h-5" />
                          <span>{subItem.label}</span>
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 text-slate-300 hover:text-amber-400 hover:bg-slate-800 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">
                {language === 'ar' ? 'EN' : 'ع'}
              </span>
            </button>

            {/* Auth Button */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <motion.a
                    href="/dashboard"
                    className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 text-white rounded-lg hover:border-amber-500/50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span className="text-sm font-medium">{isRTL ? 'لوحة التحكم' : 'Dashboard'}</span>
                  </motion.a>
                )}
                <div className="relative group">
                  <button className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-slate-950" />
                    </div>
                    <span className="text-white text-sm font-medium hidden sm:inline">{user?.name}</span>
                  </button>
                  {/* Dropdown */}
                  <div className="absolute top-full right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <a href="/dashboard" className="flex items-center gap-2 px-4 py-3 text-slate-300 hover:text-amber-400 hover:bg-slate-800/50 transition-colors">
                      <LayoutDashboard className="w-4 h-4" />
                      <span>{isRTL ? 'لوحة التحكم' : 'Dashboard'}</span>
                    </a>
                    <button 
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{isRTL ? 'تسجيل الخروج' : 'Logout'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <motion.a
                href="/login"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-lg shadow-lg shadow-amber-500/25"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">{isRTL ? 'دخول' : 'Login'}</span>
              </motion.a>
            )}

            {/* CTA Button */}
            <motion.a
              href="/bookings"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-slate-800/50 border border-slate-700 text-white font-medium rounded-lg hover:border-amber-500/50 hover:text-amber-400 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Calendar className="w-4 h-4" />
              <span>{t.hero.cta2}</span>
            </motion.a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-900/98 border-t border-amber-500/10"
          >
            <nav className="max-w-7xl mx-auto px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="block px-4 py-3 text-slate-300 hover:text-amber-400 hover:bg-slate-800/50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.nav[item.key as keyof typeof t.nav]}
                </a>
              ))}
              
              {/* Mobile Auth */}
              <div className="pt-4 border-t border-slate-800">
                {isAuthenticated ? (
                  <>
                    <a href="/dashboard" className="flex items-center gap-2 px-4 py-3 text-amber-400 font-medium">
                      <LayoutDashboard className="w-5 h-5" />
                      {isRTL ? 'لوحة التحكم' : 'Dashboard'}
                    </a>
                    <button onClick={logout} className="flex items-center gap-2 px-4 py-3 text-red-400 w-full">
                      <LogOut className="w-5 h-5" />
                      {isRTL ? 'تسجيل الخروج' : 'Logout'}
                    </button>
                  </>
                ) : (
                  <a href="/login" className="flex items-center gap-2 px-4 py-3 bg-amber-500 text-slate-950 font-bold rounded-lg">
                    <User className="w-5 h-5" />
                    {isRTL ? 'تسجيل الدخول' : 'Login'}
                  </a>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;