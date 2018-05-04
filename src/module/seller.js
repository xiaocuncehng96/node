const mongoose = require('mongoose');
const schema =mongoose.Schema({
    name:String,
    password:String,
    logo:String,
    banner:String
})
module.exports = mongoose.model('seller',schema);