import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useEffect, useState } from 'react';

function Navbar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = storedCart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    setCartCount(total);
  }, []);

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
    <>
      
      <nav className="navbar navbar-expand-lg sticky-top shadow-sm navbar-kuy px-3">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
          <button
              className="toggle-icon"
              onClick={() => setMenuOpen(prev => !prev)}>
            {menuOpen ? '✕' : '☰'}
          </button>



            
            <div className="cart-icon-wrapper">
              <Link to="/cart" className="cart-icon-link">
                <img
                  src="/asset/icon/cart.png"
                  alt="Cart"
                  className="cart-icon"
                  style={{ width: '32px', height: '32px' }}
                />
              </Link>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </div>
          </div>

          
          <Link to="/" className="navbar-brand ms-auto">
            <img
              src="/asset/icon/logo2.png"
              alt="Logo"
              style={{ height: '60px' }}
            />
          </Link>
        </div>
      </nav>

      
      {menuOpen && (
        <>
          <div className="sidebar-menu">
            <div className="d-flex flex-column gap-3 mt-5 px-3">
              {isAdmin ? (
                <button className="btn btn-sm btn-danger" onClick={handleLogout}>
                  Logout Admin
                </button>
              ) : (
                <button className="btn btn-sm btn-outline-warning" onClick={handleAdminClick}>
                  🧑‍🍳 Admin
                </button>
              )}

              <button
                className="btn btn-sm btn-outline-dark"
                onClick={() => setDarkMode(prev => !prev)}
              >
                {darkMode ? '☀️ Light' : '🌙 Dark'}
              </button>
            </div>
          </div>

          <div className="sidebar-overlay" onClick={() => setMenuOpen(false)}></div>
        </>
      )}
    </>
  );
}

export default Navbar;
