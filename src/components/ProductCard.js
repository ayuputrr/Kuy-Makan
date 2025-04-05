import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product }) {
  return (
    <div className="card h-100 position-relative shadow-sm">
      {/* Badge */}
      {product.label && (
        <span className="product-badge">{product.label}</span>
      )}

      <img
        src={`/asset/images/${product.title}.jpeg`}
        onError={e => (e.target.src = product.image)}
        alt={product.title}
        className="card-img-top"
        style={{ height: '140px', objectFit: 'cover', borderRadius: '12px 12px 0 0' }}
      />
      <div className="card-body d-flex flex-column">
        <h6 className="card-title fw-semibold mb-1">{product.title}</h6>
        <p className="text-success fw-bold mb-2">Rp{product.price.toLocaleString('id-ID')}</p>
        <Link to={`/menu/${product.id}`} className="btn btn-sm btn-outline-primary mt-auto w-100">
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    label: PropTypes.string 
  }).isRequired
};

export default ProductCard;
