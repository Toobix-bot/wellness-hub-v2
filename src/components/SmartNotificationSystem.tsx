'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SmartNotification {
  id: string;
  type: 'reminder' | 'achievement' | 'insight' | 'encouragement' | 'challenge';
  title: string;
  message: string;
  icon: string;
  priority: 'low' | 'medium' | 'high';
  actionText?: string;
  actionLink?: string;
  timestamp: Date;
  read: boolean;
}

export default function SmartNotificationSystem() {
  const [notifications, setNotifications] = useState<SmartNotification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    // Generate smart notifications based on user behavior
    const generateNotifications = () => {
      const now = new Date();
      const smartNotifications: SmartNotification[] = [
        {
          id: '1',
          type: 'reminder',
          title: 'Zeit für Achtsamkeit',
          message: 'Du warst heute noch nicht bei der Meditation. 5 Minuten reichen schon!',
          icon: '🧘',
          priority: 'medium',
          actionText: 'Jetzt meditieren',
          actionLink: '/stille',
          timestamp: now,
          read: false
        },
        {
          id: '2',
          type: 'insight',
          title: 'Dein Fortschritt ist beeindruckend!',
          message: 'In den letzten 7 Tagen hast du deine Stimmung um durchschnittlich 2.3 Punkte verbessert.',
          icon: '📈',
          priority: 'high',
          timestamp: new Date(now.getTime() - 30 * 60 * 1000),
          read: false
        },
        {
          id: '3',
          type: 'challenge',
          title: 'Neue Herausforderung verfügbar',
          message: 'Probiere heute das "Selbstliebe-Ritual" aus - perfekt nach einem stressigen Tag.',
          icon: '💖',
          priority: 'medium',
          actionText: 'Challenge annehmen',
          actionLink: '/liebe',
          timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000),
          read: false
        },
        {
          id: '4',
          type: 'encouragement',
          title: 'Du machst das großartig!',
          message: 'Dein 5-Tage-Streak zeigt dein Engagement für dein Wohlbefinden. Weiter so!',
          icon: '🔥',
          priority: 'low',
          timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000),
          read: true
        }
      ];

      setNotifications(smartNotifications);
    };

    generateNotifications();
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'border-blue-200 bg-blue-50',
      medium: 'border-yellow-200 bg-yellow-50',
      high: 'border-red-200 bg-red-50'
    };
    return colors[priority as keyof typeof colors] || colors.low;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      reminder: 'text-blue-600',
      achievement: 'text-green-600',
      insight: 'text-purple-600',
      encouragement: 'text-pink-600',
      challenge: 'text-orange-600'
    };
    return colors[type as keyof typeof colors] || colors.reminder;
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `vor ${days} Tag${days === 1 ? '' : 'en'}`;
    if (hours > 0) return `vor ${hours} Std`;
    if (minutes > 0) return `vor ${minutes} Min`;
    return 'gerade eben';
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
      >
        <div className="text-2xl">🔔</div>
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.div>
        )}
      </motion.button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Smart Wellness Benachrichtigungen</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-all"
                  >
                    Alle als gelesen markieren
                  </button>
                )}
              </div>
              {unreadCount > 0 && (
                <p className="text-sm opacity-90 mt-1">
                  {unreadCount} neue Nachricht{unreadCount === 1 ? '' : 'en'}
                </p>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 hover:bg-gray-50 transition-colors ${
                        !notification.read ? 'bg-blue-50/50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{notification.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className={`font-medium text-sm ${getTypeColor(notification.type)} ${
                              !notification.read ? 'font-bold' : ''
                            }`}>
                              {notification.title}
                            </h4>
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              ✕
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-400">
                              {formatTime(notification.timestamp)}
                            </span>
                            <div className="flex items-center space-x-2">
                              {notification.actionText && notification.actionLink && (
                                <a
                                  href={notification.actionLink}
                                  className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full hover:shadow-lg transition-all"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  {notification.actionText}
                                </a>
                              )}
                              {!notification.read && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                  Als gelesen markieren
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <div className="text-4xl mb-2">📭</div>
                  <p className="text-sm">Keine Benachrichtigungen vorhanden</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-100 bg-gray-50">
              <p className="text-xs text-gray-500 text-center">
                Benachrichtigungen basieren auf deinem Wellness-Verhalten
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
