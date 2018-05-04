const express = require('express');
const swig = require('swig');
const mongoose = require('mongoose');
const Cookies = require('cookies');
const api = require('./routers/seller/sellerApi');
const html = require('./routers/seller/sellerHtml');
const {findId} = require('./handleDB/heandleSeller')
new Promise((resolve,reject)=>{
    mongoose.connect('mongodb://localhost:27018',(error)=>{
        if(error){
            console.log('连接失败');
            console.log(error);
        }else{
            console.log('连接成功');
            resolve();
        }
    })
})
.then(()=>{
    const server = express();
    //处理静态资源
    server.use('/static',express.static(__dirname+'/static'));
    //设置cookies
    server.use((request,response,next)=>{
        let cookies = new Cookies(request,response);
        response.c = cookies;
        next()
    })
    //没登录不允许访问
    server.use((request, response, next)=>{
        //取商家id
        let sellerID = response.c.get('SELLERID');
        if(!sellerID){
            //查询商家是否存在 
            response.isLogin = false;
            next();
            return;                 
        }
        findId(sellerID)
        .then(
            (sellerInfo)=>{//存在，登录了
                response.isLogin = true;
                response.sellerInfo = sellerInfo;
                response.logo = sellerInfo.logo;
                next();
            },
            ()=>{//不存在，id被篡改了
                response.isLogin = false;
                next();
            }
        )  
        
    })
    //处理ajax
    server.use('/api',api)
    //配置模板引擎
    server.engine('html',swig.renderFile);
    server.set('views',__dirname+'/html/seller');
    server.set('view engine','html');
    swig.setDefaults({cache:false});
    //处理html页面
    server.use('/',html);
    //启动服务器
    server.listen(9090,'localhost',(error)=>{
        if(error){
            console.log('启动失败');
            console.log(error);
        }else{
            console.log('启动成功，localhost:9090')
        }
    })
})
