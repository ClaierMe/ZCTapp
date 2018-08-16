function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function setCookie(name, value) {
    var Days = 3650;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
}

var listStopData = ""
var type = 0

function selectData() {

    if (listStopData == "" || !listStopData) {
        return;
    }

    var inputCode = $("#stopCheck").val()
    inputCode = inputCode.toUpperCase()

    $(".contnt_div").html("");
    var text = ""
    var len = listStopData.length,
        i
    if (len > 0) {
        for (i = 0; i < len; i++) {
            if (inputCode == "") {
                text += " <div class='line_record' id='" + i + "'>"
                text += "<img src='../img/line@3x.png' alt=''>"
                if (type == 1) {
                    text += " <span>" + listStopData[i].routeName + "</span>"
                } else {
                    text += " <span>" + listStopData[i].lineName + "</span>"
                }
                text += " </div>"
            } else {
                var stopName = ""
                if (type == 1) {
                    stopName = listStopData[i].routeName
                } else {
                    stopName = listStopData[i].lineName
                }
                if (stopName.indexOf(inputCode) > -1) {
                    text += " <div class='line_record' id='" + i + "'>"
                    text += "<img src='../img/line@3x.png' alt=''>"
                    text += " <span>" + stopName + "</span>"
                    text += " </div>"
                }
            }
        }
        $(".contnt_div").html(text);

        $(".contnt_div div").click(function () {
            var id = $(this).attr("id")
            id = parseInt(id)
            var carStop = localStorage.carStop
            if (carStop == null) {
                carStop = {}
                carStop = JSON.stringify(carStop)
            }
            carStop = JSON.parse(carStop)
            if (type == 1) {
                //setCookie(encodeURI(listStopData[id].routeName), encodeURI(listStopData[id].routeName))
                carStop["" + encodeURI(listStopData[id].routeName)] = encodeURI(listStopData[id].routeName);
                location.href = encodeURI("/views/actual_car.html?routeName=" + encodeURI(listStopData[id].routeName))
            } else {
                //setCookie(encodeURI(listStopData[id].lineName), encodeURI(listStopData[id].lineName))
                carStop["" + encodeURI(listStopData[id].routeName)] = encodeURI(listStopData[id].routeName);
                location.href = encodeURI("/views/actual_car.html?routeName=" + encodeURI(listStopData[id].lineName))
            }
            localStorage.carStop = JSON.stringify(carStop)

        })
    }


    // if (inputCode == "") {

    // } else {

    // }
}

$(function () {

    var result;
    var line = GetQueryString("line");
    var stopId = GetQueryString("stopId");
    if ((line != null) || (stopId != null)) {
        window.yl.call("showLoading", {
            content: "正在加载中…",
            duration: 15000,
        })

        var url = ""
        var sendParams = {}
        if (line) {
            type = 1
            line = line.toString().toUpperCase()
            url = CONFIG.getLineInfoAndCardInfo + "realtimebus/query/queryService/getRouteCodeByLineName"
            sendParams["p0"] = line
        } else {
            type = 2
            url = CONFIG.getLineInfoAndCardInfo + "realtimebus/query/queryService/getLineSet"
            sendParams["p0"] = stopId
        }
        $.post(url, sendParams, function (data) {
            window.yl.call("hideLoading")
            data = JSON.parse(data)
            if (line) {
                result = data.lines
            } else {
                result = data.lineSet
            }
            listStopData = result
            var text = ""
            var len = result.length,
                i
            if (len > 0) {
                text += "<div class='head_div'>"
                text += "<div class='next_head'>"
                text += "<img src='../img/screen@3x.png' alt=''>"
                text += "<input required='required' placeholder='请输入关键字' id='stopCheck' oninput='selectData()' />"
                text += "</div>"
                text += "<div class='line_head_div'>"
                text += "线路"
                text += "</div>"
                text += "</div>"
                text += " <div class='contnt_div'>"
                for (i = 0; i < len; i++) {
                    text += " <div class='line_record' id='" + i + "'>"
                    text += "<img src='../img/line@3x.png' alt=''>"
                    if (type == 1) {
                        text += " <span>" + result[i].routeName + "</span>"
                    } else {
                        text += " <span>" + result[i].lineName + "</span>"
                    }
                    text += " </div>"
                }
                text += " </div>"
                $(".main_div").html(text);

                $(".contnt_div div").click(function () {
                    var id = $(this).attr("id")
                    id = parseInt(id)
                    var carStop = localStorage.carStop
                    if (carStop == null) {
                        carStop = {}
                        carStop = JSON.stringify(carStop)
                    }

                    carStop = JSON.parse(carStop)

                    if (type == 1) {
                        //setCookie(encodeURI(result[id].routeName), encodeURI(result[id].routeName))
                        carStop["" + encodeURI(result[id].routeName)] = encodeURI(result[id].routeName);
                        location.href = encodeURI("/views/actual_car.html?routeName=" + encodeURI(result[id].routeName))
                    } else {
                        //setCookie(encodeURI(result[id].lineName), encodeURI(result[id].lineName))
                        carStop["" + encodeURI(result[id].lineName)] = encodeURI(result[id].lineName);
                        location.href = encodeURI("/views/actual_car.html?routeName=" + encodeURI(result[id].lineName))
                    }
                    localStorage.carStop = JSON.stringify(carStop)

                })
            } else {
                listStopData = ""
                text += "<div class='head_div'>"
                text += "<div class='check_div'>"
                text += "<div class='line_input'>"
                text += "<div class='line_img'><img src='../img/search.png' alt='' /></div>"
                text += "    <input required='required' placeholder='请输入关键字' oninput='checkBtn()' id='line' />"
                text += " </div>"
                text += "<button id='check_line' disabled='disabled'>查询</button>"
                text += "</div>"
                text += " <div class='line_head_div'>"
                text += "  线路"
                text += " </div>"
                text += " </div>"
                text += "<div class='noRecord'>"
                text += "    <img src='../img/noRecord.png' alt=''>"
                text += "    <p>没有找到相关线路</p>"
                text += "</div>"
                $(".main_div").html(text);
            }
        });
    }
})