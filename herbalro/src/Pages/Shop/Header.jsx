import { Link } from 'react-router-dom';
import { useCart } from '../../context/CardContext';
import './Header.css';
import { ShoppingCart } from 'lucide-react';

const Header = () => {
  const { getCartItemCount } = useCart();

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <h1>SpiruVedic</h1>
          </Link>
          
          <nav className="nav">
            <Link to='/' className='nav-link'>Home</Link>
            <Link to="/shop" className="nav-link">Products</Link>
            <Link to="/shop/cart" className="nav-link cart-link">
                <ShoppingCart />
              Cart
              {getCartItemCount() > 0 && (
                <span className="cart-badge">{getCartItemCount()}</span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;