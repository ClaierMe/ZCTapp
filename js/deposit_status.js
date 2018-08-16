function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}



$(function () {

    var text = ""
    text += "<div class='dateTime'>"
    text += "    <div class='dateLeft'>"
    text += "        <p>" + getNowFormatDate() + "</p>"
    text += "    </div>"
    text += "    <div class='dateRight'>"
    text += "        <img src='../img/record@3x.png' alt=''>"
    text += "    </div>"
    text += "</div>"

    request({
        host: CONFIG.loginByZst,
        url: "ZST/trade/getRecord?phone=" + JSON.parse(localStorage.userInfo).phone,
        type: "GET"
    }, function (data) {
        if (data.result == "01") {
            var len = data.data.length
            if (len > 0) {
                var i = 0
                for (i = 0; i < len; i++) {
                    text += "<div class='record'>"
                    text += "<div class='recordHead'>"
                    text += "   <img src='../img/recharge@3x.png' alt=''>"
                    text += "</div>"
                    text += "<div class='recordTime'>"
                    text += "    <div class='recordLine flex'>"
                    text += "        <p class='depositName'>充值</p>"
                    text += "        <p class='depositMoney'>" + data.data[i].amount.toFixed(2) + "</p>"
                    text += "    </div>"
                    text += "    <div class='recordLine flex'>"
                    text += "        <p class='depositTime'>" + data.data[i].createTime + "</p>"
                    text += "        <p class='recordClose'>" + data.data[i].status + "</p>"
                    text += "    </div>"
                    text += "</div>"
                    // text += "<div class='recordPic'>"
                    // text += "    <img src='../img/right.png' alt=''>"
                    // text += "</div>"
                    text += "</div>"
                }
            } else {
                text += "<div class='noRecord'>"
                text += "    <img src='../img/noRecord.png' alt=''>"
                text += "    <p>无记录</p>"
                text += "</div>"
            }
        } else {
            window.yl.call("showToast", {
                content: "查询数据失败",
                duration: 3000,
            })
        }

        $(".recordContent").html(text)
    })
});
