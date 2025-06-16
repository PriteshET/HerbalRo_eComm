const express = require('express')
const cors = require('cors')
const { default: mongoose } = require('mongoose')
const {FeedbackModel,FeedbackModel2, ProductsData} = require('./Schemas/Feedback')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser') 
const multer = require('multer');

// Store in /uploads/products
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null,'uploads/products')
  },
  filename : function(req,file,cb){
    const ext = file.originalname.substr(file.originalname.lastIndexOf('.'));

    cb(null, file.fieldname+"-"+Date.now()+ext)
  }
});
const upload = multer({ storage: storage });


const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET","POST","DELETE","PUT"],
    credentials: true
}))
app.use(cookieParser())

app.use('/uploads', express.static('uploads'));

mongoose.connect("mongodb://localhost:27017/Herbalro")

const verifyUser = (req,res,next) => {
    const token = req.cookies.token;
    if(!token){
        res.json("The Token was not Available")
    }else{
        jwt.verify(token,"jwt-secretKey",(err, decoded) => {
            if (err){
                res.json("Token is Wrong")
            }
            next();
        })
    }
}

const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ success: false, message: 'Access Denied: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, "jwt-secretKey");

    // Check if role is admin, adjust based on your token payload
    if (decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: 'Access Denied: Not an admin' });
    }

    req.user = decoded; // pass user info to next handler
    next();
  } catch (err) {
    console.error("JWT Error:", err);
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};


const verifyModeratorOrAdmin = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ success: false, message: 'Access Denied: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, "jwt-secretKey");
    if (decoded.role !== "admin" && decoded.role !== "moderator") {
      return res.status(403).json({ success: false, message: 'Access Denied: Not authorized' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};


app.get('/',verifyUser, (req,res) =>{
    return res.json("Success")
})

app.post('/', (req,res) => {
    FeedbackModel.create(req.body)
    .then(Data => res.json(Data))
    .catch(err => res.json(err))
})

app.post('/signup', (req,res)=>{
    const {name, email, password}=req.body;
    bcrypt.hash(password, 10)
    .then(hash => {
        FeedbackModel2.create({name, email, password : hash})
        .then(Login => res.json(Login))
        .catch(err => res.json(err))
    }).catch(err => console.log(err.message))
    
})

app.get('/admin/feedback',verifyAdmin, (req, res) => {
    FeedbackModel.find().sort({date:-1})
        .then(feedbacks => {
            res.status(200).json({ success: true, data: feedbacks });
        })
        .catch(err => {
            console.error("Error fetching feedbacks:", err);
            res.status(500).json({ success: false, message: "Failed to fetch feedbacks." });
        });
});

app.get('/admin/shop',verifyModeratorOrAdmin, (req, res) => {
    FeedbackModel2.find()
    .then(data => {
      res.status(200).json({ success: true, data });
    })
    .catch(err => {
      console.error("Error fetching shop data:", err);
      res.status(500).json({ success: false, message: "Failed to fetch shop data" });
    });
});

app.get('/admin/products' ,verifyAdmin, (req, res) => {
    ProductsData.find()
    .then(data => {
      res.status(200).json({ success: true, data });
    })
    .catch(err => {
      console.error("Error fetching shop data:", err);
      res.status(500).json({ success: false, message: "Failed to fetch shop data" });
    });
});

app.post("/admin/products", upload.array("images"), async (req, res) => {
  try {
    const { name, price, size, description, stock } = req.body;

    const imagePaths = req.files.map(file => `/uploads/products/${file.filename}`);

    // Ensure files exist
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const product = await ProductsData.create({
      name,
      price,
      size,
      description,
      stock,
      images: imagePaths, 
    });

    res.status(201).json({ success: true, data: product });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ success: false, message: "Failed to save product" });
  }
});

// Delete admin by ID
app.delete('/admin/products/:id', (req, res) => {
  const id = req.params.id;

  ProductsData.findByIdAndDelete(id)
    .then(() => res.status(200).json({ success: true, message: "Product deleted successfully" }))
    .catch(err => {
      console.error("Error deleting admin:", err);
      res.status(500).json({ success: false, message: "Failed to delete product" });
    });
});


app.get('/admin/orders' ,verifyModeratorOrAdmin, (req, res) => {
    FeedbackModel2.find()
    .then(data => {
      res.status(200).json({ success: true, data });
    })
    .catch(err => {
      console.error("Error fetching shop data:", err);
      res.status(500).json({ success: false, message: "Failed to fetch shop data" });
    });
});

app.get('/admin',verifyAdmin, (req,res) =>{
    FeedbackModel2.find({role: { $in: ["admin", "moderator"] }  })
    .then(admins => {
        res.status(200).json({ success: true, data: admins })
    })
    .catch(err => {
        console.error("Error fetching Admins:", err);
        res.status(500).json({ success: false, message: "Failed to fetch feedbacks." });
    })
});

app.get('/verify', verifyModeratorOrAdmin, (req, res) => {
  res.json({ success: true, user: req.user });
});


// PUT: Promote user to admin via email
app.put('/admin', (req, res) => {
  const { email, role } = req.body; // ✅ Extract both email and role

  if (!email || !role) {
    return res.status(400).json({ success: false, message: "Email and role are required" });
  }

  FeedbackModel2.findOneAndUpdate(
    { email: email },
    { role: role },
    { new: true }
  )
    .then(updatedUser => {
      if (updatedUser) {
        res.status(200).json({ success: true, data: updatedUser });
      } else {
        res.status(404).json({ success: false, message: "Email not found" });
      }
    })
    .catch(err => {
      console.error("Error promoting user:", err);
      res.status(500).json({ success: false, message: "Failed to promote user" });
    });
});


// Delete admin by ID
app.delete('/admin/:id', (req, res) => {
  const id = req.params.id;

  FeedbackModel2.findByIdAndDelete(id)
    .then(() => res.status(200).json({ success: true, message: "Admin deleted successfully" }))
    .catch(err => {
      console.error("Error deleting admin:", err);
      res.status(500).json({ success: false, message: "Failed to delete admin" });
    });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  FeedbackModel2.findOne({ email: email })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            const token = jwt.sign({ email: user.email, role: user.role }, "jwt-secretKey", { expiresIn: "1d" });

            res.cookie("token", token);

            // Send role info in response
            res.json({ message: "Success", role: user.role });
          } else {
            res.json({ message: "Password is Incorrect" });
          }
        });
      } else {
        res.json({ message: "Account does not exist" });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Login error" });
    });
});


app.post('/logout', (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out" });
});


/// Shop Logicssss

app.get('/shop/products', (req, res) => {
  ProductsData.find()
    .then(products => res.json(products))
    .catch(err => {
      console.error("Failed to fetch products:", err);
      res.status(500).json({ message: "Server Error" });
    });
});

app.get('/shop/product/:id', (req, res) => {
  const { id } = req.params;
  ProductsData.findById(id)
    .then(product => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    })
    .catch(err => {
      console.error('Error:', err);
      res.status(500).json({ message: 'Server error' });
    });
});




app.listen(3001, () => {
    console.log("Server is Running...")
})