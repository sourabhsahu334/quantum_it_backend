const mongoose = require('mongoose');
require('dotenv').config();
mongoose.Promise = global.Promise;
const db = process.env.DATABASE_URL
const local="mongodb://127.0.0.1:27017/AssignmentZedblock"
// Connect MongoDB at default port 27017.
mongoose.set('strictQuery', false);
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   

   
}).then(()=>{
    console.log('connection succes');
}).catch((e)=>{
    console.log('no connect'+e);
})


