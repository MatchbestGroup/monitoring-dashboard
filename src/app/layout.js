import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from './components/Sidebar';
import { SignIn } from '../components/auth/SignIn';
import { AuthProvider } from '../components/auth/AuthContext';
import AuthGuard from '../components/AuthGuard';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MathbestGroup Saathi",
  description: "MathbestGroup monitoring dashboard",
};

import ClientContent from './components/ClientContent';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ClientContent>{children}</ClientContent>
        </AuthProvider>
      </body>
    </html>
  );
}
