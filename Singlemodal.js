const mongoose = require('mongoose');

// Define the schema
const loadSchema = new mongoose.Schema({

    data: {
        type: Object, // Data will be stored as an object
        required: true, // Data is required
      },

      newstype:{
        type:String,
        required:true
      }
});

const Singletypenews = mongoose.model('Singletypenews', loadSchema);


module.exports = Singletypenews;
