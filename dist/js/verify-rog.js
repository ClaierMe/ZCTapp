// 测试加密
function testCrypto() {
    var key = '201807181552245797054891'
    // var str = "['13590770996','']"
    var str = "['5','1', '14']"
    var sign = 'ZSTTZS'
    key = CryptoJS.enc.Utf8.parse(key);
    // iv = CryptoJS.enc.Utf8.parse(iv);
    var crypted = CryptoJS.TripleDES.encrypt(str, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    })
    var signEncrypted = CryptoJS.TripleDES.encrypt(sign, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    })
    crypted = crypted.toString()
    signEncrypted = signEncrypted.toString()
    console.log('?content=' + encodeURIComponent(crypted) + '&sign=' + encodeURIComponent(signEncrypted))
}

// 下单
function pay(number) {
    zct.showLoading()
    var urerInfo = JSON.parse(localStorage.userInfo)
    var str
    if (window.ENV === 'dev' || window.ENV === 'test') str = "['5','" +  $('#money-value').html() + "','" + number + "','" + CONFIG.payRediectUrl + "']"
    else  str = "['" + urerInfo.userId + "','" + 100 * $('#money-value').html() + "','" + number + "','" + CONFIG.payRediectUrl + "']"
    // str = "['" + urerInfo.userId + "','1','" + number + "','" + CONFIG.payRediectUrl + "']"
    // var str = "['" + urerInfo.userId + "','1','" + number + "']"
    // var str = "['5','" + 100 * $('#money-value').html() + "','14','" + CONFIG.payRediectUrl + "']"
    var sign = 'ZSTTZS'
    var key = window.token;
    // alert(str)

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

    // $.ajax({
    //     url: "http://10.0.2.224:13009/appTradeService/doDepoist?userId=5&money=1&type=14",
    //    success: function(res){
    //        console.log(res)
    //     window.location.href = JSON.parse(res.data).payUrl
    //    }
    // })
    request({
        url: 'appTradeService/doDepoist' + content,
        type: "POST"
    }, function (res) {
        // 需要解码
        var contentDecrypted = CryptoJS.TripleDES.decrypt(res.content, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        })
        contentDecrypted = contentDecrypted.toString(CryptoJS.enc.Utf8)
        // alert(JSON.stringify(contentDecrypted))
        // alert(contentDecrypted.payUrl)
        zct.hideLoading()
        window.location.href = JSON.parse(contentDecrypted).payUrl
    })

    // var userInfo = JSON.parse(localStorage.userInfo)
    // alert(JSON.stringify({
    //     order_amt: 1,
    //     user_mobile: userInfo.phone,
    //     userId: userInfo.userId,
    //     systemId: window.sysInfo.systemId,
    //     frontendUrl: "http://sit-zhongshan.allcitygo.com/views/balance_data.html"
    // }))
    // request({
    //     host: "http://120.27.244.113:13010/users/order",
    //     type: 'POST',
    //     data: JSON.stringify({
    //         order_amt: 1,
    //         // user_mobile: '18657769868',
    //         // userId: 'wz8yxjr',
    //         user_mobile: userInfo.phone,
    //         userId: userInfo.userId,
    //         systemId: window.sysInfo.systemId,
    //         product_no: "100010",
    //         order_desc: "中山通充值",
    //         frontendUrl: "http://sit-zhongshan.allcitygo.com/views/balance_data.html"
    //     })
    // }, function(res){
    //     zct.hideLoading()
    //     // alert(JSON.stringify(res))
    //     if(res.code === 0) location.href = res.data.payUrl
    // })
}
// 充值下单
function wechatPay(number) {
    wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.appid, // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.noncestr, // 必填，生成签名的随机串
        signature: res.sign, // 必填，签名
        jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
    })

    wx.chooseWXPay({
        timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: res.noncestr, // 支付签名随机串，不长于 32 位
        package: res.prepayid, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
        signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: res.sign, // 支付签名
        success: function (res) {
            // 支付成功后的回调函数
            alert(JSON.stringify(res))
        }
    })
}

$(function () {
    // 显示充值金额
    var urlObj = parseQueryString(location.href)
    $('#money-value').html(urlObj.money)
    common.getToken()
    // testCrypto()
})