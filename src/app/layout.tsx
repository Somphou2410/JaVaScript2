import './globals.css';
import { Inter } from 'next/font/google';
import { CssBaseline } from '@mui/material';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next Auth App',
  description: 'Secure login app using Next.js and MUI',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CssBaseline />
        {children}
      </body>
    </html>
  );
}
