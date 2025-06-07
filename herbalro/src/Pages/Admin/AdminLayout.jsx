import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Package, ShoppingCart, LogOut, Store, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import "./AdminLayout.css";
import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const navItems = [
  { path: "/admin", label: "Users", icon: User },
  { path: "/admin/products", label: "Products", icon: Package },
  { path: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { path: "/admin/shop", label: "Shop", icon: Store },
  { path: "/admin/feedback", label: "Feedback", icon: MessageSquare },
];

  const handleLogout = () => {
    console.log("Logging out...");
    // Add logout functionality here
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <header className="admin-header">
          <h1 className="admin-title">Admin Panel</h1>
          <p className="admin-subtitle">E-Commerce Management</p>
        </header>

        <nav className="admin-nav">
          {navItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              to={path}
              key={path}
              className={({ isActive }) =>
                cn("nav-item", isActive ? "nav-item-active" : "nav-item-inactive")
              }
              end={path === "/admin"} // Only match exact for /admin
            >
              <Icon className="nav-icon" />
              {label}
            </NavLink>
          ))}
        </nav>


        <div className="logout-container">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="logout-button"
          >
            <LogOut className="logout-icon" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <Card className="admin-content">
          <Outlet/>
        </Card>
      </main>
    </div>
  );
};

export default AdminLayout;
