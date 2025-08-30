"use client";
import Link from 'next/link';
import { useAuth } from '../../components/auth/AuthContext';
import SignIn from '../../components/auth/SignIn';
import SignOut from '../../components/auth/SignOut';

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gray-800 text-white w-64 h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Monitoring</h1>
      <nav>
        <ul>
          <li className="mb-2">
            <Link href="/" className="hover:text-gray-300">
              Dashboard
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/site1" className="hover:text-gray-300">
              Site 1
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/site2" className="hover:text-gray-300">
              Site 2
            </Link>
          </li>
          {user ? (
            <>
              <li className="mb-2">
                <p>Welcome, {user.email}</p>
              </li>
              <li className="mb-2">
                <SignOut />
              </li>
            </>
          ) : (
            <>
              <li className="mb-2">
                <SignIn />
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
