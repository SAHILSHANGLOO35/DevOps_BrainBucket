import { Lock, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UnauthorizedAccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#0B0B0F] to-gray-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white/10 p-8 rounded-lg shadow-xl border-2 border-white/15">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Lock className="h-16 w-16 text-red-500" />
            <AlertTriangle className="h-8 w-8 text-yellow-500 absolute -bottom-2 -right-2" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-white">
          Oops! Access Denied
        </h1>
        <p className="mt-4 text-center text-gray-400">
          Looks like you're trying to sneak in without logging in! We respect your curiosity, but let's do this the right way.
        </p>

        <div className="mt-8 space-y-4">
          <button
            onClick={() => navigate('/signin')}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-md transition duration-150"
          >
            Go to Login
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 border border-gray-300 text-gray-400 hover:bg-gray-100 hover:text-gray-800 font-medium rounded-md transition-all duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedAccess;
