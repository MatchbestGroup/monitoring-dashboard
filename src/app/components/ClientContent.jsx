"use client";
import { usePathname } from 'next/navigation'; // Import usePathname
import Sidebar from '../components/Sidebar';
import { useAuth } from '../../components/auth/AuthContext';
import AuthGuard from '../../components/AuthGuard';

const ClientContent = ({ children }) => {
  const pathname = usePathname(); // Get the current pathname
  const { user } = useAuth(); // Get the user object
  const isAuthenticated = !!user; // Determine authentication status from user object

  return (
      <div className="flex">
        {isAuthenticated && pathname !== '/signin' && <Sidebar />}
        <main className={pathname === '/signin' ? 'flex-1 w-full' : 'flex-1 p-4'}>
          {pathname === '/signin' ? children : <AuthGuard>{children}</AuthGuard>}
        </main>
      </div>
  );
};

export default ClientContent;
