import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    getTotalPrice
  } = useContext(CartContext);

  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('');
  const [paymentInfo, setPaymentInfo] = useState('');

  useEffect(() => {
    const logo = document.getElementById('floating-logo');
    if (logo) {
      logo.classList.add('floating');
    }
  }, []);

  const paymentNumbers = {
    dana: { label: 'DANA', value: '085712345678 a.n. KuyMakan' },
    gopay: { label: 'GoPay', value: '081212341234 a.n. KuyMakan' },
    shopeepay: { label: 'ShopeePay', value: '082312341234 a.n. KuyMakan' },
    mandiri: { label: 'Mandiri', value: '1234567890123 a.n. KuyMakan Mandiri' },
    bsi: { label: 'BSI', value: '4567890123456 a.n. KuyMakan BSI' },
    bca: { label: 'BCA', value: '7890123456789 a.n. KuyMakan BCA' },
    bri: { label: 'BRI', value: '9876543210123 a.n. KuyMakan BRI' }
  };

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
    setPaymentInfo(paymentNumbers[method]?.value || '');
  };

  const handleBayar = () => {
    if (!selectedPayment) {
      alert('Pilih metode pembayaran terlebih dahulu.');
      return;
    }

    const buyerName = localStorage.getItem('buyerName') || '-';
    const tableNumber = localStorage.getItem('tableNumber') || '-';

    const lastOrder = {
      items: [...cart],
      buyerName,
      tableNumber,
      paymentMethod: paymentNumbers[selectedPayment]?.label || selectedPayment,
    };

    localStorage.setItem('lastOrder', JSON.stringify(cart));

    const allOrders = JSON.parse(localStorage.getItem('allOrders')) || [];
    allOrders.push(lastOrder);
    localStorage.setItem('allOrders', JSON.stringify(allOrders));

    clearCart();
    navigate('/success');
  };

  return (
    <div className="container">
      <div className="mb-3">
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          &larr; Kembali
        </button>
      </div>

      <div className="text-center mb-4">
        <img
          id="floating-logo"
          src="/asset/icon/logo2.png"
          alt="Logo Restoran"
          style={{ width: '300px', height: '300px' }}
        />
      </div>

      <h2 className="mb-4">Keranjang Makanan</h2>

      {cart.length === 0 ? (
        <div className="alert alert-info">Keranjang kamu kosong.</div>
      ) : (
        <div className="vstack gap-3">
          {cart.map(item => (
            <div
              key={item.id}
              className="card p-3 d-flex flex-row justify-content-between align-items-center"
            >
              <div className="flex-grow-1">
                <h5 className="mb-1">{item.title}</h5>
                <p className="text-success fw-bold mb-1">
                  Rp{item.price.toLocaleString('id-ID')} x {item.quantity} ={' '}
                  <strong>Rp{(item.price * item.quantity).toLocaleString('id-ID')}</strong>
                </p>
                <div className="btn-group" role="group">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => decreaseQuantity(item.id)}
                  >-</button>
                  <span className="mx-2 align-self-center">{item.quantity}</span>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => increaseQuantity(item.id)}
                  >+</button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="btn btn-sm btn-danger"
              >Hapus</button>
            </div>
          ))}

          <div className="mt-4">
            <label className="form-label fw-bold">Pilih Metode Pembayaran:</label>
            <select
              className="form-select"
              value={selectedPayment}
              onChange={(e) => handlePaymentSelect(e.target.value)}
            >
              <option value="">-- Pilih Metode --</option>
              <option value="dana">DANA</option>
              <option value="gopay">GoPay</option>
              <option value="shopeepay">ShopeePay</option>
              <option value="mandiri">Mandiri</option>
              <option value="bsi">BSI</option>
              <option value="bca">BCA</option>
              <option value="bri">BRI</option>
            </select>
          </div>

          {paymentInfo && (
            <div className="alert alert-info mt-3">
              <strong>Silakan transfer ke:</strong><br />
              {paymentInfo}
            </div>
          )}

          <div className="text-end mt-3">
            <h4>Total: Rp{getTotalPrice().toLocaleString('id-ID')}</h4>
            <button
              onClick={handleBayar}
              className="btn mt-2"
              style={{ backgroundColor: '#c28006', color: 'white', fontWeight: 'bold' }}
            >
              Bayar Sekarang
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
