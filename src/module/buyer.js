const mongoose = require('mongoose');
const schema =mongoose.Schema({
    phone:Number,
    name:String,
    password:String
})
module.exports = mongoose.model('buyer',schema);