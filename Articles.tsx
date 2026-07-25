import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../lib/i18n';
import { Search, Plus, Edit, Trash2, Eye, Calendar, User } from 'lucide-react';

const Articles: React.FC = () => {
  const { isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const articles = [
    { id: '1', title: isRTL ? 'أحدث تقنيات البناء المستدام' : 'Latest Sustainable Building Technologies', category: 'engineering', author: 'Admin', status: 'published', views: 1250, date: '2024-01-15' },
    { id: '2', title: isRTL ? 'دليل إدارة المشاريع الهندسية' : 'Engineering Project Management Guide', category: 'management', author: 'Editor', status: 'published', views: 890, date: '2024-01-12' },
    { id: '3', title: isRTL ? 'مستقبل الهندسة المدنية' : 'Future of Civil Engineering', category: 'technology', author: 'Admin', status: 'draft', views: 0, date: '2024-01-10' },
    { id: '4', title: isRTL ? 'تعلم AutoCAD من الصفر' : 'Learn AutoCAD from Scratch', category: 'tutorials', author: 'Editor', status: 'published', views: 2100, date: '2024-01-08' },
  ];

  const getStatusColor = (status: string) => {
    return status === 'published' 
      ? 'bg-green-500/10 text-green-400'
      : 'bg-yellow-500/10 text-yellow-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{isRTL ? 'إدارة المقالات' : 'Articles Management'}</h1>
          <p className="text-slate-400">{isRTL ? 'إنشاء وتعديل ونشر المقالات' : 'Create, edit and publish articles'}</p>
        </div>
        <motion.a
          href="/editor"
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-4 h-4" />
          {isRTL ? 'مقال جديد' : 'New Article'}
        </motion.a>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 ${isRTL ? 'right-3' : 'left-3'}`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isRTL ? 'بحث...' : 'Search...'}
            className={`w-full py-2.5 px-${isRTL ? '4 pr-10' : '4 pl-10'} bg-slate-900/50 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500`}
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2.5 bg-slate-900/50 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-500"
        >
          <option value="all">{isRTL ? 'جميع الحالات' : 'All Status'}</option>
          <option value="published">{isRTL ? 'منشور' : 'Published'}</option>
          <option value="draft">{isRTL ? 'مسودة' : 'Draft'}</option>
        </select>
      </div>

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {articles.map((article) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:border-amber-500/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-white font-medium mb-1 line-clamp-1">{article.title}</h3>
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <span className="flex items-center gap-1"><User className="w-3 h-3" />{article.author}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{article.date}</span>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(article.status)}`}>
                {article.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Eye className="w-4 h-4" />
                <span>{article.views} {isRTL ? 'مشاهدة' : 'views'}</span>
              </div>
              <div className="flex items-center gap-2">
                <a href={`/editor/${article.id}`} className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </a>
                <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Articles;