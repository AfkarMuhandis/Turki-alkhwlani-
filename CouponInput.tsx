import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../lib/i18n';
import { useStore } from '../lib/store';
import { Tag, CheckCircle, XCircle } from 'lucide-react';

const CouponInput: React.FC = () => {
  const { isRTL } = useLanguage();
  const { applyCoupon } = useStore();
  const [code, setCode] = useState('');
  const [result, setResult] = useState<{ valid: boolean; message: string } | null>(null);

  const handleApply = () => {
    if (!code.trim()) return;
    const res = applyCoupon(code.trim().toUpperCase());
    setResult(res);
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
      <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
        <Tag className="w-4 h-4 text-amber-400" />
        {isRTL ? 'كود الخصم' : 'Coupon Code'}
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase());
            setResult(null);
          }}
          placeholder={isRTL ? 'أدخل الكود' : 'Enter code'}
          className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 uppercase"
        />
        <motion.button
          onClick={handleApply}
          disabled={!code.trim()}
          className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          whileHover={{ scale: code.trim() ? 1.02 : 1 }}
          whileTap={{ scale: code.trim() ? 0.98 : 1 }}
        >
          {isRTL ? 'تطبيق' : 'Apply'}
        </motion.button>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-3 flex items-center gap-2 text-sm ${
            result.valid ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {result.valid ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <XCircle className="w-4 h-4" />
          )}
          {result.message}
        </motion.div>
      )}

      <div className="mt-3 text-xs text-slate-500">
        {isRTL ? 'أكواد متاحة: WELCOME20, ENGINEER50, BIM30' : 'Available codes: WELCOME20, ENGINEER50, BIM30'}
      </div>
    </div>
  );
};

export default CouponInput;