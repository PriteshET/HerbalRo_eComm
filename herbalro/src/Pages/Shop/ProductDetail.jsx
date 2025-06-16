import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CardContext';
import './ProductDetail.css';
// import { products } from '../../ProductData/products';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/shop/product/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, [id]);
  

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <button className="btn btn-primary" onClick={() => navigate('/shop')}>
          Back to Products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/shop/cart');
  };

  return (
    <div className="product-detail">
      <button className="back-btn" onClick={() => navigate('/shop')}>
        ← Back to Products
      </button>
      
      <div className="product-detail-content">
        <div className="product-image-section">
          {/* <img src={product.image} alt={product.name} className="product-image" /> */}
          <img
                src={`http://localhost:3001${product.images}`} // note: it's product.images[0]
                alt={product.name}
                className="product-image"
              />
        </div>
        
        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">&#x20B9;{product.price}</p>
          
          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
          
          {/* <div className="product-features">
            <h3>Features</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div> */}
          
          <div className="product-meta">
             <span className="product-category">Size: {product.size}mg</span>
            <span
              className={`stock-status ${
                product.stock > 0 ? 'in-stock' : 'out-of-stock'
              }`}
            >
              {product.stock === 0
                ? 'Out of Stock'
                : product.stock < 10
                ? `${product.stock} left in stock`
                : 'In Stock'}
            </span>

          </div>
          
          <div className="product-actions">
            <button 
              className="btn btn-primary add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              Add to Cart
            </button>
            <button className="btn btn-outline" onClick={() => navigate('/shop')}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;