const mongoose = require('mongoose');
const schema =mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'seller'
    },
    goods: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'goods'
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'buyer'
    },
    date:String
})
module.exports = mongoose.model('order',schema);