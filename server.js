const express = require('express');
const axios = require('axios');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Userit = require("./Modal");
require('dotenv').config();
const  cors = require('cors')

// Registration route
const app = express();
// const axios = require("axios");

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors())

// app.use(router)
require("./db");
require('dotenv').config();
app.get("/",async(req,res)=>{
  res.json({success:true})
})

app.post('/register', async (req, res) => {
  try {
    const { name, password,dob,email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Userit({ email,name, password: hashedPassword,dob:new Date(dob) });
    await newUser.save();
    
    const token = jwt.sign({ _id: newUser._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    newUser.token = token ; 
    await  newUser.save();
    res.json({ token:token,success:true});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Userit.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    const token = user.token;

    res.json({ token, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post("/check_authentication",async(req,res)=>{
try {
  const {token}=req.body;
  const user = await Userit.findOne({token:token});
  if(user){
    res.json({
      success:true,
    })
  }
  else{
    res.json({
      success:false,
      message:"Your are not Authenticate to see this page"
    })
  }
} catch (error) {
  res.json({
    error:error,
    success:false,
    
  })
}
})



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
