import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../lib/i18n';
import { Search, Plus, Edit, Trash2, Shield, User, Mail, Calendar } from 'lucide-react';

const Users: React.FC = () => {
  const { isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  const users = [
    { id: '1', name: 'Admin User', email: 'admin@engineerideas.com', role: 'admin', status: 'active', createdAt: '2024-01-01' },
    { id: '2', name: 'Editor User', email: 'editor@engineerideas.com', role: 'editor', status: 'active', createdAt: '2024-01-05' },
    { id: '3', name: 'Ahmed Mohammed', email: 'ahmed@email.com', role: 'user', status: 'active', createdAt: '2024-01-10' },
    { id: '4', name: 'Sara Ali', email: 'sara@email.com', role: 'user', status: 'active', createdAt: '2024-01-12' },
    { id: '5', name: 'Khaled Al-Otaibi', email: 'khaled@email.com', role: 'user', status: 'inactive', createdAt: '2024-01-15' },
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'editor': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-500/10 text-green-400'
      : 'bg-slate-500/10 text-slate-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{isRTL ? 'إدارة المستخدمين' : 'Users Management'}</h1>
          <p className="text-slate-400">{isRTL ? 'إدارة صلاحيات وحسابات المستخدمين' : 'Manage user accounts and permissions'}</p>
        </div>
        <motion.button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-4 h-4" />
          {isRTL ? 'إضافة مستخدم' : 'Add User'}
        </motion.button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 ${isRTL ? 'right-3' : 'left-3'}`} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={isRTL ? 'بحث عن مستخدم...' : 'Search users...'}
          className={`w-full py-3 px-${isRTL ? '4 pr-10' : '4 pl-10'} bg-slate-900/50 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500`}
        />
      </div>

      {/* Users Table */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-right py-4 px-6 text-sm font-medium text-slate-400">{isRTL ? 'المستخدم' : 'User'}</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-slate-400">{isRTL ? 'الصلاحية' : 'Role'}</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-slate-400">{isRTL ? 'الحالة' : 'Status'}</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-slate-400">{isRTL ? 'تاريخ الإنشاء' : 'Created'}</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-slate-400">{isRTL ? 'إجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-slate-950" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{user.name}</p>
                        <p className="text-slate-400 text-sm">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-400 text-sm">{user.createdAt}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;