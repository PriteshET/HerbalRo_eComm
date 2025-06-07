const express = require('express')
const cors = require('cors')
const { default: mongoose } = require('mongoose')
const {FeedbackModel,FeedbackModel2} = require('./Schemas/Feedback')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser') 

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET","POST","DELETE","PUT"],
    credentials: true
}))
app.use(cookieParser())

mongoose.connect("mongodb://localhost:27017/Feedback")

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

app.get('/admin/shop',verifyAdmin, (req, res) => {
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
    FeedbackModel2.find()
    .then(data => {
      res.status(200).json({ success: true, data });
    })
    .catch(err => {
      console.error("Error fetching shop data:", err);
      res.status(500).json({ success: false, message: "Failed to fetch shop data" });
    });
});

app.get('/admin/orders' ,verifyAdmin, (req, res) => {
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
    FeedbackModel2.find({role:"admin"})
    .then(admins => {
        res.status(200).json({ success: true, data: admins })
    })
    .catch(err => {
        console.error("Error fetching Admins:", err);
        res.status(500).json({ success: false, message: "Failed to fetch feedbacks." });
    })
});

app.get('/verify', verifyAdmin, (req, res) => {
  res.json({ success: true, user: req.user });
});


// PUT: Promote user to admin via email
app.put('/admin', (req, res) => {
  const { email } = req.body;

  FeedbackModel2.findOneAndUpdate(
    { email },
    { role: "admin" },
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

app.listen(3001, () => {
    console.log("Server is Running...")
})