const Seller = require('../module/seller');
function addSeller(name,password,logo,banner) { 
    //console.log(name,password,logo,banner)
    return new Promise((resolve,reject)=>{
        Seller.find({name})
        .then(
            (result)=>{
                console.log(result)
                if(result.length){
                    console.log('该用户已存在')
                    reject('该用户已存在')
                }else{
                    console.log('该用户不存在')
                    let sellerInfo = new Seller({name,password,logo,banner});
                    sellerInfo.save()
                    .then(
                    (result)=>{
                        console.log("成功")
                            resolve('保存成功')
                        }  
                    ,(error)=>{
                        console.log("失败")
                        console.log(error)
                        reject('系统繁忙，请稍后重试')
                    }
                 )
            }
        })
    })
 }
 function loginSeller(name,password){
    return new Promise((resolve,reject)=>{
        Seller.findOne({name,password})
        .then(
            (result)=>{
                if(result){
                    resolve(result._id);
                }else{
                    reject('用户名或密码错误');
                }
            },
            ()=>{
                reject('系统繁忙，请稍后重试')
            }
        )
    })
 }
 function findId(id){
    return new Promise((resolve,reject)=>{
        Seller.findById(id)
        .then(
            (result)=>{
                if(result){
                    resolve(result);
                }else{
                    reject();
                }
            },
            ()=>{
                reject()
            }
        )
    })
 }
 //查询商家加入首页
 function findSeller(num){
    return new Promise((resolve, reject)=>{
        num = Number(num);
        Seller.count()
        .then(
            (count)=>{
                if(count > num){//商品多余8个
                    Seller.find().skip(count-num).limit(num)
                    .then(
                        result=>{
                            resolve(result);
                        }
                    )
                }else{//商品不足8个，将所有商品查询出来
                    Seller.find().then(
                        result=>{
                            resolve(result);
                        }
                    )
                }
            }
        )
     })
}
//查找所有
function getSellerCount(){
    return Seller.find();
}
//查找店铺
function findSellerID(id){
    return Seller.findById(id).populate(['goods'])
}
 module.exports = {addSeller,loginSeller,findId,findSeller,getSellerCount,findSellerID}