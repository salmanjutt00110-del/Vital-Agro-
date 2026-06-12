import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'

// Cleanly unregister any active service worker to prevent caching dynamic chunks and causing white screens
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister()
        .then(() => console.log('Service Worker unregistered successfully'));
    }
  });

  // Clear all caches to break out of any stale bundle cache loops
  if (window.caches) {
    caches.keys().then((names) => {
      for (const name of names) {
        caches.delete(name);
      }
    });
  }
}

if (import.meta.env.DEV) {
  const missingKeys = [];
  if (!import.meta.env.VITE_FIREBASE_API_KEY) missingKeys.push("VITE_FIREBASE_API_KEY");
  if (!import.meta.env.VITE_GEMINI_API_KEY) missingKeys.push("VITE_GEMINI_API_KEY");
  if (!import.meta.env.VITE_API_URL) missingKeys.push("VITE_API_URL");

  if (missingKeys.length > 0) {
    console.warn(
      `%c[Vital Agro] Missing Dev Env Keys: ${missingKeys.join(', ')}\n%cRun the application using Local Fallback or set these in your .env.local file.`,
      "color: #ffcc00; font-weight: bold; font-size: 14px;",
      "color: #8AD65A; font-size: 12px;"
    );
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
