'use client';

import { useState } from 'react';
import CategorizedNavigation from '@/components/CategorizedNavigation';
import Header from '@/components/Header';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNavigationOpen, setIsNavigationOpen] = useState(true); // Standardmäßig offen

  const toggleNavigation = () => {
    setIsNavigationOpen(!isNavigationOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Neue kategorisierte Navigation Sidebar */}
      <CategorizedNavigation isOpen={isNavigationOpen} onToggle={toggleNavigation} />
      
      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isNavigationOpen ? 'lg:ml-80' : 'lg:ml-0'}`}>
        {/* Header */}
        <Header onMenuToggle={toggleNavigation} />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
