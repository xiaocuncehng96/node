const Buyer = require('../module/buyer');
//用户注册
function addBuyer(phone,name,password){
    return new Promise((resolve,reject)=>{
        Buyer.findOne({phone})
        .then(
            (result)=>{
                if(result){
                    reject('该用户已存在')
                }else{
                    return new Buyer({phone,name,password}).save()
                }
            }
        )
        .then(
            (result)=>{
                resolve('注册成功')
            },
            (error)=>{
                console.log(error);
                reject('系统繁忙，请稍后重试')
            }
        )
    })
}
//查找用户账号密码
function findBuyer(phone,password){
    return new Promise((resolve,reject)=>{
        Buyer.findOne({phone,password})
        .then(
            (result)=>{
                if(result){
                    resolve(result._id)
                }else{
                    reject('用户名或密码错误')
                }
            },
            ()=>{
                reject('系统繁忙，请稍后重试')
            }
        )
    })
}
//查找用户账号密码
function findBuyerID(id){
    return new Promise((resolve,reject)=>{
        Buyer.findById(id)
        .then(
            (result)=>{
                if(result){
                    resolve(result)
                }else{
                    reject()
                }
            },
            ()=>{
                reject()
            }
        )
    })
}
module.exports = {addBuyer,findBuyer,findBuyerID}