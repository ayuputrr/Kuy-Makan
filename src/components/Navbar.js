import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    const password = window.prompt('Masukkan sandi admin:');
    if (password === '123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      alert('Sandi salah. Akses ditolak.');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top shadow-sm navbar-green">
      <div className="container d-flex justify-content-between align-items-center">

       
        <Link to="/" className="navbar-brand">
          <img
            src="/asset/icon/logo2.png"
            alt="Logo"
            style={{
              height: '85px', 
              objectFit: 'contain'
            }}
          />
        </Link>

        <div className="d-flex gap-3 align-items-center ms-auto">
         
          <button className="btn btn-sm btn-outline-warning" onClick={handleAdminClick}>
            🧑‍🍳 Admin Panel
          </button>

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
              style={{ width: '40px', height: '40px', objectFit: 'contain' }}
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
