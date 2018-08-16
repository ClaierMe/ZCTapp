$(function () {
    common.getToken()
    lockAndMake()
    $('.user-id-insert').text(window.localStorage.elderCardID1);
    $('.user-name-insert').text(window.localStorage.name);
    $('.phone-num').text(window.localStorage.phone);
    if (window.localStorage.needSend === 'true') {
        $('.need-send').text('是');
        $('.need-send-insert').text(window.localStorage.location);
    } else {
        $('.need-send').text('否');
    }


    $('.all-money-insert').text(window.localStorage.allMoney + '元');
    // //获取用户登录手机号
    // common.getUerInfo();
    // alert(JSON.stringify(window.localStorage.userInfo));
    // //挂失登记老人卡
    // $.ajax({
    //     url:' http://113.106.3.65:8052/ZST/oldCard/register',
    //     type: 'POST',
    //     dataType: 'json',
    //     data:{
    //         user: window.localStorage.user,
    //         name: window.localStorage.name,
    //         phone: window.localStorage.phone,
    //         zstId: window.localStorage.zstId,
    //         needSend: window.localStorage.needSend,
    //         location: window.localStorage.location,
    //         specialCard: window.localStorage.specialCard,
    //     },
    //     success: function(res) {
    //         alert(JSON.stringify(res))
    //     }
    // });
})

function lockAndMake() {

    // localStorage.allMoney = 15
    // localStorage.phone = 15801710467
    // localStorage.name = '卢鸠有'
    // localStorage.needSend = false
    // localStorage.location = '广东省中山市请选择所在区'
    // localStorage.elderCardID1 = '440001830'
    // localStorage.orderid = '102841'

    // $('#alipay').on('touchend', function () {
    //     luanchPay()
    // })

    // 拿到原卡号后  挂失卡片
    $.ajax({
        url: CONFIG.getLineInfoAndCardInfo + "realtimebus/query/cardManagerService/lockAndMake",
        type: "POST",
        dataType: 'json',
        data: {
            p0: window.localStorage.elderCardID1
        },
        success: function (res) {
            var trimOrderid = $.trim(res.orderid);
            window.localStorage.orderid = trimOrderid; // 订单号
            // alert(trimOrderid)
            // if (trimOrderid) {
            //     alert('挂失成功！')
            // }

            $('#alipay').on('touchend', function () {
                luanchPay()
            })
        }
    })
}

function listenPay() {
    zct.showLoading()
    var urerInfo = JSON.parse(localStorage.userInfo)
    // var str = "['" + urerInfo.userId + "','1','14','" + JSON.stringify({
    //     "phone": localStorage.phone,
    //     "name": localStorage.name,
    //     "user": localStorage.phone,
    //     "needSend": localStorage.needSend,
    //     "location": localStorage.location,
    //     "oldZstCard": localStorage.elderCardID1,
    //     "frontendUrl": CONFIG.payRediectUrl
    // }) + "']"
    var str = "['" + urerInfo.userId + "','" + 100 * localStorage.allMoney + "','14','" + JSON.stringify({
        "phone": localStorage.phone,
        "name": localStorage.name,
        "user": localStorage.phone,
        "needSend": localStorage.needSend,
        "location": localStorage.location,
        "oldZstCard": localStorage.elderCardID1,
        "frontendUrl": CONFIG.payRediectUrl
    }) + "']"
    // var str = "['5','1','14']";
    var sign = 'ZSTTZS'
    var key = window.token

    key = CryptoJS.enc.Utf8.parse(key);
    var signEncrypted = CryptoJS.TripleDES.encrypt(sign, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    })
    var contentEncrypted = CryptoJS.TripleDES.encrypt(str, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    })
    signEncrypted = signEncrypted.toString();
    contentEncrypted = contentEncrypted.toString();
    var content = '?content=' + encodeURIComponent(contentEncrypted) + '&sign=' + encodeURIComponent(signEncrypted)
    // alert(content)
    request({
        url: 'appTradeService/customCard' + content,
        type: "POST"
    }, function (res) {
        // 需要解码
        var contentDecrypted = CryptoJS.TripleDES.decrypt(res.content, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        })
        contentDecrypted = contentDecrypted.toString(CryptoJS.enc.Utf8)
        // alert(contentDecrypted.payUrl)
        window.location.href = JSON.parse(contentDecrypted).payUrl
        zct.hideLoading()
    })
}