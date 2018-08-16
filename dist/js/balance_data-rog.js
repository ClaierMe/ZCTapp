function getUserPhone(authCode) {
    // $.post("http://113.106.3.65:8052/ZST/orienteering/loginByZst",{authCode:authCode,systemId:'zst'}, function(data){
    //     localStorage.userInfo = JSON.stringify(data.phone)
    // });
    request({
        host: CONFIG.loginByZst,
        url: "ZST/orienteering/loginByZst?authCode=" + authCode + "&systemId=zst",
        type: "GET"
    }, function (data) {
        localStorage.zstPhone = data.phone
        // alert(localStorage.zstPhone)
        getZstCard(localStorage.zstPhone)
    })
}

function splitStr(str) {
    var retStr = ""
    var i = 0,
        len = str.length
    for (i = 0; i < len; i++) {
        retStr += str.charAt(i);
        if (i % 3 == 2) {
            retStr += " "
        }
    }
    return retStr
}

function getZstCard(phone) {
    request({
        host: CONFIG.loginByZst,
        url: "ZST/orienteering/getCardInfo?phone=" + phone,
        type: "GET"
    }, function (data) {

        window.yl.call("hideLoading")

        if (data.result == "01") {
            localStorage.zstCardNo = data.cardNo
            var text = "";
            text += "<div class='card'>"
            text += "<div class='cardInfo'>"
            text += "    <p>卡号：" + splitStr("" + data.cardNo)
            text += "        </p>"
            text += "            <p>" + data.cardType + "</p>"
            text += "</div>"
            text += "<div class='cardInfo'>"
            text += "    <p>截至：" + data.lastTradeTime + "</p>"
            text += " </div>"
            text += "<div class='cardBalance'>"
            text += "    <div class='balanceValue'>" + data.balance + "</div>"
            text += "    <div class='balanceFlag'>元</div>"
            text += " </div>"
            text += "</div>"
            text += "<div class='function'>"
            text += "<div class='funcHead'>"
            text += "    <img src='../img/progressquery@3x.png' alt=''>"
            text += "</div>"
            text += "<div class='funcDesc' id='cardDeposit'>"
            text += "    <div class='funcName'>"
            text += "        中山通充值"
            text += "    </div>"
            text += "    <div class='funcNameDesc'>"
            text += "        手机快速充值免手续费"
            text += "    </div>"
            text += "</div>"
            text += "<div class='funcPic'>"
            text += "    <img src='../img/right.png' alt=''>"
            text += "</div>"
            text += "</div>"
            text += " <div class='function'>"
            text += " <div class='funcHead'>"
            text += "    <img src='../img/record11@3x.png' alt=''>"
            text += " </div>"
            text += "<div class='funcDesc' id='checkStatus'>"
            text += "    <div class='funcName'>"
            text += "        充值记录"
            text += "    </div>"
            text += "    <div class='funcNameDesc'>"
            text += "        可查询和修改充值状态"
            text += "    </div>"
            text += " </div>"
            text += "<div class='funcPic'>"
            text += "    <img src='../img/right.png' alt=''>"
            text += "</div>"
            text += "</div>"
            text += "<div class='function'>"
            text += "<div class='funcHead'>"
            text += "    <img src='../img/relieve@3x.png' alt=''>"
            text += "</div>"
            text += "<div class='funcDesc' id='releaseCard'>"
            text += "    <div class='funcName'>"
            text += "        绑定解除"
            text += "    </div>"
            text += "    <div class='funcNameDesc'>"
            text += "       解除绑定后将无法进行余额查询和充值"
            text += "    </div>"
            text += " </div>"
            text += "<div class='funcPic'>"
            text += "    <img src='../img/right.png' alt=''>"
            text += "</div>"
            text += "</div>"
            $("#cardDetail").html(text)

            $('#releaseCard').click(function () {
                zct.confirmAlert({
                    title: "解除绑定",
                    content: "是否解绑中山通卡",
                    leftButtonText: "取消",
                    rightButtonText: "确认"
                }, function (res) {
                    // var retult = res.result
                    // if (retult == "leftButton") {
                    request({
                        host: CONFIG.loginByZst,
                        url: "ZST/orienteering/delZstCard?cardasn=" + localStorage.zstCardNo + "&phone=" + phone,
                        type: "GET"
                    }, function (data) {
                        if (data.result === "01") {
                            $("#cardDetail").html("")
                            delete localStorage.isBandCard // 未绑卡
                            location.href = "/views/balance_bind.html?v=1.0.0"
                        } else {
                            window.yl.call("showToast", {
                                content: "解绑中山通卡号不成功",
                                duration: 3000,
                            })
                        }
                    })
                    // }
                }, function (err) {
                    console.log(err)
                })
            })

            $('#cardDeposit').click(function () {
                // alert("中山通充值");
                location.href = "/views/recharge.html?v=1.0.0"
            });

            $('#checkStatus').click(function () {
                location.href = "/views/deposit_status.html?v=1.0.0"
            });

        } else if (data.result == "03") {
            location.href = "/views/balance_bind.html?rwrwoi"
        } else {
            window.yl.call("showToast", {
                content: "后台异常",
                duration: 3000,
            }, {
                onSuccess: function (res) {},
                onFail: function (err) {}
            })
        }
    })
}

$(function () {

    common.isBandCrad()

    window.yl.call("showLoading", {
        content: "正在加载中…",
        duration: 1500,
    })

    common.getCachUserInfo(function (res) {
        // alert(res.phone)
        getZstCard(res.phone)
    })

    // zct.getAuthcode(function (code) {
    //     getUserPhone(code)
    // })
});