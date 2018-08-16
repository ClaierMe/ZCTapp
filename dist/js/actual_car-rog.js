function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function getLineInfo(p0, p1) {
    window.yl.call("showLoading", {
        content: "正在加载中…",
        duration: 15000,
    })
    $.post(CONFIG.getLineInfoAndCardInfo + "realtimebus/query/queryService/getLineInfoAndCardInfo", {
        p0: p0,
        p1: p1
    }, function (data) {
        window.yl.call("hideLoading")
        //$.post("http://113.106.3.65:4180/realtimebus/query/queryService/getLineInfoAndCardInfo", { p0: "888201", p1: 1 }, function(data) {
        var lines = {}

        data = JSON.parse(data)
        var dataLines = data.line;
        var cars = data.car;
        var i = 0,
            x = 0;
        var text = "";
        for (i = 0; i < cars.length; i++) {
            for (x = 0; x < dataLines.length; x++) {
                if (parseInt(cars[i].nextStationNo) == parseInt(dataLines[x].stationCode)) {
                    if (!lines[dataLines[x].no]) {
                        lines[dataLines[x].no] = ""
                    }
                    if (cars[i].desc.indexOf("到站") > -1) {
                        lines[dataLines[x].no] += "到站"
                    } else {
                        lines[dataLines[x].no] += "中途"
                    }
                }
            }
        }

        for (x = 0; x < dataLines.length; x++) {
            if (x == 0) { // 第一个站点
                text += "<div class='stopName' id='filstStop'>"
                if (lines["1"]) {
                    text += "<div class='car_top'><img class='busStop' src='../img/rechargebox.png' alt='' /></div>"
                    text += "<div class='car_middle'><img class='noneBusStop' src='../img/dianxuanzhong@3x.png' alt='' /></div>"
                    text += "<div class='car_bottom'><span class='busIn'>" + dataLines[x].stopName + "</span></div>"
                } else {
                    text += "<div class='car_top'></div>"
                    text += "<div class='car_middle'><img class='noneBusStop' src='../img/dian@3x.png' alt='' /></div>"
                    text += "<div class='car_bottom'><span>" + dataLines[x].stopName + "</span></div>"
                }
                text += "</div>"
            } else {
                text += "<div class='stopImg'>"
                if (lines["" + (x + 1)]) { // 有车
                    if (lines["" + (x + 1)].indexOf("到站") > -1) {
                        if (lines["" + (x + 1)].indexOf("中途") > -1) {
                            text += "<div class='car_top'><img class='bus' src='../img/bus@3x.png' alt='' /></div>"
                            text += "<div class='car_middle'>"
                            text += "    <div class='car_img_line'></div>"
                            text += "</div>"
                            text += "<div class='car_bottom'></div>"
                            text += "</div>"
                            if (x == (dataLines.length - 1)) {
                                text += " <div class='stopName' id='lastStop'>"
                            } else {
                                text += " <div class='stopName'>"
                            }
                            text += "<div class='car_top'><img class='busStop' src='../img/rechargebox.png' alt='' /></div>"
                            text += "<div class='car_middle'><img class='noneBusStop' src='../img/dianxuanzhong@3x.png' alt='' /></div>"
                            text += "<div class='car_bottom'><span class='busIn'>" + dataLines[x].stopName + "</span></div>"
                            text += "</div>"
                        } else {
                            text += " <div class='car_top'></div>"
                            text += " <div class='car_middle'>"
                            text += " <div class='car_img_line'></div>"
                            text += " </div>"
                            text += " <div class='car_bottom'></div>"
                            text += " </div>"
                            if (x == (dataLines.length - 1)) {
                                text += " <div class='stopName' id='lastStop'>"
                            } else {
                                text += " <div class='stopName'>"
                            }
                            text += "<div class='car_top'><img class='busStop' src='../img/rechargebox.png' alt='' /></div>"
                            text += "<div class='car_middle'><img class='noneBusStop' src='../img/dianxuanzhong@3x.png' alt='' /></div>"
                            text += "<div class='car_bottom'><span class='busIn'>" + dataLines[x].stopName + "</span></div>"
                            text += "</div>"
                        }
                    } else {
                        text += "<div class='car_top'><img class='bus' src='../img/bus@3x.png' alt='' /></div>"
                        text += "<div class='car_middle'>"
                        text += "    <div class='car_img_line'></div>"
                        text += "</div>"
                        text += "<div class='car_bottom'></div>"
                        text += "</div>"
                        if (x == (dataLines.length - 1)) {
                            text += " <div class='stopName' id='lastStop'>"
                        } else {
                            text += " <div class='stopName'>"
                        }
                        text += " <div class='car_top'></div>"
                        text += " <div class='car_middle'><img class='noneBusStop' src='../img/dian@3x.png' alt='' /></div>"
                        text += " <div class='car_bottom'><span>" + dataLines[x].stopName + "</span></div>"
                        text += " </div>"
                    }
                } else { // 没有车
                    text += " <div class='car_top'></div>"
                    text += " <div class='car_middle'>"
                    text += " <div class='car_img_line'></div>"
                    text += " </div>"
                    text += " <div class='car_bottom'></div>"
                    text += " </div>"
                    if (x == (dataLines.length - 1)) {
                        text += " <div class='stopName' id='lastStop'>"
                    } else {
                        text += " <div class='stopName'>"
                    }
                    text += " <div class='car_top'></div>"
                    text += " <div class='car_middle'><img class='noneBusStop' src='../img/dian@3x.png' alt='' /></div>"
                    text += " <div class='car_bottom'><span>" + dataLines[x].stopName + "</span></div>"
                    text += " </div>"
                }

            }
        }

        $(".car_content").html(text);
    });

}

