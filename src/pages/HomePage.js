import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import ProductCard from '../components/ProductCard';
import './HomePage.css';

function HomePage() {
  const { data: items, loading, error } = useFetch('https://67ec14d7aa794fb3222cc82c.mockapi.io/api/food');
  const [search, setSearch] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    <div className="promo-banner slide-item text-center">
      <img
        src="/asset/icon/promo3.jpg"
        alt="Promo 1"
        className="img-fluid rounded shadow"
        style={{ maxHeight: '700px', objectFit: 'cover', width: '100%', borderRadius: '16px' }}
      />
    </div>,
    <div className="promo-banner slide-item text-center">
      <img
        src="/asset/icon/promo1.jpg"
        alt="Promo 2"
        className="img-fluid rounded shadow"
        style={{ maxHeight: '770px', objectFit: 'cover', width: '100%', borderRadius: '16px' }}
      />
    </div>,
    <div className="promo-banner slide-item text-center">
      <img
        src="/asset/icon/promo2.jpg"
        alt="Promo 3"
        className="img-fluid rounded shadow"
        style={{ maxHeight: '770px', objectFit: 'cover', width: '100%', borderRadius: '16px' }}
      />
    </div>
  ];

  const handleNext = () => setCurrentSlide((currentSlide + 1) % slides.length);
  const handlePrev = () => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);

  const filteredItems = items?.filter(item =>
    item.Nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="homepage">
      <div className="custom-carousel mb-4">
        <div className="slide-container">
          {slides[currentSlide]}
        </div>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <button className="btn btn-outline-dark btn-sm px-3" onClick={handlePrev}>&lt;</button>
          <button className="btn btn-outline-dark btn-sm px-3" onClick={handleNext}>&gt;</button>
        </div>
      </div>

      <div className="container py-4">
        <input
          type="text"
          placeholder="Cari menu ..."
          className="form-control mb-4 shadow-sm"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <h4 className="fw-bold mb-3">Kategori Menu</h4>
        <p className="text-muted">Temukan menu favorit kamu di sini!</p>

        {loading && <div className="text-center">Loading menu...</div>}
        {error && <div className="text-danger text-center">Error: {error}</div>}

        <div className="row g-4">
          {filteredItems?.map(item => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={item.id}>
              <ProductCard
                product={{
                  id: item.id,
                  title: item.Nama,
                  price: item.Harga,
                  image: item.Image
                }}
              />
            </div>
          ))}
          {filteredItems?.length === 0 && (
            <div className="text-center text-muted">Menu tidak ditemukan</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
