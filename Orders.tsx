import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../lib/i18n';
import { Search, Eye, Download, DollarSign, ShoppingBag, TrendingUp, Clock } from 'lucide-react';

const Orders: React.FC = () => {
  const { isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const orders = [
    { id: 'ORD-001', customer: 'Ahmed Mohammed', email: 'ahmed@email.com', items: 2, total: 648, status: 'completed', date: '2024-01-15' },
    { id: 'ORD-002', customer: 'Sara Ali', email: 'sara@email.com', items: 1, total: 149, status: 'processing', date: '2024-01-14' },
    { id: 'ORD-003', customer: 'Khaled Al-Otaibi', email: 'khaled@email.com', items: 3, total: 447, status: 'pending', date: '2024-01-14' },
    { id: 'ORD-004', customer: 'Noura Al-Qahtani', email: 'noura@email.com', items: 1, total: 59, status: 'completed', date: '2024-01-13' },
    { id: 'ORD-005', customer: 'Fahad Al-Rashid', email: 'fahad@email.com', items: 2, total: 848, status: 'processing', date: '2024-01-13' },
  ];

  const stats = [
    { label: isRTL ? 'إجمالي الطلبات' : 'Total Orders', value: '156', icon: ShoppingBag, color: 'from-blue-500 to-cyan-500' },
    { label: isRTL ? 'الإيرادات' : 'Revenue', value: '$12,458', icon: DollarSign, color: 'from-green-500 to-emerald-500' },
    { label: isRTL ? 'قيد المعالجة' : 'Processing', value: '23', icon: Clock, color: 'from-yellow-500 to-orange-500' },
    { label: isRTL ? 'معدل التحويل' : 'Conversion', value: '4.8%', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'processing': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'pending': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">{isRTL ? 'إدارة الطلبات' : 'Orders Management'}</h1>
        <p className="text-slate-400">{isRTL ? 'متابعة وإدارة جميع طلبات المتجر' : 'Track and manage all store orders'}</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-slate-400 text-sm">{stat.label}</p>
          </div>
        ))}
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
          <option value="completed">{isRTL ? 'مكتمل' : 'Completed'}</option>
          <option value="processing">{isRTL ? 'قيد المعالجة' : 'Processing'}</option>
          <option value="pending">{isRTL ? 'معلق' : 'Pending'}</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-right py-4 px-6 text-sm font-medium text-slate-400">{isRTL ? 'رقم الطلب' : 'Order ID'}</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-slate-400">{isRTL ? 'العميل' : 'Customer'}</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-slate-400">{isRTL ? 'المنتجات' : 'Items'}</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-slate-400">{isRTL ? 'المجموع' : 'Total'}</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-slate-400">{isRTL ? 'الحالة' : 'Status'}</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-slate-400">{isRTL ? 'إجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-6 text-white font-medium">{order.id}</td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-white">{order.customer}</p>
                      <p className="text-slate-400 text-sm">{order.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-300">{order.items}</td>
                  <td className="py-4 px-6 text-amber-400 font-medium">${order.total}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-slate-800 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
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

export default Orders;