import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wellness Hub - Ganzheitliches Wohlbefinden',
  description: 'Ein modulares Wellness-Framework für persönliche Transformation, Life-RPG und ganzheitliches Wohlbefinden',
  manifest: '/manifest.json',
  themeColor: '#667eea',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Wellness Hub'
  },
  formatDetection: {
    telephone: false
  },
  openGraph: {
    type: 'website',
    siteName: 'Wellness Hub',
    title: 'Wellness Hub - Ganzheitliches Wohlbefinden',
    description: 'Die ultimative Life-RPG Plattform für persönliche Transformation',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/icon-192.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Wellness Hub" />
        <meta name="msapplication-TileColor" content="#667eea" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="mask-icon" href="/favicon.svg" color="#667eea" />
      </head>
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Service Worker temporär deaktiviert für Debugging
              console.log('🔧 Service Worker registration disabled for debugging');
              
              // Background Sync Setup (ohne SW)
              window.addEventListener('load', () => {
                console.log('✅ Page loaded successfully');
              });
              `
          }}
        />

              // Push Notifications Setup
              function setupPushNotifications(registration) {
                if (Notification.permission === 'default') {
                  // Wir fragen später nach Berechtigung
                } else if (Notification.permission === 'granted') {
                  subscribeToNotifications(registration);
                }
              }

              async function subscribeToNotifications(registration) {
                try {
                  const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array('your-vapid-public-key-here')
                  });
                  
                  // Subscription an Server senden
                  await fetch('/api/subscribe-notifications', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(subscription)
                  });
                  
                  console.log('✅ Push notification subscription successful');
                } catch (error) {
                  console.log('❌ Push notification subscription failed:', error);
                }
              }

              function urlBase64ToUint8Array(base64String) {
                const padding = '='.repeat((4 - base64String.length % 4) % 4);
                const base64 = (base64String + padding)
                  .replace(/\\-/g, '+')
                  .replace(/_/g, '/');

                const rawData = window.atob(base64);
                const outputArray = new Uint8Array(rawData.length);

                for (let i = 0; i < rawData.length; ++i) {
                  outputArray[i] = rawData.charCodeAt(i);
                }
                return outputArray;
              }

              // App Install Banner
              let deferredPrompt;
              window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                deferredPrompt = e;
                
                // Zeige Install Button
                const installButton = document.getElementById('install-app-button');
                if (installButton) {
                  installButton.style.display = 'block';
                }
              });

              // Install App Function
              window.installApp = async () => {
                if (!deferredPrompt) return;
                
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                
                if (outcome === 'accepted') {
                  console.log('✅ User accepted the app install');
                } else {
                  console.log('❌ User dismissed the app install');
                }
                
                deferredPrompt = null;
              };

              // Online/Offline Status
              window.addEventListener('online', () => {
                console.log('🌐 App is online');
                // Trigger background sync when coming back online
                if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
                  navigator.serviceWorker.ready.then(registration => {
                    registration.sync.register('wellness-data-sync');
                    registration.sync.register('life-rpg-progress-sync');
                  });
                }
              });

              window.addEventListener('offline', () => {
                console.log('📱 App is offline - cached content available');
              });
            `
          }}
        />
      </body>
    </html>
  )
}
