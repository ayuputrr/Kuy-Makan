import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const handleAdminClick = () => {
    const password = window.prompt('Masukkan sandi admin:');
    if (password === '123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      alert('Sandi salah. Akses ditolak.');
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Keluar dari mode admin?');
    if (confirmLogout) {
      localStorage.removeItem('isAdmin');
      navigate('/');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top shadow-sm navbar-green">
      <div className="container">
        {/* Logo Brand */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <img
            src="/asset/icon/logo2.png"
            alt="Logo"
            className="navbar-logo"
          />
          <span className="fw-bold text-dark">Kuy Makan</span>
        </Link>

        {/* Menu kanan */}
        <div className="d-flex gap-3 ms-auto align-items-center">
          {/* 🔐 Admin Panel */}
          {!isAdmin ? (
            <button className="btn btn-sm btn-outline-warning" onClick={handleAdminClick}>
              🧑‍🍳 Admin Panel
            </button>
          ) : (
            <button className="btn btn-sm btn-outline-danger" onClick={handleLogout}>
              🚪 Keluar Admin
            </button>
          )}

          {/* 🌙 Mode Dark/Light */}
          <button
            className="btn btn-sm btn-outline-dark"
            onClick={() => setDarkMode(prev => !prev)}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>

          {/* 🛒 Cart */}
          <Link to="/cart" className="nav-link">
            <img
              src="/asset/icon/cart.png"
              alt="Cart"
              style={{ width: '40px', height: '40px', objectFit: 'contain' }}
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
