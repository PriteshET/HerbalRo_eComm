// import React from 'react';
// import './Shop.css';
// import { Link } from 'react-router-dom';

// const Shop = () => {
//   return (




    
//     <div className="shop-container">
//       <div className="shop-content">
//         <h1>🛍️ Shop Coming Soon!</h1>
//         <p>We're working hard to bring you a green and healthy shopping experience. Stay tuned for exciting products powered by Spirulina!</p>
//       </div>
//       <div className="go-home">
//         <button className='btn'><Link to='/'>Go Back</Link></button>
//       </div>
//     </div>
//   );
// };

// export default Shop;


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import './Shop.css';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import Checkout from './Checkout';
import { CartProvider } from '../../context/CardContext';
import Header from './Header';
import OrderConfirmation from './OrderConfirmation';

function Shop() {
  return (
    <CartProvider>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ProductList />} /> {/* matches "/shop" */}
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
          </Routes>
        </main>
      </div>
    </CartProvider>
  );
}

export default Shop;
