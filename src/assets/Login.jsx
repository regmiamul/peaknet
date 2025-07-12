import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'; // ✅ Adjust path if needed

const Login = () => {
  const [username, setUsername] = useState(''); // Firebase uses email
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, username, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-xl">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="PeakNet Logo" className="h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-[#FFB700]">
            Login to PeakNet
          </h2>
          <p className="text-gray-600 mt-2">Use your registered email and password</p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="block text-gray-700 mb-1 text-sm">Email</label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700]"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFB700] text-white font-bold py-3 rounded-lg transition hover:brightness-110"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Don't have an account? <a href="#" className="text-[#0A2463] hover:underline">Sign up</a></p>
          <p className="mt-2"><a href="#" className="text-[#0A2463] hover:underline">Forgot password?</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
