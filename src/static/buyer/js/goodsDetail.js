$('#shop').on('click',function(){
    let d = new Date();
   d = d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()
    $.ajax({
        url:'/api/shop',
        method:'POST',
        data:{
            goodsUrl:window.location.href,
            date:d
        },
        success:function(result){
            console.log(result)
            if(result.status == 0){
                alert(result.message);
                window.location.href = '/buyerOrder'
            }else if(result.status == 1){
                alert(result.message);
                window.location.href = '/login'
            }else{
                alert(result.message);
            }
        },
        error:function(error){
            console.log(error)
        }
    })
})