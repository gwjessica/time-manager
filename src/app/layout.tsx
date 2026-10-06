import './globals.css';
import { Navbar } from '@/components/layout/Navbar';

export const metadata = {
  title: 'Academic Time-Manager AI',
  description: 'Intelligent Academic & Activity Time-Manager',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}