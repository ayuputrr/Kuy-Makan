import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SuccessPage() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [buyerName, setBuyerName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const order = JSON.parse(localStorage.getItem('lastOrder'));
    const name = localStorage.getItem('buyerName');
    const table = localStorage.getItem('tableNumber');

    if (!order || order.length === 0) {
      navigate('/');
    } else {
      setOrderDetails(order);
      setBuyerName(name || '-');
      setTableNumber(table || '-');
    }
  }, [navigate]);

  const handlePrint = () => {
    window.print();
    localStorage.removeItem('lastOrder');
    localStorage.removeItem('buyerName');
    localStorage.removeItem('tableNumber');
  };

  const handleBack = () => {
    localStorage.removeItem('lastOrder');
    localStorage.removeItem('buyerName');
    localStorage.removeItem('tableNumber');
  };

  const totalPrice = orderDetails.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container my-5 print-area">
      <div className="text-center mb-4">
        <h1 className="fw-bold text-dark display-4">Pembayaran Berhasil!</h1>
        <p className="lead">Terima kasih, pesanan kamu sedang diproses 🙌</p>
      </div>

      <div className="mx-auto" style={{ maxWidth: '600px' }}>
        <div className="mb-4">
          <h5>📌 Nama Pembeli: <strong>{buyerName}</strong></h5>
          <h5>📍 Nomor Meja: <strong>{tableNumber}</strong></h5>
        </div>

        <h5 className="mb-3">📋 Daftar Pesanan:</h5>
        <ul className="list-group mb-3">
          {orderDetails.map(item => (
            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{item.title}</strong><br />
                <small>Jumlah: {item.quantity}</small>
              </div>
              <span>Rp{(item.price * item.quantity).toLocaleString('id-ID')}</span>
            </li>
          ))}
        </ul>

        <div className="text-end fw-bold fs-5">
          Total: Rp{totalPrice.toLocaleString('id-ID')}
        </div>

        <div className="d-flex justify-content-center gap-3 mt-4 no-print">
          <button className="btn btn-outline-secondary" onClick={handlePrint}>
            🖨️ Cetak Struk
          </button>
          <Link
            to="/"
            onClick={handleBack}
            className="btn"
            style={{ backgroundColor: '#c28006', color: 'white', fontWeight: 'bold' }}
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>

      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .print-area, .print-area * {
              visibility: visible;
            }
            .no-print {
              display: none !important;
            }
            .print-area {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              padding: 20px;
              font-size: 14px;
            }
          }
        `}
      </style>
    </div>
  );
}

export default SuccessPage;
