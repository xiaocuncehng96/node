const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = new express();
const multiparty = require('multiparty');
const {addSeller,loginSeller} = require('../../handleDB/heandleSeller');
const {addGoods,amendImg,remGoods} = require('../../handleDB/heandleGoods');
const fs = require('fs');
const url = require('url');
router.use(bodyParser.urlencoded());
//注册
router.post('/register',(request,response)=>{
    let {name,password, logo, banner} = request.body;
    addSeller(name,password,logo,banner)
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
    let {name,password} = request.body;
    loginSeller(name,password)
    .then(
        (sellerID)=>{
            response.c.set('SELLERID',sellerID);
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
//上传图片
router.post('/upload',(request,response)=>{
    let form = new multiparty.Form({
        uploadDir: './static/images'
    });
    form.parse(request, (error, fields, files)=>{
        if(!error){                     
            let way = path.extname(files.imgs[0].originalFilename)
            if(way == '.jpg'||way=='.jpeg'||way=='.png'){
                let imgsPath = files.imgs.map(item=>{
                    return '/'+item.path;
                })
                response.json({
                    status: 0,
                    message: '上传成功',
                    data: {
                        imgPath: imgsPath
                    }
                })
            }else{
               console.log(files.imgs[0].path)
                fs.unlink(files.imgs[0].path)
                response.json({
                    status: 1,
                    message: '文件格式错误，请重新上传',
                })
            }
        }
    })
})
//修改商品
router.post('/amend',(request,response)=>{
    let {name,des,price,thumbimg,detailimg,goodsid} = request.body;
    let query = url.parse(goodsid, true).query;//取得商品id值
    amendImg(name,des,price,thumbimg,detailimg,query)
    .then(
        (result)=>{
            console.log(result)
             let detail= result.detail.map(item=>{
                 return item
            })
            let thumb = (result.thumb)
            console.log(thumb[0],detail[0])
            fs.unlink(thumb[0].substr(1))
            fs.unlink(detail[0].substr(1))
            response.json({
                status: 0,
                message: '修改成功'
            })
        },
        msg=>{//失败
            response.json({
                status: 1,
                message: msg
            })
        }
    )
})
//增加商品
router.post('/add', (request, response)=>{
    //取参数
    let {name,des,price,thumbimg,detailimg } = request.body;
    //执行新增
    addGoods(name, des, price, thumbimg, detailimg, response.sellerInfo._id)
    .then(//成功
        msg=>{
            response.json({
                status: 0,
                message: msg
            })
        },
        msg=>{//失败
            response.json({
                status: 1,
                message: msg
            })
        }
    )
})
//删除商品
router.post('/remove',(request,response)=>{
    let {goodsid} = request.body;
    remGoods(goodsid)
    .then(
        (result)=>{
             let detail= result.detail.map(item=>{
                 return item
            })
            let thumb = (result.thumb)
             console.log(thumb[0],detail[0])
            fs.unlink(thumb[0].substr(1))
            fs.unlink(detail[0].substr(1))
            response.json({
                status:0
            })
        },
        ()=>{
            response.json({
                status:1
            })
        }
    )
    
})
module.exports = router;