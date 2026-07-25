import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../lib/i18n';
import { Twitter, Facebook, Linkedin, Link2, CheckCircle } from 'lucide-react';

interface SocialShareProps {
  url: string;
  title: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ url, title }) => {
  const { isRTL } = useLanguage();
  const [copied, setCopied] = React.useState(false);

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: 'hover:bg-[#1DA1F2] hover:text-white',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: 'hover:bg-[#4267B2] hover:text-white',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      color: 'hover:bg-[#0077B5] hover:text-white',
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-slate-400 text-sm">{isRTL ? 'مشاركة:' : 'Share:'}</span>
      <div className="flex gap-2">
        {shareLinks.map((link) => (
          <motion.a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 bg-slate-800 rounded-lg text-slate-400 ${link.color} transition-all`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <link.icon className="w-4 h-4" />
          </motion.a>
        ))}
        <motion.button
          onClick={copyToClipboard}
          className={`p-2 bg-slate-800 rounded-lg transition-all ${
            copied ? 'text-green-400' : 'text-slate-400 hover:text-white'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {copied ? <CheckCircle className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
        </motion.button>
      </div>
    </div>
  );
};

export default SocialShare;