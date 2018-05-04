function Init(){
    this.phone = $('#name');
    this.password = $('#password');
    this.btn = $('#confirm');
    this.bStop = false;
    this.conmit();
    this.updeta();
}
Init.prototype.conmit = function(){

    let _this =this;
    this.phone.on('input',function(){
        let phVal = $(this).val();
        let str = /^\d{11}$/;
        if(str.test(phVal)){
            $(this).next().next().show();
            $(this).next().hide();
            _this.bStop = true;
        }else{
            $(this).next().show();
            $(this).next().next().hide();
            _this.bStop = false;
        }
    })
}
Init.prototype.updeta = function(){
    let _this = this;
    this.btn.on('click',function () { 
        if(!_this.phone.val() || !_this.password.val() || !_this.bStop){
            alert('请完整输入');
            return;
        }
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: {
                phone: _this.phone.val(),
                password: _this.password.val()
            },
            success:function(result){
                if(!result.status){
                    alert(result.message);
                    window.location.href = '/';
                }else{
                    alert(result.message);
                }
            },
            error:function(error){
                console.log(error)
            }
        })
     })
}
new Init();