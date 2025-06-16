import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, ShoppingBag, TrendingUp, Users, Package } from "lucide-react";
import "./ShopTab.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const ShopTab = () => {
  const handleGoToShop = () => {
    // This would typically navigate to the main e-commerce site
    window.open("/shop", "_blank");
  };

  const navigate = useNavigate();

  useEffect(() =>{
    axios.get("http://localhost:3001/admin", { withCredentials: true })
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

  const stats = [
    { label: "Total Products", value: "247", icon: Package, color: "text-blue-600" },
    { label: "Active Users", value: "1,234", icon: Users, color: "text-green-600" },
    { label: "Monthly Revenue", value: "$45,678", icon: TrendingUp, color: "text-purple-600" },
    { label: "Total Orders", value: "892", icon: ShoppingBag, color: "text-orange-600" },
  ];

  return (
    <div className="shop-tab">
      <ToastContainer/>
      <div className="shop-header">
        <h2 className="shop-title">Shop Overview</h2>
        <Button 
          onClick={handleGoToShop}
          className="visit-shop-butn"
          size="lg"
        >
          <ExternalLink className="visit-icon" />
          Visit Shop
        </Button>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="stat-card">
              <CardContent className="stat-content">
                <div className="stat-icon-wrapper">
                  <div className="stat-icon">
                    <Icon className={`stat-icon-svg ${stat.color}`} />
                  </div>
                  <div className="stat-details">
                    <dt className="stat-label">{stat.label}</dt>
                    <dd className="stat-value">{stat.value}</dd>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="content-grid">
        <Card className="card"> 
          <CardHeader>
            <CardTitle className="card-title">
              <ShoppingBag className="title-icon" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="activity-list">
              <div className="activity-item">
                <div>
                  <p className="activity-title">New order received</p>
                  <p className="activity-subtitle">Order #ORD-004 - $89.99</p>
                </div>
                <span className="activity-time">2 min ago</span>
              </div>
              <div className="activity-item">
                <div>
                  <p className="activity-title">Product restocked</p>
                  <p className="activity-subtitle">Classic T-Shirt - 50 units added</p>
                </div>
                <span className="activity-time">15 min ago</span>
              </div>
              <div className="activity-item">
                <div>
                  <p className="activity-title">User registered</p>
                  <p className="activity-subtitle">sarah@example.com</p>
                </div>
                <span className="activity-time">1 hour ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card">
          <CardHeader>
            <CardTitle className="card-title">
              <TrendingUp className="title-icon" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="actions-list">
              <Button 
                onClick={handleGoToShop}
                variant="outline" 
                className="action-butn"
              >
                <ExternalLink className="action-icon" />
                Visit Main Store
              </Button>
              <Button 
                variant="outline" 
                className="action-butn"
                onClick={() => console.log("View analytics")}
              >
                <TrendingUp className="action-icon" />
                View Analytics
              </Button>
              <Button 
                variant="outline" 
                className="action-butn"
                onClick={() => console.log("Manage inventory")}
              >
                <Package className="action-icon" />
                Manage Inventory
              </Button>
              <Button 
                variant="outline" 
                className="action-butn"
                onClick={() => console.log("Customer support")}
              >
                <Users className="action-icon" />
                Customer Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="card">
        <CardHeader>
          <CardTitle>Shop Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="info-grid">
            <div>
              <h4 className="info-section-title">Store Details</h4>
              <div className="info-list">
                <p><span className="info-label">Store Name:</span> Fashion Hub</p>
                <p><span className="info-label">Status:</span> <span className="status-active">Active</span></p>
                <p><span className="info-label">Domain:</span> fashionhub.com</p>
                <p><span className="info-label">Since:</span> January 2024</p>
              </div>
            </div>
            <div>
              <h4 className="info-section-title">Performance</h4>
              <div className="info-list">
                <p><span className="info-label">Conversion Rate:</span> 3.2%</p>
                <p><span className="info-label">Avg Order Value:</span> $78.50</p>
                <p><span className="info-label">Customer Rating:</span> 4.8/5</p>
                <p><span className="info-label">Return Rate:</span> 2.1%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShopTab;