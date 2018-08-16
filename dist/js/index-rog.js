// 获取 authcode
// function getAuthcode() {
//     window.yl.call("getAuthcode", {}, {
//         onSuccess: function (res) {
//             // alert(JSON.stringify(res))
//             // alert(res.param.data)
//             localStorage.authCode = res.param.authCode
//             getUerInfo(res.param.authCode)
//         },
//         onFail: function (res) {
//             // alert("fail")
//             console.log(res)
//         }
//     })
// }

$(function () {
    common.isBandCrad() // 判断是否绑卡
    // 获取 authcode
    common.getUerInfo()
    // getUerInfo('0nFY1u')

    $('.money-item').each(function (index) {
        $(this).on('touchend', function () {
            $('.money-active').removeClass('money-active')
            $(this).addClass('money-active')
            $('#money').attr('value', $(this).attr('data'))
        })
    })

    $('.submit').on('touchend', function () {
        // $('body').animateCss('fadeInRight');
        setTimeout(function () {
            location.href = "../views/verify.html?money=" + $('#money').val()
        }, 100)
    })
})
