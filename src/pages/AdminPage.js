// src/pages/AdminPage.js
import { useEffect, useState } from 'react';

function AdminPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('allOrders');
    if (stored) {
      setOrders(JSON.parse(stored));
    }
  }, []);

  const handleDelete = (index) => {
    const updated = [...orders];
    updated.splice(index, 1);
    setOrders(updated);
    localStorage.setItem('allOrders', JSON.stringify(updated));
  };

  const handlePrint = (order) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<h3>Detail Struk</h3>');
    printWindow.document.write(`<p><strong>Nama:</strong> ${order.buyerName}</p>`);
    printWindow.document.write(`<p><strong>Meja:</strong> ${order.tableNumber}</p>`);
    printWindow.document.write('<ul>');
    order.items.forEach(item => {
      printWindow.document.write(`<li>${item.title} x ${item.quantity}</li>`);
    });
    printWindow.document.write('</ul>');
    printWindow.print();
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">📋 Daftar Order Masuk</h2>
      {orders.length === 0 ? (
        <div className="alert alert-info">Belum ada pesanan.</div>
      ) : (
        <div className="vstack gap-4">
          {orders.map((order, idx) => (
            <div key={idx} className="card p-3 shadow-sm">
              <div className="mb-2">
                <strong>Nama:</strong> {order.buyerName} | <strong>Meja:</strong> {order.tableNumber}
              </div>
              <ul className="mb-2">
                {order.items.map(item => (
                  <li key={item.id}>{item.title} x {item.quantity}</li>
                ))}
              </ul>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(idx)}>Hapus</button>
                <button className="btn btn-sm btn-secondary" onClick={() => handlePrint(order)}>Cetak Struk</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPage;
