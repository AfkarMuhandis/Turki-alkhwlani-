import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../lib/i18n';
import { Search, Calendar, Clock, User, Check, X, Phone, Mail } from 'lucide-react';

const BookingsAdmin: React.FC = () => {
  const { isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const bookings = [
    { id: 'BK-001', client: 'Mohammed Ali', email: 'mohammed@email.com', phone: '+966 50 000 0001', service: 'Engineering Consultation', date: '2024-01-20', time: '10:00 AM', status: 'confirmed' },
    { id: 'BK-002', client: 'Fatima Hassan', email: 'fatima@email.com', phone: '+966 50 000 0002', service: 'Design Review', date: '2024-01-21', time: '02:00 PM', status: 'pending' },
    { id: 'BK-003', client: 'Abdullah Saud', email: 'abdullah@email.com', phone: '+966 50 000 0003', service: 'Training Session', date: '2024-01-22', time: '09:00 AM', status: 'confirmed' },
    { id: 'BK-004', client: 'Noura Ahmed', email: 'noura@email.com', phone: '+966 50 000 0004', service: 'Project Evaluation', date: '2024-01-23', time: '11:00 AM', status: 'pending' },
    { id: 'BK-005', client: 'Omar Khalid', email: 'omar@email.com', phone: '+966 50 000 0005', service: 'Engineering Consultation', date: '2024-01-24', time: '03:00 PM', status: 'cancelled' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'pending': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'cancelled': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">{isRTL ? 'إدارة الحجوزات' : 'Bookings Management'}</h1>
        <p className="text-slate-400">{isRTL ? 'متابعة وإدارة جميع الحجوزات' : 'Track and manage all bookings'}</p>
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
          <option value="confirmed">{isRTL ? 'مؤكد' : 'Confirmed'}</option>
          <option value="pending">{isRTL ? 'معلق' : 'Pending'}</option>
          <option value="cancelled">{isRTL ? 'ملغي' : 'Cancelled'}</option>
        </select>
      </div>

      {/* Bookings Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookings.map((booking) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 hover:border-amber-500/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-amber-400 font-mono text-sm">{booking.id}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                {booking.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" />
                <span className="text-white">{booking.client}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="text-slate-300 text-sm">{booking.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="text-slate-300 text-sm">{booking.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-slate-300 text-sm">{booking.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-slate-300 text-sm">{booking.time}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <p className="text-slate-400 text-sm mb-3">{booking.service}</p>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1 py-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-colors">
                  <Check className="w-4 h-4" />
                  <span className="text-sm">{isRTL ? 'تأكيد' : 'Confirm'}</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors">
                  <X className="w-4 h-4" />
                  <span className="text-sm">{isRTL ? 'إلغاء' : 'Cancel'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BookingsAdmin;