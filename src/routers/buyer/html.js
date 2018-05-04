const express = require('express');
const {findId,findGoods,findAllGoodsPage,findAllGoodsSort,getGoodCount,findGoodsID} = require('../../handleDB/heandleGoods');
const {findSeller,getSellerCount,findSellerID} = require('../../handleDB/heandleSeller');
const url = require('url')
const {findBuyerOrder} = require('../../handleDB/heandleOrder');

const router = new express.Router();

router.use((request, response, next)=>{
    request.query = url.parse(request.url, true).query;
    next();
})
//登录页面
router.get('/login',(request,response)=>{
    response.render('login',{
        loActive:'active'
    })
})
//注册页面
router.get('/register',(request,response)=>{
    response.render('register',{
        reActive:'active'
    })
})
//退出
router.get('/logout', (request, response)=>{
    // 清除登录状态
    response.c.set('BUYERID', null);
    // 重定向
    response.redirect('/login');
})
//首页
router.get('/',(request,response)=>{
    Promise.all([findGoods(4),findSeller(8)])
    .then(
        (result)=>{
            let more;
            let more1;
            if(result[0].length>=4){
                more = true;
            }else{
                more = false;
            }
            if(result[1].length>=8){
                more1 = true;
            }else{
                more1 = false;
            }
            //console.log(response.buyerInfo.name)
            response.render('home',{
                hoActive:'active',
                isLogin:response.isLogin,
                name:response.buyerInfo.name,
                goodList:result[0],
                sellerList:result[1],
                goods:more,
                seller:more1,
            })
        }
    )
})
//个人中心
router.get('/user',(request,response)=>{
    response.render('buyerUser',{
        usActive:'active',
        isLogin:response.isLogin,
        phone:response.buyerInfo.phone,
        name:response.buyerInfo.name
    })
})
//商品列表
router.get('/goodsList',(request,response)=>{
    let page = Number(request.query.page) || 1;
    let count = Number(request.query.count) || 4;
    let sort = Number(request.query.sort);
    let p = sort?findAllGoodsSort(page, count, sort):findAllGoodsPage(page, count);
    Promise.all([getGoodCount(), p])
    .then(
        result=>{
            //总页数
            let pages = Math.ceil(result[0]/count);
            //计算分页
            let pageArr = [];
            for(let i = 1; i <= pages; i++){
                pageArr.push(i);
            }

            //渲染页面
            response.render('goodsList', {
                isLogin:response.isLogin,
                name:response.buyerInfo.name,
                goodsActive: 'active',
                pageArr,//总页数数组
                count,//页面商品个数
                page,//当前页面
                sort,
                goodsList: result[1]
            });

        }
    )
})
//店铺列表
router.get('/sellerList',(request,response)=>{
    getSellerCount()
    .then(
        (result)=>{
           // console.log(result)
            response.render('sellerList',{
                sellerActive:'active',
                isLogin:response.isLogin,
                name:response.buyerInfo.name,
                sellers:result
            })
        }
    )
})
//商品详情
router.get('/goodsDetail',(request,response)=>{
    let goodsId = request.query.goodsId;
    findGoodsID(goodsId)
    .then(
        (result)=>{
            //console.log(result)
            response.render('goodsDetail',{
                isLogin:response.isLogin,
                name:response.buyerInfo.name,
                goods:result
            })
        }
    )
})
//店铺详情
router.get('/sellerDetail',(request,response)=>{
    let sellerId = request.query.sellerId;
    Promise.all([findId(sellerId),findSellerID(sellerId)]) 
    .then(
        (result)=>{
            console.log(result)
            response.render('sellerDetail',{
                isLogin:response.isLogin,
                name:response.buyerInfo.name,
                goodsList:result[0],
                seller:result[1]
            })
        }
    )
})
//订单列表
router.get('/buyerOrder',(request,response)=>{
    let buyerId = response.buyerInfo._id;
    findBuyerOrder(buyerId)
    .then(
        (result)=>{
            console.log(result)
            response.render('buyerOrder',{
                isLogin:response.isLogin,
                name:response.buyerInfo.name,
                orderList:result
            })
        }
    )
})
module.exports = router;