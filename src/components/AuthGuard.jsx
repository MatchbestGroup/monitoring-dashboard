"use client";
import { useAuth } from './auth/AuthContext';
import SignIn from './auth/SignIn';
import Sidebar from '../app/components/Sidebar';

const AuthGuard = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <>{children}</> : <SignIn />;
};

export default AuthGuard;
