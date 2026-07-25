import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../lib/i18n';
import { Save, Upload, Globe, Palette, Mail, Bell, Shield } from 'lucide-react';

const Settings: React.FC = () => {
  const { isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { key: 'general', label: isRTL ? 'عام' : 'General', icon: Globe },
    { key: 'appearance', label: isRTL ? 'المظهر' : 'Appearance', icon: Palette },
    { key: 'notifications', label: isRTL ? 'الإشعارات' : 'Notifications', icon: Bell },
    { key: 'security', label: isRTL ? 'الأمان' : 'Security', icon: Shield },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">{isRTL ? 'إعدادات الموقع' : 'Site Settings'}</h1>
        <p className="text-slate-400">{isRTL ? 'إدارة إعدادات وتفضيلات الموقع' : 'Manage site settings and preferences'}</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Tabs */}
        <div className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                activeTab === tab.key
                  ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-4">{isRTL ? 'إعدادات عامة' : 'General Settings'}</h2>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">{isRTL ? 'اسم الموقع' : 'Site Name'}</label>
                  <input
                    type="text"
                    defaultValue="Engineer Ideas"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">{isRTL ? 'الوصف' : 'Description'}</label>
                  <textarea
                    rows={3}
                    defaultValue={isRTL ? 'منصتك الهندسية المتكاملة' : 'Your Complete Engineering Platform'}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">{isRTL ? 'الشعار' : 'Logo'}</label>
                  <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center hover:border-amber-500/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                    <p className="text-slate-400">{isRTL ? 'اسحب صورة هنا أو انقر للرفع' : 'Drag image here or click to upload'}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">{isRTL ? 'اللغة الافتراضية' : 'Default Language'}</label>
                  <select className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500">
                    <option value="ar">{isRTL ? 'العربية' : 'Arabic'}</option>
                    <option value="en">{isRTL ? 'الإنجليزية' : 'English'}</option>
                  </select>
                </div>

                <motion.button
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Save className="w-5 h-5" />
                  {isRTL ? 'حفظ التغييرات' : 'Save Changes'}
                </motion.button>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-4">{isRTL ? 'إعدادات المظهر' : 'Appearance Settings'}</h2>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-4">{isRTL ? 'الألوان' : 'Colors'}</label>
                  <div className="grid grid-cols-4 gap-4">
                    {['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ef4444', '#ec4899', '#06b6d4', '#84cc16'].map((color) => (
                      <button
                        key={color}
                        className="w-12 h-12 rounded-xl border-2 border-transparent hover:border-white transition-colors"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-4">{isRTL ? 'الوضع' : 'Theme Mode'}</label>
                  <div className="flex gap-4">
                    <button className="flex-1 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white hover:border-amber-500 transition-colors">
                      {isRTL ? 'داكن' : 'Dark'}
                    </button>
                    <button className="flex-1 py-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-400 hover:border-amber-500 transition-colors">
                      {isRTL ? 'فاتح' : 'Light'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-4">{isRTL ? 'إعدادات الإشعارات' : 'Notification Settings'}</h2>
                
                {[
                  { label: isRTL ? 'إشعارات البريد الإلكتروني' : 'Email Notifications', desc: isRTL ? 'تلقي إشعارات عبر البريد' : 'Receive notifications via email' },
                  { label: isRTL ? 'إشعارات الطلبات الجديدة' : 'New Order Notifications', desc: isRTL ? 'إشعار عند استلام طلب جديد' : 'Get notified for new orders' },
                  { label: isRTL ? 'إشعارات الحجوزات' : 'Booking Notifications', desc: isRTL ? 'إشعار عند حجز جديد' : 'Get notified for new bookings' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-slate-800">
                    <div>
                      <p className="text-white font-medium">{item.label}</p>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                    <button className="w-12 h-6 bg-amber-500 rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-4">{isRTL ? 'إعدادات الأمان' : 'Security Settings'}</h2>
                
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-green-400" />
                    <div>
                      <p className="text-white font-medium">{isRTL ? 'الموقع محمي' : 'Site is Protected'}</p>
                      <p className="text-green-400 text-sm">{isRTL ? 'جميع الاتصالات مشفرة' : 'All connections are encrypted'}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">{isRTL ? 'تغيير كلمة المرور' : 'Change Password'}</label>
                  <input
                    type="password"
                    placeholder={isRTL ? 'كلمة المرور الجديدة' : 'New password'}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;