const mongoose = require('mongoose');

const ituserSchema = new mongoose.Schema({
  name:{
    type:String,
    require:true
  },
  dob:{
    type:Date,
    require:true
  },
  email:{
    type:String,
    require:true,
    unique:true
  },

  password:{
    type:String,
    require:true,
  },
  token:{
    type:String,
    require:true
  }
});

module.exports = mongoose.model('Userit', ituserSchema);
