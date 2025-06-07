import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import "./OrdersTab.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const OrdersTab = () => {

  const navigate = useNavigate();

  useEffect(() =>{
    axios.get("http://localhost:3001/verify", { withCredentials: true })
        .then(res => {
          if (!res.data.success) {
            toast.error("Unauthorized. Redirecting...");
            navigate('/login');
          }
        })
        .catch(() => {
          toast.error("Access denied.");
          navigate('/login');
        });
  },[])

  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      customerName: "Alice Cooper",
      customerEmail: "alice@example.com",
      product: "Classic T-Shirt",
      quantity: 2,
      total: 59.98,
      status: "pending",
      orderDate: "2024-01-15"
    },
    {
      id: "ORD-002", 
      customerName: "Bob Wilson",
      customerEmail: "bob@example.com",
      product: "Denim Jeans",
      quantity: 1,
      total: 79.99,
      status: "shipped",
      orderDate: "2024-01-14"
    },
    {
      id: "ORD-003",
      customerName: "Carol Davis",
      customerEmail: "carol@example.com",
      product: "Sneakers",
      quantity: 1,
      total: 129.99,
      status: "delivered",
      orderDate: "2024-01-13"
    }
  ]);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus }
        : order
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'processing':
        return 'status-processing';
      case 'shipped':
        return 'status-shipped';
      case 'delivered':
        return 'status-delivered';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-default';
    }
  };

  return (
    <div className="orders-tab">
      <ToastContainer/>
      <div className="orders-header">
        <h2 className="orders-title">Order Management</h2>
        <div className="orders-count">
          <ShoppingCart color="#1f3521" className="count-icon" />
          <span className="count-text">{orders.length} Orders</span>
        </div>
      </div>

      <div className="stats-grid">
        <Card className="stat-card">
          <div className="stat-content">
            <div className="stat-icon pending-icon">
              <div className="stat-dot"></div>
            </div>
            <div className="stat-info">
              <dt className="stat-label">Pending Orders</dt>
              <dd className="stat-value2">
                {orders.filter(order => order.status === 'pending').length}
              </dd>
            </div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-content">
            <div className="stat-icon processing-icon">
              <div className="stat-dot"></div>
            </div>
            <div className="stat-info">
              <dt className="stat-label">Processing</dt>
              <dd className="stat-value2">
                {orders.filter(order => order.status === 'processing').length}
              </dd>
            </div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-content">
            <div className="stat-icon shipped-icon">
              <div className="stat-dot"></div>
            </div>
            <div className="stat-info">
              <dt className="stat-label">Shipped</dt>
              <dd className="stat-value2">
                {orders.filter(order => order.status === 'shipped').length}
              </dd>
            </div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-content">
            <div className="stat-icon delivered-icon">
              <div className="stat-dot"></div>
            </div>
            <div className="stat-info">
              <dt className="stat-label">Delivered</dt>
              <dd className="stat-value2">
                {orders.filter(order => order.status === 'delivered').length}
              </dd>
            </div>
          </div>
        </Card>
      </div>
      
      <Card>
        <CardContent className="table-container">
          <div className="table-wrapper">
            <table className="orders-table">
              <thead className="table-header">
                <tr>
                  <th className="table-th">Order ID</th>
                  <th className="table-th">Customer</th>
                  <th className="table-th">Product</th>
                  <th className="table-th">Quantity</th>
                  <th className="table-th">Total</th>
                  <th className="table-th">Date</th>
                  <th className="table-th">Status</th>
                  <th className="table-th">Actions</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {orders.map((order) => (
                  <tr key={order.id} className="table-row">
                    <td className="table-td order-id">{order.id}</td>
                    <td className="table-td">
                      <div>
                        <div className="customer-name">{order.customerName}</div>
                        <div className="customer-email">{order.customerEmail}</div>
                      </div>
                    </td>
                    <td className="table-td">{order.product}</td>
                    <td className="table-td">{order.quantity}</td>
                    <td className="table-td">${order.total.toFixed(2)}</td>
                    <td className="table-td">{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td className="table-td">
                      <span className={`status-badge ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="table-td">
                      <Select
                        value={order.status}
                        onValueChange={(value) => handleStatusChange(order.id, value)}
                      >
                        <SelectTrigger className="status-select">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="status-dropdown">
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      
    </div>
  );
};

export default OrdersTab;