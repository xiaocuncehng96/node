const express = require('express');
const bodyparser = require('body-parser');
const {addBuyer,findBuyer} = require('../../handleDB/heandleBuyer');
const {findGoodsID} = require('../../handleDB/heandleGoods');
const {addOrder} = require('../../handleDB/heandleOrder');
const mongoose = require('mongoose');
const url = require('url')
const router = new express.Router();

router.use(bodyparser.urlencoded());
//注册
router.post('/register',(request,response)=>{
    let {phone,name,password} = request.body;
    addBuyer(phone,name,password)
    .then(
        (msg)=>{
            response.json({
                status:0,
                message:msg
            })
        },
        (msg)=>{
            response.json({
                status:1,
                message:msg
            })
        }
    )
})
//登录
router.post('/login',(request,response)=>{
    let {phone,password} = request.body;
    findBuyer(phone,password)
    .then(
        (buyerID)=>{
            response.c.set('BUYERID',buyerID)
            response.json({
                status:0,
                message:'登录成功'
            })
        },
        (msg)=>{
            response.json({
                status:1,
                message:msg
            })
        }
    )
})
//购买
router.post('/shop',(request,response)=>{
    if(response.isLogin){
        let {goodsUrl,date} = request.body;
        let buyer = response.buyerInfo._id;
        let goods = url.parse(goodsUrl, true).query.goodsId;    
        findGoodsID(goods).then(result=>{
            let seller = result.seller._id;
            addOrder(seller,goods,buyer,date)
            .then(
                (result)=>{
                    response.json({
                        status:0,
                        message:'购买成功'
                    })
                },
                (error)=>{
                    console.log(error)
                    response.json({
                        status:2,
                        message:'系统繁忙，请稍后重试'
                    })
                }
            )
        })
    }else{
        response.json({
            status:1,
            message:'需要登录才能购买'
        })
    }
})
module.exports = router;