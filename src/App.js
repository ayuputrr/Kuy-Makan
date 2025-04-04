import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import SuccessPage from './pages/SuccessPage';
import NotFoundPage from './pages/NotFoundPage';
import SplashPage from './pages/SplashPage';
import { CartProvider } from './context/CartContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './pages/SplashScreen.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminPage from './pages/AdminPage';




function App() {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

  return (
    <CartProvider>
      <div className={darkMode ? 'bg-dark text-light' : ''}>
        <BrowserRouter>
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <main className="container py-4 min-vh-100">
            <Routes>
              <Route path="/" element={<SplashPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/menu/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
              
            </Routes>
          </main>
          <Footer />
          <ToastContainer position="bottom-right" autoClose={3000} />
        </BrowserRouter>
      </div>
    </CartProvider>
  );
}

export default App;
