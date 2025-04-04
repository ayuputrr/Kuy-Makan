import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashScreen.css';

function SplashPage({ darkMode }) {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={`splash-container ${darkMode ? 'dark' : ''}`}>
      <img src="/asset/icon/logo.png" alt="Logo" className="splash-logo" />
    </div>
  );
}

export default SplashPage;
