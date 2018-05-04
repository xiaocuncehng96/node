const express = require('express');
const swig = require('swig');
const mongoose = require('mongoose');
const Cookies = require('cookies');
const api = require('./routers/buyer/api');
const html = require('./routers/buyer/html');
const {findBuyerID} = require('./handleDB/heandleBuyer');

new Promise((resolve,reject)=>{
    mongoose.connect("mongodb://localhost:27018",(error)=>{
        if(error){
            console.log("连接失败")
            console.log(error)
        }else{
            console.log("连接成功")
            resolve();
        }
    })
})
.then(
    ()=>{
        const server = express();
        //处理静态资源
        server.use('/static',express.static(__dirname+'/static'));
        //设置cookies
        server.use((request,response,next)=>{
            let cookies = new Cookies(request,response);
            response.c = cookies;
            next()
        });
        //处理是否登录
        server.use((request,response,next)=>{
            let buyerid = response.c.get('BUYERID');
            response.buyerInfo = {};
            if(buyerid){
                findBuyerID(buyerid)
                .then(
                    (buyerInfo)=>{//存在，登录了
                        response.isLogin = true;
                        response.buyerInfo = buyerInfo;
                        next();
                    },
                    ()=>{//不存在，id被篡改了
                        response.isLogin = false;
                        next();
                    }
                )
            }else{
                response.isLogin = false;
                next();
            }           
        })
    
        //处理post请求
        server.use('/api',api);
        //设置模板引擎
        server.engine('html',swig.renderFile);
        server.set('views',__dirname+'/html/buyer');
        server.set('view engine','html');
        swig.setDefaults({cache:false});
        server.use('/',html)

        server.listen(8080,'localhost',(error)=>{
            if(error){
                console.log("启动失败")
            }else{
                console.log('启动成功,localhost:9090')
            }
        })
    }
)