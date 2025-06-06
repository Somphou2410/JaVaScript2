// src/app/layout.tsx
import './globals.css'; // ถ้ามีไฟล์ CSS รวม

export const metadata = {
  title: 'My App',
  description: 'Login and Dashboard App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
