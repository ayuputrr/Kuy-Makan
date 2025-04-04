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
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top shadow-sm navbar-green">
      <div className="container d-flex align-items-center justify-content-between">
        {/* Logo Saja */}
        <Link to="/" className="navbar-brand">
          <img
            src="/asset/icon/logo2.png"
            alt="Logo"
            className="navbar-logo"
            style={{ height: '70px' }} 
          />
        </Link>

        <div className="d-flex gap-3 align-items-center">
         
          {isAdmin ? (
            <button className="btn btn-sm btn-danger" onClick={handleLogout}>
              Logout Admin
            </button>
          ) : (
            <button className="btn btn-sm btn-outline-warning" onClick={handleAdminClick}>
              🧑‍🍳 Admin Panel
            </button>
          )}

         
          <button
            className="btn btn-sm btn-outline-dark"
            onClick={() => setDarkMode(prev => !prev)}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>

      
          <Link to="/cart" className="nav-link">
            <img
              src="/asset/icon/cart.png"
              alt="Cart"
              style={{ width: '55px', height: '55px', objectFit: 'contain' }}
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
