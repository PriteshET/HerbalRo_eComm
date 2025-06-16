import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit, Package, PackagePlus, Trash2, Upload, X } from "lucide-react";
import "./ProductsTab.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../../@/Components/ui/alert-dialog";

const ProductsTab = () => {

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
    axios.get('http://localhost:3001/admin/products', { withCredentials: true })
      .then(response => {
        if (response.data.success) {
          setProducts(response.data.data);
        }
      })
      .catch(error => {
        console.error('Error fetching feedback:', error);
      });
  },[])

  const refreshPage = () => {
    navigate(0); // React-router way to refresh current route
  };

  const [products, setProducts] = useState([]);

  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ 
    name: "", 
    price: 0, 
    size: "", 
    description: "", 
    stock: 0,
    images:[]
  });

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({ 
      name: product.name, 
      price: product.price, 
      size: product.size, 
      description: product.description, 
      stock: product.stock,
      images: product.images || []
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

const handleAddProduct = async (e) => {
  e.preventDefault();

  const formDataToSend = new FormData();
  formDataToSend.append("name", formData.name);
  formDataToSend.append("price", formData.price);
  formDataToSend.append("size", formData.size);
  formDataToSend.append("description", formData.description);
  formDataToSend.append("stock", formData.stock);

  // Append each image file individually
  formData.images.forEach((file) => {
    formDataToSend.append("images", file); // key: 'images'
  });

  try {
    const response = await axios.post("http://localhost:3001/admin/products", formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Uploaded:", response.data);
    toast.success("Product added successfully");
    setIsAddDialogOpen(false);
    resetForm();
    refreshPage();
  } catch (err) {
    console.error("Upload Error:", err);
    toast.error("Upload failed");
  }
};

  const resetForm = () => {
    setFormData({ name: "", price: 0, size: "", description: "", stock: 0, images: [] });
  };

  const handleCancel = () => {
    setEditingProduct(null);
    resetForm();
  };


  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files], // <-- store File objects
    }));
  };

  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const truncateDescription = (text, maxWords = 5) => {
    const words = text.split(' ');
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/admin/products/${id}`)
      .then(res => {
        if (res.data.success) {
          // Remove deleted admin from state
          toast.success('Product Deleted!');
          setProducts(prev => prev);
          refreshPage();
        }
      })
      .catch(err => {
        console.error("Error deleting Product", err);
        toast.error('Something went wrong. Please try again later.');
      });
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
              <Button className="add-button" onClick={() => {setEditingProduct(false); resetForm();}}>
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
                    <Label htmlFor="add-price">Price &#8377;</Label>
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
                    <Label htmlFor="add-size">Size (mg)</Label>
                    <Input
                      id="add-size"
                      value={formData.size}
                      onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                      placeholder="250, 500, 750, etc."
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
                {/* <ImageUploadSection /> */}
                <div className="image-upload-section">
                  <Label>Upload Product Images</Label>
                  <Input
                    className="image-upload-input"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, images: Array.from(e.target.files) })}
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
                <Label htmlFor="edit-price">Price &#8377;</Label>
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
            {/* <ImageUploadSection /> */}
            <div className="image-upload-section">
                  <Label>Upload Product Images</Label>
                  <Input
                    className="image-upload-input"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, images: Array.from(e.target.files) })}
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
                  <tr key={product._id} className="table-row">
                    <td className="table-td">
                      <div>
                        <div className="product-name">{product.name}</div>
                        <div className="product-description">{truncateDescription(product.description)}</div>
                      </div>
                    </td>
                    <td className="table-td"> &#8377; {product.price.toFixed(2)}</td>
                    <td className="table-td">{product.size} g</td>
                    <td className="table-td">
                      <span className={`stock-badge ${
                        product.stock > 20 ? 'stock-high' :
                        product.stock > 10 ? 'stock-medium' :
                        'stock-low'
                      }`}>
                        {product.stock} units
                      </span>
                    </td>
                    <td className="table-td" id="double-action">
                      <Button
                        onClick={() => handleEdit(product)}
                        size="sm"
                        variant="outline"
                        className="edit-btn"
                      >
                        <Edit className="edit-icon" />
                        Edit
                      </Button>

                      <AlertDialog >
                        <AlertDialogTrigger asChild>
                          <Button
                            
                            size="sm"
                            variant="outline"
                            className="delete-btn"
                          >
                            <Trash2 color="red" className="edit-icon" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="alert-box">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the your data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(product._id)}>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
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