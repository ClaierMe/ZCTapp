var price = ""
var menu = ""


function checkInput() {
    var name = $("#name").val()
    var phone = $("#phone").val()
    var location = $("#location").val()
    if (name.length > 0 && location.length > 0 && (phone.length == 11) && price != '无') {
        $(".send").css("background-color", "#0079C5");
        $(".send").removeAttr("disabled")
    } else {
        $(".send").css("background-color", "#92CDF2");
        $(".send").attr("disabled", "disabled");
    }

}


$(function () {

    var gData = ""
    var rateId = 0,
        yearId = 0

    $("#name").val("")
    $("#phone").val("")
    $("#location").val("")
    $("#cue").val("")

    function changeText() {
        var selectText = gData.rate[rateId] + "-" + gData.year[yearId]
        var showText = "已选择“" + gData.rate[rateId] + "," + gData.year[yearId] + "套餐”"
        var prices = gData.price,
            i
        var len = prices.length
        $(".buyInfo").html(showText)
        for (i = 0; i < len; i++) {
            if (prices[i].indexOf(selectText) > -1) {
                price = prices[i].substring(selectText.length + 1)
                menu = prices[i]
                $(".price").html(price)
                break;
            }
        }
    }

    window.yl.call("showLoading", {
        content: "正在加载中…",
        duration: 15000,
    })

    $.post(CONFIG.loginByZst + "ZST/broadband/getMenu", {}, function (data) {
        window.yl.call("hideLoading")
        var result = data.result
        if (result != "01") {
            window.yl.call("showToast", {
                content: "后台获取数据出错",
                duration: 3000,
            })
            return;
        }
        var text = "";
        gData = data
        text += "<div class='selectDiv'>"
        text += "<div class='typeName'>宽带</div>"
        text += "<div class='selectBtn'>"
        text += "    <button class='btnShow' id='1'>" + data.rate[0] + "</button>"
        text += "    <button id='2'>" + data.rate[1] + "</button>"
        text += "    <button id='3'>" + data.rate[2] + "</button>"
        text += "</div>"
        text += "</div>"

        text += "<div class='selectDiv'>"
        text += "       <div class='typeName'>合约期</div>"
        text += "        <div class='selectBtn'>"
        text += "            <button class='btnShow' id='4'>" + data.year[0] + "</button>"
        text += "            <button id='5'>" + data.year[1] + "</button>"
        text += "             <button id='6'>" + data.year[2] + "</button>"
        text += "        </div>"
        text += "   </div>"

        $("#broadSelectInfo").html(text);
        rateId = 0
        yearId = 0
        changeText()
        $(".main_div").css("display", "inline")

        $(".selectDiv button").click(function () {
            var id = $(this).attr("id")
            var i = 0
            if (id < 4) {
                for (i = 1; i <= 3; i++) {
                    $("#" + i).removeClass("btnShow")
                }
                rateId = id - 1
                $("#" + id).addClass("btnShow")
            } else {
                for (i = 1; i <= 3; i++) {
                    $("#" + (3 + i)).removeClass("btnShow")
                }
                yearId = id - 4
                $("#" + id).addClass("btnShow")
            }
            changeText()
            checkInput()
        })
    })


    $(".send").click(function () {
        var name = $("#name").val()
        var phone = $("#phone").val()
        var location = $("#location").val()
        var remark = $("#cue").val()
        $.post(CONFIG.loginByZst + "ZST/broadband/saveClient", {
            user: "18657769868",
            name: name,
            contactPhone: phone,
            location: location,
            menu: menu,
            remark: remark
        }, function (data) {
            if (data.result == "01") {
                $(".main_div").css("display", "none")
                $(".secondHtml").css("display", "inline")
            } else {
                window.yl.call("showToast", {
                    content: "后台登记出错",
                    duration: 3000,
                })
            }
        })
    })
})