
const Order = require('../module/order');
//增加订单
function addOrder(seller,goods,buyer,date){
    console.log(goods,seller,buyer,date)
    return new Order({seller,goods,buyer,date}).save();
}
//查找卖家订单
function findBuyerOrder(id){
    return Order.find({buyer: id}).populate(['goods', 'seller']);

}
//查找卖家订单
function findrSellerOrde(id){
    return Order.find({seller: id}).populate(['goods']);
}
module.exports = {addOrder,findBuyerOrder,findrSellerOrde}