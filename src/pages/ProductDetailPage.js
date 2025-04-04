import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import useFetch from '../hooks/useFetch';
import { toast } from 'react-toastify';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: item, loading, error } = useFetch(`https://67ec14d7aa794fb3222cc82c.mockapi.io/api/food/${id}`);
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [buyerName, setBuyerName] = useState(localStorage.getItem('buyerName') || '');
  const [tableNumber, setTableNumber] = useState(localStorage.getItem('tableNumber') || '');

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-danger text-center">Error: {error}</div>;
  if (!item) return <div className="text-center"> </div>;

  const product = {
    id: item.id,
    title: item.Nama,
    price: item.Harga,
    image: item.Image,
    description: item.Deskripsi
  };

  const handleAddToCart = () => {
    if (!buyerName || !tableNumber) {
      toast.warning('Masukkan nama pembeli dan nomor meja terlebih dahulu');
      return;
    }
    if (quantity < 1) {
      toast.warning('Jumlah minimal 1');
      return;
    }
    localStorage.setItem('buyerName', buyerName);
    localStorage.setItem('tableNumber', tableNumber);
    addToCart(product, quantity);
    toast.success(`${product.title} x${quantity} ditambahkan ke keranjang`);
  };

  return (
    <div className="container">
      <div className="mb-4">
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          &larr; Kembali
        </button>
      </div>

      <div className="row align-items-center g-4">
        <div className="col-md-5 text-center">
          <img
            src={`/asset/images/${product.title}.jpeg`}
            onError={e => (e.target.src = product.image)}
            alt={product.title}
            className="img-fluid rounded shadow"
            style={{ maxHeight: '250px', objectFit: 'cover' }}
          />
        </div>
        <div className="col-md-7">
          <h2 style={{ color: '#000', fontWeight: 'bold' }}>{product.title}</h2>
          <p className="text-muted">{product.description}</p>
          <h4 style={{ color: '#000' }}>Rp{product.price.toLocaleString('id-ID')}</h4>

          <div className="mb-3">
            <label className="form-label">Nama Pembeli</label>
            <input
              className="form-control"
              type="text"
              value={buyerName}
              onChange={e => setBuyerName(e.target.value)}
              placeholder="Masukkan nama"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Nomor Meja</label>
            <input
              className="form-control"
              type="text"
              value={tableNumber}
              onChange={e => setTableNumber(e.target.value)}
              placeholder="Contoh: 12"
            />
          </div>

          <div className="d-flex align-items-center gap-3 mt-3">
            <button
              className="btn"
              style={{ backgroundColor: '#c28006', fontWeight: 'bold' }}
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
            >
              -
            </button>
            <span className="fs-5 fw-bold">{quantity}</span>
            <button
              className="btn"
              style={{ backgroundColor: '#c28006', fontWeight: 'bold' }}
              onClick={() => setQuantity(q => q + 1)}
            >
              +
            </button>
          </div>

          <button
            className="btn mt-4 px-3"
            style={{ backgroundColor: '#c28006', fontWeight: 'bold' }}
            onClick={handleAddToCart}
          >
            Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;