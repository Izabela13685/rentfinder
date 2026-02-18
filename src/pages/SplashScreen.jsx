import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SplashScreen = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar (2.5s duration)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2; // Increases by 2% every 50ms => 100% in 2500ms
      });
    }, 50);

    // Timeout to redirect
    const timeout = setTimeout(() => {
      if (!loading) {
        if (user) {
          navigate('/home');
        } else {
          navigate('/login');
        }
      }
    }, 2800); // Wait slightly longer than animation

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate, user, loading]);

  return (
    <div className="bg-[#112334] min-h-screen flex flex-col items-center justify-center relative overflow-hidden">

      {/* Background Decor (optional gradient blob) */}
      <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] bg-[#2B7FFF] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse"></div>

      {/* Logo Container */}
      <div>
        {/* Custom GIF Logo */}
        <img
          src="/images/Znajdź mieszkanie, które naprawdę pasuje.gif"
          alt="Logo"
          className="object-contain"
          style={{ width: '500px', height: '500px', marginBottom: '-100px' }}
        />
      </div>

      {/* Title matching Figma Typography (Urbanist Bold) */}
      <h1 className="text-4xl font-[800] text-white tracking-wide font-sans mt-1">
        Rent<span className="text-[#00E0FF]">Finder</span>
      </h1>
      <p className="text-[#8E9BAE] mt-2 text-sm tracking-wider font-medium uppercase font-sans">
        Znajdź mieszkanie, które naprawdę pasuje
      </p>

      {/* Progress Bar Container */}
      <div className="absolute bottom-20 w-64 h-2 bg-[#1A2C42] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#3B82F6] shadow-[0_0_15px_#3B82F6] rounded-full transition-all duration-[50ms] ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SplashScreen;
