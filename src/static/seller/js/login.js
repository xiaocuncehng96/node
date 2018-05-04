let btn = $('#confirm');
btn.on('click',function(){
    let name = $('input[name=name]').val();
    let password = $('input[name=password]').val();
    if(!name||!password){
        alert('输入不能为空')
    }
    console.log(name,password)
    $.ajax({
        url: '/api/login',
        method: 'POST',
        data: {
            name: name,
            password: password,
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