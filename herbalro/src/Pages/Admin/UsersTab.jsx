import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, PackagePlus, Trash2, User, UserPlus } from "lucide-react";
import "./UsersTab.css";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../Components/ui/dialog";
import { Textarea } from "../../Components/ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../../@/Components/ui/alert-dialog";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UsersTab = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/admin', { withCredentials: true })
      .then(response => {
        if (response.data.success) {
          setUsers(response.data.data);
        }
      })
      .catch(error => {
        console.error('Error fetching feedback:', error);
        if (error.response && error.response.status === 403) {
        toast.error("Access Denied: Admins only");
        navigate('/login');
      } else {
        toast.error("Something went wrong. Try again later.");
      }
      });

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
  }, []);



const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/admin/${id}`)
      .then(res => {
        if (res.data.success) {
          // Remove deleted admin from state
          toast.success('Admin Deleted!');
          setUsers(prev => prev.filter(admin => admin._id !== id));
        }
      })
      .catch(err => {
        console.error("Error deleting admin", err);
        toast.error('Something went wrong. Please try again later.');
      });
  };



  const handleAddUser = () => {
  axios
    .put("http://localhost:3001/admin", { email: email })
    .then((response) => {
      if (response.data.success) {
        toast.success("User promoted to Admin!");

        // Update UI if needed
        setUsers((prev) =>
          prev.map((user) =>
            user.email === email ? { ...user, role: "admin" } : user
          )
        );
      } else {
        toast.error(response.data.message || "User not found.");
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      toast.error("User not found.");
    });
    setIsAddDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setEmail("")
  };

  const handleCancel = () => {
    setEditingUser(null);
    resetForm()
  };

  return (
    <div className="users-tab">
      <ToastContainer />
      <div className="users-header">
        <h2 className="users-title">Admin Management</h2>
        <div className="admin-action">
          <div className="users-count">
            <User color="#1f3521" className="count-icon" />
            <span className="count-text">{users.length} Admins</span>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="add-button">
                  <UserPlus className="add-icon" />
                  Add Admin
                </Button>
              </DialogTrigger>
              <DialogContent className="add-admin-box">
                <DialogHeader>
                  <DialogTitle>Add New Admin</DialogTitle>
                </DialogHeader>
                <div className="dialog-form">
                  
                  <div>
                    <Label htmlFor="add-email">Email</Label>
                    <Input
                      id="add-email"
                      type="email"
                      onChange={(e) => setEmail(e.target.value )}
                      placeholder="Email Id"
                      autoComplete= "off"
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="moderator">Moderator</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    
                  </div>
                  <div className="dialog-actions">
                    <Button onClick={handleAddUser} className="add-admin-btn">
                      Add Admin
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
      
      <Card>
        <CardContent className="table-container">
          <div className="table-wrapper">
            <table className="users-table">
              <thead className="table-header">
                <tr>
                  <th className="table-th">Email</th>
                  <th className="table-th">Name</th>
                  <th className="table-th">Role</th>
                  <th className="table-th">Actions</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {users.map((user) => (
                  <tr key={user._id} className="table-row">
                    <td className="table-td">{user.email}</td>
                    <td className="table-td">{user.name}</td>
                    <td className="table-td">
                      <span className={`role-badge role-${user.role}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="table-td">
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
                              This action cannot be undone. This will permanently delete the
                              account and remove your data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(user._id)}>Continue</AlertDialogAction>
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

export default UsersTab;