'use client';

import SimpleNavigation from '@/components/SimpleNavigation';

export default function SimpleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation Sidebar - Immer sichtbar */}
      <SimpleNavigation />
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Simple Header */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Wellness Hub Dashboard
          </h1>
        </div>
        
        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
