function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 3650 * 24 * 60 * 60 * 1000);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
}

var nextStopData = ""

function selectData() {
    if (nextStopData == "" || !nextStopData) {
        return;
    }
    var inputCode = $("#stopCheck").val()
    $(".next_record_div").html("")
    if (inputCode == "") {
        var text = ""
        var len = nextStopData.length
        for (i = 0; i < len; i++) {
            text += "<div class='next_record' id='" + nextStopData[i].id + "'>"
            text += "<div class='next_record_first'>"
            text += "    <img src='../img/stopLocation.png' alt=''>"
            text += "    <span>" + nextStopData[i].name + "</span>"
            text += "</div>"
            text += "<div class='next_record_second'><span>" + nextStopData[i].meters + "m</span></div>"
            text += "</div>"
        }
        $(".next_record_div").html(text)

        $(".next_record").click(function () {
            var stopId = $(this).attr("id")
            location.href = "/views/actual_list.html?stopId=" + stopId
        })
    } else {
        var text = ""
        var len = nextStopData.length
        for (i = 0; i < len; i++) {
            if (nextStopData[i].name.indexOf(inputCode) > -1) {
                text += "<div class='next_record' id='" + nextStopData[i].id + "'>"
                text += "<div class='next_record_first'>"
                text += "    <img src='../img/stopLocation.png' alt=''>"
                text += "    <span>" + nextStopData[i].name + "</span>"
                text += "</div>"
                text += "<div class='next_record_second'><span>" + nextStopData[i].meters + "m</span></div>"
                text += "</div>"
            }
        }
        $(".next_record_div").html(text)

        $(".next_record").click(function () {
            var stopId = $(this).attr("id")
            location.href = "/views/actual_list.html?stopId=" + stopId
        })
    }
}

function changePos(lat, lng) {
    var ret = {}
    var X_PI = Math.PI * 3000.0 / 180.0;
    var x = lng,
        y = lat;
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
    var bd_lng = z * Math.cos(theta) + 0.0065;
    var bd_lat = z * Math.sin(theta) + 0.006;
    ret["lng"] = bd_lng
    ret["lat"] = bd_lat
    return ret
}

$(function () {

    $("#line").val("")
    $("#stopCheck").val("")

    $("#check_line").click(function () {
        var line = $("#line").val()
        if (line.length < 1) {
            window.yl.call("showToast", {
                content: "请输入正确的线路号",
                duration: 3000,
            })
            return
        }
        location.href = "/views/actual_list.html?line=" + line
    });

    $(".line_search").click(function () {

        $(".content1").css("display", "inline")
        $(".content2").css("display", "none")
        $(".line_search").html("<img src='../img/line2choice@3x.png' alt=''><span>线路搜索</span>")
        $(".line_next").html("<img src='../img/next_gray.png' alt=''><span class='bottom_gray'>附近站点</span>")
        nextStopData = ""
    })

    $(".line_next").click(function () {
        $(".content1").css("display", "none")
        $(".content2").css("display", "inline")
        $(".line_search").html("<img src='../img/line2@3x.png' alt=''><span class='bottom_gray'>线路搜索</span>")
        $(".line_next").html("<img src='../img/next_light.png' alt=''><span >附近站点</span>")

        $(".next_record_div").html("")

        window.yl.call("showLoading", {
            content: "正在加载中…",
            duration: 15000,
        })

        window.yl.call("getLocation", {}, {
            onSuccess: function (a) {
                window.yl.call("hideLoading")
                var lat = a.param.latitude
                var lng = a.param.longitude
                var ret = changePos(lat, lng)
                $.post(CONFIG.getLineInfoAndCardInfo + "/realtimebus/query/queryService/nearStation", {
                    p0: ret["lng"],
                    p1: ret["lat"],
                    p2: 300
                }, function (data) {
                    var ret = JSON.parse(data)
                    var stations = ret.stations,
                        i
                    nextStopData = stations

                    if (stations) {
                        var text = ""
                        var len = stations.length
                        if (len > 0) {
                            for (i = 0; i < len; i++) {
                                text += "<div class='next_record' id='" + stations[i].id + "'>"
                                text += "<div class='next_record_first'>"
                                text += "    <img src='../img/stopLocation.png' alt=''>"
                                text += "    <span>" + stations[i].name + "</span>"
                                text += "</div>"
                                text += "<div class='next_record_second'><span>" + stations[i].meters + "m</span></div>"
                                text += "</div>"
                            }
                            $(".next_record_div").html(text)

                            $(".next_record").click(function () {
                                var stopId = $(this).attr("id")
                                location.href = "/views/actual_list.html?stopId=" + stopId
                            })
                        } else {
                            nextStopData = ""
                            text += "<div class='noRecord'>"
                            text += "    <img src='../img/noRecord.png' alt=''>"
                            text += "    <p>附近没有找到相关站点</p>"
                            text += "</div>"
                            $(".next_record_div").html(text)
                        }
                    }
                })

            },
            onFail: function (a) {
                window.yl.call("hideLoading")
                window.yl.call("showToast", {
                    content: "请确保APP获得定位权限后重试",
                    duration: 3000,
                })
            }
        })


    })

    $("#clear_history").click(function () {
        zct.confirmAlert({
            title: "历史记录",
            content: "是否清除历史记录"
        }, function (a) {
            // var retult = a.param.result
            // if (retult == "leftButton") {
            // var strcookie = document.cookie; //获取cookie字符串
            // var arrcookie = strcookie.split("; "); //分割
            // //遍历匹配
            // for (var i = 0; i < arrcookie.length; i++) {
            //     var arr = arrcookie[i].split("=");
            //     delCookie(arr[0])
            // }
            var carStop = {}
            localStorage.carStop = JSON.stringify(carStop)
            $(".history_div").html("")
            // }
        }, function (a) {})

    })

    // var strcookie = document.cookie; //获取cookie字符串
    // var arrcookie = strcookie.split("; "); //分割
    // var text = ""
    //     //遍历匹配
    // for (var i = 0; i < arrcookie.length; i++) {
    //     var arr = arrcookie[i].split("=");
    //     if (arr[1]) {
    //         text += "<div class='line_record' id='" + arr[0] + "'>"
    //         text += "        <img src='../img/history@3x.png' alt=''>"
    //         text += "        <span>" + decodeURI(arr[0]) + "</span>"
    //         text += "    </div>"
    //     }
    // }
    var text = ""
    var carStop = localStorage.carStop
    if (carStop) {
        carStop = JSON.parse(carStop)
        for (var key in carStop) {
            text += "<div class='line_record' id='" + carStop[key] + "'>"
            text += "        <img src='../img/history@3x.png' alt=''>"
            text += "        <span>" + decodeURI(carStop[key]) + "</span>"
            text += "    </div>"
        }
    }
    $(".history_div").html(text)

    $(".history_div div").click(function () {
        var context = $(this).attr("id")
        location.href = encodeURI("/views/actual_car.html?routeName=" + context)
    })

})