import React from 'react';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {
  return (
    <div className="shop-container">
      <div className="shop-content">
        <h1>🛍️ Shop Coming Soon!</h1>
        <p>We're working hard to bring you a green and healthy shopping experience. Stay tuned for exciting products powered by Spirulina!</p>
      </div>
      <div className="go-home">
        <button className='btn'><Link to='/'>Go Back</Link></button>
      </div>
    </div>
  );
};

export default Shop;
