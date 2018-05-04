const mongoose = require('mongoose');
const schema =mongoose.Schema({
    name: String,
    des: String,
    price: Number,
    thumb: Array,
    detail: Array,
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'seller'
    }
})
module.exports = mongoose.model('goods',schema);