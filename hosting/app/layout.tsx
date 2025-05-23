import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FIELDPORTER - Coming Soon',
  description: 'Premium solutions are being crafted with precision. Something exceptional is coming soon.',
  viewport: 'width=device-width, initial-scale=1.0',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script defer src="https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js"></script>
        <script defer src="https://www.gstatic.com/firebasejs/10.7.0/firebase-analytics-compat.js"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              firebase.initializeApp({
                apiKey: "AIzaSyCZR7qSS_dTN3eNHXIRoDHAG1TB_GcjwqI",
                authDomain: "fieldporter-website.firebaseapp.com",
                projectId: "fieldporter-website",
                storageBucket: "fieldporter-website.firebasestorage.app",
                messagingSenderId: "412133715476",
                appId: "1:412133715476:web:924be61903196cfbe50101",
                measurementId: "G-4YGGNZYQ1J"
              });
              firebase.analytics();
            });
          `
        }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