$(function () {

    var routeName = decodeURI(GetQueryString("routeName"));
    var routeCode
    if (!routeName) {
        window.yl.call("showToast", {
            content: "后台获取参数出错",
            duration: 3000,
        })
        return;
    }

    var text = ""
    var lineIndex = 1

    $.post(CONFIG.getLineInfoAndCardInfo + "/realtimebus/query/queryService/getRouteCodeByLineName", {
        p0: routeName
    }, function (lineInfo) {
        lineInfo = JSON.parse(lineInfo)
        lineInfo = lineInfo.lines[0]


        routeCode = lineInfo.routeCode
        $(document).attr('title', lineInfo.routeName);
        var locations = lineInfo.description.split("开往")
        var times = lineInfo.runTime.split("-")

        text += "<div class='car_line_info'>"
        text += "        <div class='car_info_first'>"
        text += "            <span>" + locations[0] + "</span>"
        text += "            <div class='rightImg'><img src='../img/dirRight.png' alt='' /></div>"
        text += "            <span>" + locations[1] + "</span>"
        text += "        </div>"
        text += "        <div class='car_info_normal'>"
        text += "            <span>首" + times[0] + "&nbsp;末" + times[1] + "&nbsp;" + lineInfo.lineType + "</span>"
        text += "        </div>"
        text += "        <div class='car_info_normal'>"
        text += "            <span>发车间隔：" + lineInfo.intervalTime + "</span>"
        text += "        </div>"
        text += "    </div>"
        text += "    <div class='car_line_func'>"
        text += "        <button id='direction'>反向</button>"
        text += "        <button id='flash'>刷新</button>"
        text += "    </div>"



        $(".car_head").html(text)

        $("#direction").click(function () {
            if (lineIndex == 1) {
                lineIndex = 2
            } else {
                lineIndex = 1
            }
            $(".car_content").html("")
            getLineInfo(routeCode, lineIndex)
        })

        $("#flash").click(function () {
            getLineInfo(routeCode, lineIndex)
        })

        getLineInfo(routeCode, lineIndex)

        setInterval(function () {
            getLineInfo(routeCode, lineIndex);
        }, 30000);

    })

})