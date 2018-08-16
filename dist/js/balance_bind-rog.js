function checkBtn() {
    var card1 = $("#input-one").val()
    var card2 = $("#input-two").val()
    if ((card1.length == 9) && (card1 == card2)) {
        $(".submit").css("background-color", "#0079C5");
        $(".submit").removeAttr("disabled")
    } else {
        $(".submit").css("background-color", "#92CDF2");
        $(".submit").attr("disabled", "disabled");
    }
}

$(function () {

    common.getUerInfo()

    $(".input-one").val("")
    $(".input-two").val("")

    pushHistory()

    window.addEventListener("popstate", function () {
        zct.confirmAlert({
            content: '您确定要退出绑卡嘛？'
        }, function () {
            //点击确认
            window.yl.call("closeWebview")
            // window.history.back()
        }, function () {
            pushHistory()
        })
    }, false)

    function pushHistory(){
        var state = {
            title: "绑定中山通",
            url: "../views/balance_bind.html"
        }
        window.history.pushState(state, state.title, state.url)
    }

    $('.submit').click(function () {
        var card1 = $("#input-one").val()
        var card2 = $("#input-two").val()
        if (card1.length != 9 || card2.length != 9) {
            window.yl.call("showToast", {
                content: "请输入正确的中山通卡号",
                duration: 3000,
            })
            return;
        }
        if (card1 != card2) {
            window.yl.call("showToast", {
                content: "两次输入中山通卡号不一致",
                duration: 3000,
            })
            return;
        }
        // alert(localStorage.userInfo)
        zct.showLoading()
        request({
            host: CONFIG.loginByZst,
            url: "ZST/orienteering/setZstCard?cardasn=" + card1 + "&phone=" + JSON.parse(localStorage.userInfo).phone,
            type: "GET"
        }, function (data) {
            zct.hideLoading()
            if (data.result == "01") {
                window.yl.call("showToast", {
                    content: "恭喜你已经成功绑定中山通卡",
                    duration: 2000
                })
                localStorage.isBandCard = true
                location.href = "/views/balance_data.html?v=1.0.0"
            } else if (data.result == "05") {
                window.yl.call("showToast", {
                    content: "中山通卡号不存在",
                    duration: 3000,
                })
            } else {
                window.yl.call("showToast", {
                    content: "设置中山通卡号不成功",
                    duration: 3000,
                })
            }
        })
    });
});