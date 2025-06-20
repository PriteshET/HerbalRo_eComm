import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CardContext';
import './ProductList.css';
// import { products } from '../../ProductData/products';
import axios from 'axios';

const ProductList = () => {
  const { addToCart } = useCart();
  const [filter, setFilter] = useState('All');

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/shop/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  
  axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    useEffect(()=>{
      axios.get('http://localhost:3001/shop')
      .then(result => {console.log(result)
        if(result.data !== "Success"){
          navigate('/login')
        }
      })
    },[])



  const categories = ['All', ...new Set(products.map(product => product.category))];
  
  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(product => product.category === filter);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="product-list">
      <div className="product-list-header">
        <h1>Our Products</h1>
        <p>Discover our carefully curated collection of premium products</p>
      </div>

      {/* <div className="filter-section">
        <div className="filter-buttons">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div> */}

      <div className="products-grid grid grid-3">
        {filteredProducts.map(product => (
          <div key={product._id} className="product-card card">
            <div className="product-image">
              {/* <img src={product.image} alt={product.name} /> */}
              <img
                src={`http://localhost:3001${product.images}`} // note: it's product.images[0]
                alt={product.name}
              />


              <div className="product-overlay">
                <Link to={`/shop/product/${product._id}`} className="btn btn-outline">
                  View Details
                </Link>
              </div>
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-footer">
                <span className="product-price">&#x20B9;{product.price}</span>
                <button 
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;