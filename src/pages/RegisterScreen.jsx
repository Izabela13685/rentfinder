import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterScreen = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;
    if (!name || !email || !password || !confirmPassword) {
      setError('Wypełnij wszystkie pola.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Nieprawidłowy format email.');
      return false;
    }
    if (password.length < 6) {
      setError('Hasło musi mieć min. 6 znaków.');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Hasła nie są identyczne.');
      return false;
    }
    return true;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setTimeout(() => {
      try {
        register(formData.name, formData.email, formData.password);
        navigate('/home');
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#112334] px-6 transition-colors duration-300">
      <div className="w-full max-w-sm">

        <div className="text-center mb-0">
          <h1 className="text-2xl font-bold text-white tracking-wide">Utwórz konto</h1>
          <p className="text-[#8E9BAE] text-sm mt-2">Dołącz do RentFinder już dziś</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-900/20 border border-red-900/50 rounded-xl text-center">
            <p className="text-red-400 text-sm font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8E9BAE]">👤</span>
            <input
              type="text"
              placeholder="Imię i nazwisko"
              className="w-full bg-[#1A2C42] text-white pl-12 pr-4 py-4 rounded-2xl border border-transparent focus:border-[#00E0FF] outline-none placeholder-[#8E9BAE]/50 transition-all font-medium"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                setError('');
              }}
            />
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8E9BAE]">✉️</span>
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-[#1A2C42] text-white pl-12 pr-4 py-4 rounded-2xl border border-transparent focus:border-[#00E0FF] outline-none placeholder-[#8E9BAE]/50 transition-all font-medium"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
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
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                setError('');
              }}
            />
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8E9BAE]">🔑</span>
            <input
              type="password"
              placeholder="Potwierdź hasło"
              className="w-full bg-[#1A2C42] text-white pl-12 pr-4 py-4 rounded-2xl border border-transparent focus:border-[#00E0FF] outline-none placeholder-[#8E9BAE]/50 transition-all font-medium"
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData({ ...formData, confirmPassword: e.target.value });
                setError('');
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#00E0FF] hover:bg-[#00c2dd] text-[#112334] font-bold py-4 rounded-2xl shadow-[0_0_20px_rgba(0,224,255,0.3)] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {isLoading ? 'Tworzenie konta...' : 'Zarejestruj się'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-[#8E9BAE]">
          Masz już konto? <Link to="/login" className="text-[#00E0FF] font-bold ml-1 hover:underline">Zaloguj się</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
