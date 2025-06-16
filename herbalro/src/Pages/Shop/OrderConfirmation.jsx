import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetails = location.state?.orderDetails;

  useEffect(() => {
    if (!orderDetails) {
      navigate('/shop');
    }
  }, [orderDetails, navigate]);

  if (!orderDetails) {
    return null;
  }

  return (
    <div className="order-confirmation">
      <div className="confirmation-content">
        <div className="success-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="var(--success-color)"/>
          </svg>
        </div>
        
        <h1>Order Confirmed!</h1>
        <p className="confirmation-message">
          Thank you for your purchase! Your order has been successfully placed and will be processed shortly.
        </p>

        <div className="order-details card">
          <h2>Order Details</h2>
          <div className="order-info">
            <div className="order-number">
              <strong>Order Number: {orderDetails.orderNumber}</strong>
            </div>
            <div className="customer-info">
              <h3>Shipping Information</h3>
              <p>{orderDetails.firstName} {orderDetails.lastName}</p>
              <p>{orderDetails.address}</p>
              <p>{orderDetails.city}, {orderDetails.state} {orderDetails.zipCode}</p>
              <p>Email: {orderDetails.email}</p>
            </div>
          </div>
        </div>

        <div className="order-items card">
          <h3>Items Ordered</h3>
          <div className="items-list">
            {orderDetails.items.map(item => (
              <div key={item.id} className="order-item">
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="order-total">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>${orderDetails.total.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="total-row final-total">
              <span>Total:</span>
              <span>${orderDetails.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="confirmation-actions">
          <Link to="/shop" className="btn btn-primary">
            Continue Shopping
          </Link>
          <button 
            className="btn btn-outline"
            onClick={() => window.print()}
          >
            Print Receipt
          </button>
        </div>

        <div className="next-steps">
          <h3>What's Next?</h3>
          <ul>
            <li>You'll receive an email confirmation shortly</li>
            <li>We'll send you tracking information once your order ships</li>
            <li>Estimated delivery: 3-5 business days</li>
            <li>Need help? Contact our customer support</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;