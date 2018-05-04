function Init(){    
    this.logo = $('.logo');
    this.banner = $('.banner');
    this.btn = $('#confirm');
    this.logopath = '';
    this.bannerpath= '';
    this.logoForm = $('#logo-form')[0];
    this.bannerForm = $('#banner-form')[0];
    this.imglogo = $('.img-logo');
    this.imgbanner = $('.img-banner');
    this.goodsid = location.href;
    this.conmit();
    this.conmitOne();
    this.conmitTwo();
}
Init.prototype.conmit = function () { 
    let _this = this;
    this.logo.on('change',function () {
        //创建表单数据对象 
        let formData = new FormData(_this.logoForm);
        $.ajax({
            url: '/api/upload',
            method: 'POST',
            data: formData,
            processData: false,//传输的数据，不被jquery封装
            contentType: false,//数据编码格式不使用jquery的方式
            success:function (result) { 
                if(result.data){
                    _this.imglogo.attr('src',result.data.imgPath[0]);
                    _this.logopath = result.data.imgPath[0]
                }else{
                    alert(result.message);
                }
             }
        })
     })
 }
 Init.prototype.conmitOne = function () { 
    let _this = this;
    this.banner.on('change',function () {
        //创建表单数据对象 
        let formData = new FormData(_this.bannerForm);
        $.ajax({
            url: '/api/upload',
            method: 'POST',
            data: formData,
            processData: false,//传输的数据，不被jquery封装
            contentType: false,//数据编码格式不使用jquery的方式
            success:function (result) { 
                if(result.data){
                    _this.imgbanner.attr('src',result.data.imgPath[0]);
                    _this.bannerpath = result.data.imgPath[0]
                }else{
                    alert(result.message);
                }
             }
        })
     })
  }
Init.prototype.conmitTwo = function () { 
    let _this = this;
    this.btn.on('click',function () {
    let name = $('input[name=name]').val();
    let password = $('input[name=password]').val();
    let repsd = $('input[name=repsd]').val(); 
    let logopath =  _this.logopath ;
    let bannerpath = _this.bannerpath
    //console.log(name,password,repsd,logopath,bannerpath)
        // 判断是否为空
    if(!name || !password || !repsd || !_this.logopath || !_this.bannerpath){
        alert('输入不能为空!');
        return;
    }

        $.ajax({
            url: '/api/amend',
            method: 'POST',
            data: {
                name: name,
                des: password,
                price:repsd,
                thumbimg: logopath,
                detailimg: bannerpath,
                goodsid:_this.goodsid
            },
            success:function (result) { 
                if(!result.status){
                   alert(result.message);
                   window.location.href = '/goodList'
                }else{
                    alert(result.message);
                }
             }
        })
    })
}
 new Init();