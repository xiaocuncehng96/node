const Goods = require('../module/goods');
//添加商品
function addGoods(name, des, price, thumb, detail, sellerID){
    return new Promise((resolve, reject)=>{
        //创建商品数据
        new Goods({
            name,
            des,
            price,
            thumb, 
            detail,
            seller: sellerID
        })
        //保存
        .save()
        .then(
            //保存成功
            result=>{
                resolve('新增成功');
            },
            //保存失败
            error=>{
                reject('新增失败');
            }
        )      
    })
}
//查询商家的对应商品
function findId(sellerid){
    return new Promise((resolve, reject)=>{
    
       // console.log(sellerid)
        
        Goods.find({
            seller: sellerid
        })
        .then(
            result=>{
               // console.log(result)
                resolve(result);
            },
            error=>{
                resolve([]);
            }
        )
        
    })
}
//修改商品
function amendImg(name,des,price,thumbimg,detailimg,goodsid){
    return new Promise((resolve, reject)=>{
        //查询商家的对应商品的id进行修改
        Goods.findByIdAndUpdate(
            goodsid.goodsid,
            { 
            "name":name,
            "des":des,
            "price":price,
            "thumb":thumbimg,
            "detail":detailimg
            }                          
        )
        .then(
            result=>{
                console.log('修改'+result)
                resolve(result);
            },
            error=>{
                reject('修改失败');
                console.log(error);
            }
        )       
    })
}
//删除商品
function remGoods(goodsid){
    return new Promise((resolve, reject)=>{   
        //查询商家的对应商品的id进行删除
      Goods.findByIdAndRemove(
                  goodsid,      
                  {}            
        ).then(
            result=>{
                console.log(result);
                resolve(result)
            },
            error=>{
                reject()
            }
        )
    })       
}
//首页商品和店铺
function findGoods(num){
    return new Promise((resolve, reject)=>{
        num = Number(num);
        Goods.count()
        .then(
            (count)=>{
                if(count > num){//商品多余4个
                    Goods.find().skip(count-num).limit(num)
                    .then(
                        result=>{
                            resolve(result);
                        }
                    )
                }else{//商品不足4个，将所有商品查询出来
                    Goods.find().then(
                        result=>{
                            resolve(result);
                        }
                    )
                }
            }
        )
     })
}
//分页
function findAllGoodsPage(page,count){
    let skipVal = (page-1)*count;
    return Goods.find().skip(skipVal).limit(count)
}
//排序
function findAllGoodsSort(page,count,sort){
    let skipVal = (page-1)*count;
    return Goods.find().sort({price:sort}).skip(skipVal).limit(count)
}
//查找所有
function getGoodCount(){
    return Goods.count();
}
//查找商品
function findGoodsID(id){
    return Goods.findById(id).populate(['seller'])
}
module.exports = {addGoods,findId,amendImg,remGoods,findGoods,findAllGoodsPage,findAllGoodsSort,getGoodCount,findGoodsID}