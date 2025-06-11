'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { userStatsStorage, activitiesStorage } from '@/utils/wellnessStorage';

interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  module: string;
  content: string;
  timestamp: Date;
  likes: number;
  comments: number;
  isLiked: boolean;
  achievements?: string[];
}

interface WeeklyChallenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  module: string;
  goal: {
    type: 'duration' | 'count' | 'streak';
    target: number;
    unit: string;
  };
  reward: {
    points: number;
    badge: string;
  };
  participants: number;
  progress: number;
  deadline: Date;
  completed: boolean;
}

export default function CommunityFeatures() {
  const [activeTab, setActiveTab] = useState<'feed' | 'challenges' | 'leaderboard'>('feed');
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);
  const [weeklyChallenges, setWeeklyChallenges] = useState<WeeklyChallenge[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedModule, setSelectedModule] = useState('all');

  useEffect(() => {
    loadCommunityData();
  }, []);

  const loadCommunityData = () => {
    // Simulierte Community-Daten
    const mockPosts: CommunityPost[] = [
      {
        id: '1',
        author: 'Anna M.',
        avatar: '👩‍🦳',
        module: 'stille',
        content: 'Gerade eine wunderbare 20-minütige Meditation abgeschlossen! 🧘‍♀️ Die Atemtechnik hat mir heute besonders geholfen, innere Ruhe zu finden.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
        likes: 24,
        comments: 7,
        isLiked: false,
        achievements: ['7-day-streak', 'meditation-master']
      },
      {
        id: '2',
        author: 'Marcus T.',
        avatar: '👨‍💼',
        module: 'fortschritt',
        content: 'Heute mein monatliches Ziel erreicht! 💪 Dankbar für diese Community und die Motivation, die ihr mir gebt.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        likes: 18,
        comments: 5,
        isLiked: true,
        achievements: ['goal-crusher']
      },
      {
        id: '3',
        author: 'Lisa K.',
        avatar: '👩‍🎨',
        module: 'dankbarkeit',
        content: 'Drei Dinge für die ich heute dankbar bin: ☀️ Sonnenschein, 👨‍👩‍👧 Familie, und 🌱 persönliches Wachstum. Was sind eure?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
        likes: 31,
        comments: 12,
        isLiked: false,
        achievements: ['gratitude-guru', 'daily-practitioner']
      },
      {
        id: '4',
        author: 'Tom S.',
        avatar: '👨‍🔬',
        module: 'transformation',
        content: 'Woche 3 meiner Transformationsreise! 🦋 Kleine Schritte führen zu großen Veränderungen. Bleibt dran!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
        likes: 27,
        comments: 9,
        isLiked: true,
        achievements: ['transformation-champion']
      }
    ];

    const mockChallenges: WeeklyChallenge[] = [
      {
        id: 'challenge-1',
        title: 'Mindful Minutes',
        description: 'Sammle 100 Minuten Meditation diese Woche',
        icon: '🧘‍♀️',
        module: 'stille',
        goal: { type: 'duration', target: 100, unit: 'Minuten' },
        reward: { points: 500, badge: 'Mindfulness Master' },
        participants: 247,
        progress: 65,
        deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days
        completed: false
      },
      {
        id: 'challenge-2',
        title: 'Gratitude Streak',
        description: 'Praktiziere 7 Tage in Folge Dankbarkeit',
        icon: '🙏',
        module: 'dankbarkeit',
        goal: { type: 'streak', target: 7, unit: 'Tage' },
        reward: { points: 350, badge: 'Gratitude Guardian' },
        participants: 189,
        progress: 4,
        deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
        completed: false
      },
      {
        id: 'challenge-3',
        title: 'Joy Moments',
        description: 'Teile 5 Freudemomente diese Woche',
        icon: '😄',
        module: 'freude',
        goal: { type: 'count', target: 5, unit: 'Momente' },
        reward: { points: 250, badge: 'Joy Spreader' },
        participants: 156,
        progress: 2,
        deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4), // 4 days
        completed: false
      }
    ];

    const mockLeaderboard = [
      { rank: 1, name: 'Alexandra M.', avatar: '👩‍🚀', points: 2847, level: 8, badge: 'Wellness Champion' },
      { rank: 2, name: 'David K.', avatar: '👨‍🎓', points: 2543, level: 7, badge: 'Mindful Master' },
      { rank: 3, name: 'Sarah L.', avatar: '👩‍⚕️', points: 2401, level: 7, badge: 'Growth Guru' },
      { rank: 4, name: 'Du (Micha)', avatar: '👨‍💻', points: userStatsStorage.get().totalPoints, level: userStatsStorage.get().level, badge: 'Rising Star' },
      { rank: 5, name: 'Emma R.', avatar: '👩‍🎨', points: 2156, level: 6, badge: 'Creative Soul' },
    ];

    setCommunityPosts(mockPosts);
    setWeeklyChallenges(mockChallenges);
    setLeaderboard(mockLeaderboard);
  };

  const handleLikePost = (postId: string) => {
    setCommunityPosts(posts => 
      posts.map(post => 
        post.id === postId 
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
  };

  const joinChallenge = (challengeId: string) => {
    setWeeklyChallenges(challenges =>
      challenges.map(challenge =>
        challenge.id === challengeId
          ? { ...challenge, participants: challenge.participants + 1 }
          : challenge
      )
    );
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes} Min`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} Std`;
    return `${Math.floor(diffInMinutes / 1440)} Tage`;
  };

  const CommunityFeed = () => (
    <div className="space-y-6">
      {/* New Post */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
      >
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
            M
          </div>
          <div className="flex-1">
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Teile deine Wellness-Erfahrung mit der Community..."
              className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
            <div className="flex justify-between items-center mt-4">
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="all">Alle Module</option>
                <option value="stille">Stille & Meditation</option>
                <option value="dankbarkeit">Dankbarkeit</option>
                <option value="fortschritt">Fortschritt</option>
                <option value="freude">Freude & Lachen</option>
              </select>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
                disabled={!newPostContent.trim()}
              >
                Teilen
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Posts Feed */}
      {communityPosts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-2xl">
              {post.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h4 className="font-semibold text-gray-800 dark:text-white">{post.author}</h4>
                <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{formatTimeAgo(post.timestamp)}</span>
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                  {post.module}
                </span>
              </div>
              
              {post.achievements && (
                <div className="flex space-x-2 mb-3">
                  {post.achievements.map((achievement) => (
                    <span key={achievement} className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">
                      🏆 {achievement}
                    </span>
                  ))}
                </div>
              )}
              
              <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>
              
              <div className="flex items-center space-x-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleLikePost(post.id)}
                  className={`flex items-center space-x-2 text-sm ${
                    post.isLiked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
                  } hover:text-red-500 transition-colors`}
                >
                  <span>{post.isLiked ? '❤️' : '🤍'}</span>
                  <span>{post.likes}</span>
                </motion.button>
                
                <button className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  <span>💬</span>
                  <span>{post.comments}</span>
                </button>
                
                <button className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 hover:text-green-500 transition-colors">
                  <span>🔗</span>
                  <span>Teilen</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const WeeklyChallenges = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Wöchentliche Challenges 🎯
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Tritt anderen bei und erreiche gemeinsam eure Wellness-Ziele!
        </p>
      </div>

      {weeklyChallenges.map((challenge, index) => (
        <motion.div
          key={challenge.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{challenge.icon}</div>
              <div>
                <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                  {challenge.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {challenge.description}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {challenge.reward.points}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Punkte</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Fortschritt: {challenge.progress}/{challenge.goal.target} {challenge.goal.unit}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {Math.round((challenge.progress / challenge.goal.target) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((challenge.progress / challenge.goal.target) * 100, 100)}%` }}
                transition={{ duration: 1, delay: index * 0.2 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span>👥 {challenge.participants} Teilnehmer</span>
              <span>⏰ {Math.ceil((challenge.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} Tage</span>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => joinChallenge(challenge.id)}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-teal-700 transition-all"
            >
              {challenge.completed ? '✅ Abgeschlossen' : '🚀 Beitreten'}
            </motion.button>
          </div>

          {challenge.reward.badge && (
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-600 dark:text-yellow-400">🏆</span>
                <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Belohnung: {challenge.reward.badge}
                </span>
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );

  const Leaderboard = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Community Leaderboard 🏆
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Die aktivsten Wellness-Praktizierenden dieser Woche
        </p>
      </div>

      {leaderboard.map((user, index) => (
        <motion.div
          key={user.rank}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`flex items-center p-6 rounded-2xl shadow-lg ${
            user.name.includes('Du') 
              ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white' 
              : 'bg-white dark:bg-gray-800'
          }`}
        >
          <div className={`text-2xl font-bold w-12 text-center ${
            user.rank === 1 ? 'text-yellow-500' :
            user.rank === 2 ? 'text-gray-400' :
            user.rank === 3 ? 'text-amber-600' :
            user.name.includes('Du') ? 'text-white' : 'text-gray-600 dark:text-gray-400'
          }`}>
            {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : user.rank === 3 ? '🥉' : `#${user.rank}`}
          </div>
          
          <div className="flex items-center space-x-4 flex-1 ml-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
              user.name.includes('Du') ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700'
            }`}>
              {user.avatar}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h4 className={`font-bold ${
                  user.name.includes('Du') ? 'text-white' : 'text-gray-800 dark:text-white'
                }`}>
                  {user.name}
                </h4>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  user.name.includes('Du') 
                    ? 'bg-white/20 text-white' 
                    : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                }`}>
                  Level {user.level}
                </span>
              </div>
              <p className={`text-sm ${
                user.name.includes('Du') ? 'text-white/80' : 'text-gray-600 dark:text-gray-300'
              }`}>
                {user.badge}
              </p>
            </div>
            
            <div className="text-right">
              <div className={`text-xl font-bold ${
                user.name.includes('Du') ? 'text-white' : 'text-blue-600 dark:text-blue-400'
              }`}>
                {user.points.toLocaleString()}
              </div>
              <div className={`text-xs ${
                user.name.includes('Du') ? 'text-white/60' : 'text-gray-500 dark:text-gray-400'
              }`}>
                Punkte
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'feed', label: 'Community Feed', icon: '🌐' },
            { id: 'challenges', label: 'Challenges', icon: '🎯' },
            { id: 'leaderboard', label: 'Leaderboard', icon: '🏆' },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'feed' && <CommunityFeed />}
            {activeTab === 'challenges' && <WeeklyChallenges />}
            {activeTab === 'leaderboard' && <Leaderboard />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
