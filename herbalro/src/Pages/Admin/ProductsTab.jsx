import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit, Package, PackagePlus } from "lucide-react";
import "./ProductsTab.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const ProductsTab = () => {

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


  const [products, setProducts] = useState([
    { id: "1", name: "Classic T-Shirt", price: 29.99, size: "M", description: "Comfortable cotton t-shirt", stock: 50 },
    { id: "2", name: "Denim Jeans", price: 79.99, size: "32", description: "Premium denim jeans", stock: 25 },
    { id: "3", name: "Sneakers", price: 129.99, size: "9", description: "Athletic sneakers", stock: 15 },
  ]);

  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ 
    name: "", 
    price: 0, 
    size: "", 
    description: "", 
    stock: 0 
  });

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({ 
      name: product.name, 
      price: product.price, 
      size: product.size, 
      description: product.description, 
      stock: product.stock 
    });
  };

  const handleSave = () => {
    if (editingProduct) {
      setProducts(products.map(product => 
        product.id === editingProduct.id 
          ? { ...product, ...formData }
          : product
      ));
      setEditingProduct(null);
      resetForm();
    }
  };

  const handleAddProduct = () => {
    const newProduct = {
      id: Date.now().toString(),
      ...formData
    };
    setProducts([...products, newProduct]);
    setIsAddDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: "", price: 0, size: "", description: "", stock: 0 });
  };

  const handleCancel = () => {
    setEditingProduct(null);
    resetForm();
  };

  return (
    <div className="products-tab">
      <ToastContainer/>
      <div className="products-header">
        <h2 className="products-title">Product Management</h2>
        <div className="products-actions">
          <div className="products-count">
            <Package color="#1f3521" className="count-icon" />
            <span className="count-text">{products.length} Products</span>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="add-button">
                <PackagePlus className="add-icon" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="add-dialog">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <div className="dialog-form">
                <div>
                  <Label htmlFor="add-name">Product Name</Label>
                  <Input
                    id="add-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Product name"
                  />
                </div>
                <div className="price-size-grid">
                  <div>
                    <Label htmlFor="add-price">Price ($)</Label>
                    <Input
                      id="add-price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="add-size">Size</Label>
                    <Input
                      id="add-size"
                      value={formData.size}
                      onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                      placeholder="S, M, L, etc."
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="add-stock">Stock</Label>
                  <Input
                    id="add-stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="add-description">Description</Label>
                  <Textarea
                    id="add-description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Product description"
                    rows={3}
                  />
                </div>
                <div className="dialog-actions">
                  <Button onClick={handleAddProduct} className="add-product-btn">
                    Add Product
                  </Button>
                  <Button onClick={() => setIsAddDialogOpen(false)} variant="outline">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {editingProduct && (
        <Card className="edit-card">
          <CardHeader>
            <CardTitle className="edit-title">Edit Product: {editingProduct.name}</CardTitle>
          </CardHeader>
          <CardContent className="edit-content">
            <div className="edit-form-grid">
              <div>
                <Label htmlFor="edit-name">Product Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Product name"
                />
              </div>
              <div>
                <Label htmlFor="edit-price">Price ($)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label htmlFor="edit-size">Size</Label>
                <Input
                  id="edit-size"
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  placeholder="S, M, L, etc."
                />
              </div>
              <div>
                <Label htmlFor="edit-stock">Stock</Label>
                <Input
                  id="edit-stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                  placeholder="0"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Product description"
                rows={3}
              />
            </div>
            <div className="edit-actions">
              <Button onClick={handleSave} className="save-button">
                Save Changes
              </Button>
              <Button onClick={handleCancel} variant="outline">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="table-container">
          <div className="table-wrapper">
            <table className="products-table">
              <thead className="table-header">
                <tr>
                  <th className="table-th">Product</th>
                  <th className="table-th">Price</th>
                  <th className="table-th">Size</th>
                  <th className="table-th">Stock</th>
                  <th className="table-th">Actions</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {products.map((product) => (
                  <tr key={product.id} className="table-row">
                    <td className="table-td">
                      <div>
                        <div className="product-name">{product.name}</div>
                        <div className="product-description">{product.description}</div>
                      </div>
                    </td>
                    <td className="table-td">${product.price.toFixed(2)}</td>
                    <td className="table-td">{product.size}</td>
                    <td className="table-td">
                      <span className={`stock-badge ${
                        product.stock > 20 ? 'stock-high' :
                        product.stock > 10 ? 'stock-medium' :
                        'stock-low'
                      }`}>
                        {product.stock} units
                      </span>
                    </td>
                    <td className="table-td">
                      <Button
                        onClick={() => handleEdit(product)}
                        size="sm"
                        variant="outline"
                        className="edit-btn"
                      >
                        <Edit className="edit-icon" />
                        Edit
                      </Button>
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

export default ProductsTab;