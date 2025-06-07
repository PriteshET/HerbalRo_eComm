import { useState } from "react";
import AdminLayout from "./AdminLayout";
import UsersTab from "./UsersTab";
import ProductsTab from "./ProductsTab";
import OrdersTab from "./OrdersTab";
import ShopTab from "./ShopTab";
import FeedbackTab from "./FeedbackTab";
import { Navigate, Route, Routes } from "react-router-dom";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <UsersTab />;
      case "products":
        return <ProductsTab />;
      case "orders":
        return <OrdersTab />;
      case "shop":
        return <ShopTab />;
      case "feedback":
        return <FeedbackTab />;
      default:
        return <UsersTab />;
    }
  };

  return (
    // <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
    //   {renderContent()}
    // </AdminLayout>
    <AdminLayout>
      <Routes>
        <Route index element={<UsersTab />} />
        {/* <Route path="products" element={<ProductsTab />} />
        <Route path="orders" element={<OrdersTab />} />
        <Route path="shop" element={<ShopTab />} />
        <Route path="feedback" element={<FeedbackTab />} />
        <Route path="*" element={<Navigate to="/admin" />} /> */}

        
      </Routes>
    </AdminLayout>
  );
};

export default AdminDashboard;