// src/components/auth/SignOut.jsx
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';

const SignOut = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Optionally, redirect the user to a public route
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button onClick={handleSignOut} className="bg-red-500 text-white rounded px-3 py-2">
      Sign Out
    </button>
  );
};

export default SignOut;
