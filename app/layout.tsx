import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ROSHNI - Crowdsourced Pakistan Outage Tracker',
  description: 'Track, compare, and report DISCO load shedding schedules across Pakistan.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" class="dark">
      <body class="min-h-screen flex flex-col bg-background text-on-surface selection:bg-primary-container selection:text-on-primary-container">
        {children}
      </body>
    </html>
  );
}
