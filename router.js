// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const Userit = require("./Modal");
// require('dotenv').config();

// // Registration route
// router.post('/register', async (req, res) => {
//   try {
//     const { username, password,date } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new Userit({ username, password: hashedPassword,dob:new Date(date) });
//     await newUser.save();
    
//     const token = jwt.sign({ _id: newUser._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
//     newUser.token = token ; 
//     await  newUser.save();
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ error: 'Registration failed' });
//   }
// });

// module.exports = router;
