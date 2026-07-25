import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../lib/i18n';
import { useAuth } from '../lib/auth';
import { MessageCircle, Send, User, Clock } from 'lucide-react';

interface Comment {
  id: string;
  articleId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
  approved: boolean;
}

interface CommentsProps {
  articleId: string;
}

const Comments: React.FC<CommentsProps> = ({ articleId }) => {
  const { isRTL } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      articleId,
      userId: 'user1',
      userName: isRTL ? 'أحمد محمد' : 'Ahmed Mohammed',
      content: isRTL 
        ? 'مقال رائع! استفدت كثيراً من المعلومات المقدمة.'
        : 'Great article! I learned a lot from the information provided.',
      createdAt: '2024-01-15T10:30:00Z',
      approved: true,
    },
    {
      id: '2',
      articleId,
      userId: 'user2',
      userName: isRTL ? 'سارة علي' : 'Sara Ali',
      content: isRTL 
        ? 'شكراً على الشرح الواضح. هل يمكنكم كتابة مقال عن BIM؟'
        : 'Thanks for the clear explanation. Can you write an article about BIM?',
      createdAt: '2024-01-14T15:45:00Z',
      approved: true,
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    const comment: Comment = {
      id: Date.now().toString(),
      articleId,
      userId: user.id,
      userName: user.name,
      content: newComment,
      createdAt: new Date().toISOString(),
      approved: false,
    };

    setComments([comment, ...comments]);
    setNewComment('');
    alert(isRTL 
      ? 'تم إرسال تعليقك بانتظار الموافقة'
      : 'Your comment has been submitted and is awaiting approval');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const approvedComments = comments.filter(c => c.approved);

  return (
    <div className="mt-12">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="w-5 h-5 text-amber-400" />
        <h3 className="text-xl font-bold text-white">
          {isRTL ? 'التعليقات' : 'Comments'} ({approvedComments.length})
        </h3>
      </div>

      {/* Comment Form */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
              placeholder={isRTL ? 'اكتب تعليقك هنا...' : 'Write your comment here...'}
              className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none resize-none"
            />
            <div className="flex justify-end mt-3 pt-3 border-t border-slate-800">
              <motion.button
                type="submit"
                disabled={!newComment.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: newComment.trim() ? 1.02 : 1 }}
                whileTap={{ scale: newComment.trim() ? 0.98 : 1 }}
              >
                <Send className="w-4 h-4" />
                {isRTL ? 'إرسال' : 'Submit'}
              </motion.button>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-8 p-4 bg-slate-900/50 border border-slate-800 rounded-xl text-center">
          <p className="text-slate-400">
            {isRTL ? 'يجب عليك' : 'You must'}{' '}
            <a href="/login" className="text-amber-400 hover:text-amber-300">
              {isRTL ? 'تسجيل الدخول' : 'sign in'}
            </a>
            {' '}{isRTL ? 'لإضافة تعليق' : 'to add a comment'}
          </p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {approvedComments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/30 border border-slate-800 rounded-xl p-4"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-slate-950" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-white font-medium">{comment.userName}</span>
                  <span className="text-slate-500 text-sm flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <p className="text-slate-300">{comment.content}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {approvedComments.length === 0 && (
        <div className="text-center py-8 text-slate-400">
          {isRTL ? 'لا توجد تعليقات بعد' : 'No comments yet'}
        </div>
      )}
    </div>
  );
};

export default Comments;