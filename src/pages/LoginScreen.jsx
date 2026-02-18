import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginScreen = () => {
  const navigate = useNavigate();
  const { login, guestLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!email || !password) {
      setError('Wypełnij wszystkie pola.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Nieprawidłowy adres email.');
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      if (login(email, password)) {
        navigate('/home');
      } else {
        setError('Błędne dane. Spróbuj: test@example.com / password123');
        setIsLoading(false);
      }
    }, 500);
  };

  const handleGuestLogin = () => {
    guestLogin();
    navigate('/home'); // Immediate redirect
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#112334] px-6 transition-colors duration-300">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            {/* Logo Icon */}
            <div className="bg-white/10 p-4 rounded-full backdrop-blur-sm">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9.75L12 2.25L21 9.75V20.25C21 20.6478 20.842 21.0294 20.5607 21.3107C20.2794 21.592 19.8978 21.75 19.5 21.75H4.5C4.10218 21.75 3.72064 21.592 3.43934 21.3107C3.15804 21.0294 3 20.6478 3 20.25V9.75Z" stroke="#00E0FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 21.75V11.25H15V21.75" stroke="#00E0FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Witaj ponownie</h1>
          <p className="text-[#8E9BAE] text-sm mt-3">Znajdź swoje wymarzone miejsce w Polsce</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {error && <div className="text-red-400 text-sm text-center bg-red-900/20 py-2 rounded-lg border border-red-900/50 shake-animation">{error}</div>}

          <div className="space-y-4">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8E9BAE]">✉️</span>
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-[#1A2C42] text-white pl-12 pr-4 py-4 rounded-2xl border border-transparent focus:border-[#00E0FF] outline-none placeholder-[#8E9BAE]/50 transition-all font-medium"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
              />
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8E9BAE]">🔒</span>
              <input
                type="password"
                placeholder="Hasło"
                className="w-full bg-[#1A2C42] text-white pl-12 pr-4 py-4 rounded-2xl border border-transparent focus:border-[#00E0FF] outline-none placeholder-[#8E9BAE]/50 transition-all font-medium"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#00E0FF] hover:bg-[#00c2dd] text-[#112334] font-bold py-4 rounded-2xl shadow-[0_0_20px_rgba(0,224,255,0.3)] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? 'Logowanie...' : 'Zaloguj się'}
          </button>
        </form>

        {/* Separator */}
        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-[#1A2C42]"></div>
          <span className="px-4 text-[#8E9BAE] text-xs font-medium uppercase tracking-wider">lub</span>
          <div className="flex-1 h-px bg-[#1A2C42]"></div>
        </div>

        {/* Guest Button */}
        <button
          onClick={handleGuestLogin}
          className="w-full bg-[#1A2C42] hover:bg-[#233a54] text-white font-semibold py-4 rounded-2xl border border-[#2B7FFF]/30 hover:border-[#2B7FFF] transition-all flex items-center justify-center gap-2 group"
        >
          <span>Kontynuuj jako Gość</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>

        {/* Register Link */}
        <div className="mt-10 text-center text-sm text-[#8E9BAE]">
          Nie masz konta? <Link to="/register" className="text-[#00E0FF] font-bold ml-1 hover:underline">Zarejestruj się</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;