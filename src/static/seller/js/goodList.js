$('button[name=rem]').on('click',function () {
    let goodsid = $(this).attr('data-id')
    let rem = $(this);
    $.ajax({
        url: '/api/remove',
        method: 'POST',
        data: {
            goodsid:goodsid
        },
        success:function (result) { 
            if(!result.status){
                rem.parent().parent().remove() 
            }else{
                 alert('系统繁忙，请稍后重试')
            }
         }
    })
 })