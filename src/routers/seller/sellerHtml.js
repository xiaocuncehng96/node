const express = require('express');
const router = new  express.Router();
const {findId} = require('../../handleDB/heandleGoods');
const {findrSellerOrde} = require('../../handleDB/heandleOrder');
//注册
router.get('/register',(reuqest,response)=>{
    response.render('register',{
        reActive:'active'
    });
})
//登录
router.get('/login',(reuqest,response)=>{
    response.render('login',{
        loActive:'active'
    });
})
// 退出
router.get('/logout', (request, response)=>{
    // 清除登录状态
    response.c.set('SELLERID', null);
    // 重定向
    response.redirect('/login');
})
//其他页面需要登录了，才能访问
router.use((request, response, next)=>{
    if(response.sellerInfo){
        next();
    }else{
        response.redirect('/login');
    }
})
//响应商品管理页面
router.get('/goodList',(reuqest,response)=>{
    findId(response.sellerInfo._id)
    .then(
        (result)=>{
            response.render('goodList',{
                goActive:'active',
                isLogin:response.isLogin,
                logo:response.logo,
                goodsList: result
            }); 
        }
    )  
})
//添加商品
router.get('/addGoods',(reuqest,response)=>{
    response.render('addGoods',{
        goActive:'active',
        isLogin:response.isLogin,
        logo:response.logo,       
    });   
})
//修改商品
router.get('/amendGoods',(request,response)=>{
    response.render('amendGoods',{
        goActive:'active',
        isLogin:response.isLogin,
        logo:response.logo,       
    });   
})
//个人中心
router.get('/user',(reuqest,response)=>{
    response.render('sellerUser',{
        usActive:'active',
        isLogin:response.isLogin,
        logo:response.logo,
        info: response.sellerInfo 
    });   
})
//订单列表
router.get('/oderList',(request,response)=>{
    let sellerId = response.sellerInfo._id;
    findrSellerOrde(sellerId)
    .then(
        (result)=>{
            console.log(result)
            response.render('oderList',{
                orActive:'active',
                isLogin:response.isLogin,
                logo:response.logo,
                orderList:result
            })
        }
    )
})
module.exports = router;