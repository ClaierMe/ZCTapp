var sear = window.location.search;
var houseId = sear.split("=")[1];

$(function () {
    $.ajax({
        url: CONFIG.loginByZst + 'ZST/house/getOneHouse' + '?id=' + houseId,
        type: "GET",
        //data: message,
        processData: false,
        contentType: false,
        dataType: 'json',
        async: true,
        success: function (response) {
            //根据返回结果指定界面操作
            //alert('success');
            reShow(response);
            var position = {
                scale: 18,
                longitude: '',
                latitude: '',
                marks: [{
                    "id": 1,
                    "name": "起湾居委会",
                    "lat": 22.529894,
                    "lng": 113.399972,
                    "address": "中山市东区起湾道富丽路交叉口东南角",
                    "area": "保税仓库",
                    "room": "0厅0室0卫"
                }],
                markType: "zswy",
            }
            position.latitude = response.data.lat;
            position.longitude = response.data.lng;
            position.marks[0].lng = response.data.lng;
            position.marks[0].lat = response.data.lat;
            position.marks[0].address = response.data.location;
            position.marks[0].id = response.data.id;
            position.marks[0].name = response.data.description;
            position.marks[0].area = response.data.town;
            position.marks[0].room = response.data.innerIntroduction;

            $("#add").click(function () {
                toMap(position);
            });

        },
        error: function (response) {
            //alert("位置有误");
        }
    })
})


function reShow(jsonobj) {

    //console.log(jsonobj.data.monthPay);
    var Url = jsonobj.data.pictureUrl;
    var indicator = document.getElementsByClassName("mui-slider-indicator")[0];
    var picContent = document.getElementsByClassName("mui-slider-group")[0];
    if (Url == '') {
        picContent.innerHTML = '<div class="mui-slider-item"><img src="../../img/noPic.png" /></div>'
    } else {
        var imgUrl = Url.split(",");
        if (imgUrl.length == 1) {
            picContent.innerHTML = '<div class="mui-slider-item"><img src="' + imgUrl + '" /></div>'
        }
        for (var i = 0; i < imgUrl.length; i++) {
            if (i == 0) {
                picContent.innerHTML = '<div class="mui-slider-item mui-slider-item-duplicate"><img src="' + imgUrl[imgUrl.length - 1] + '" /></div><div class="mui-slider-item"><img src="' + imgUrl[0] + '" /></div>';
                indicator.innerHTML = '<div class="mui-indicator mui-active"></div>';
                continue;
            } else if (i == imgUrl.length - 1) {
                picContent.innerHTML = picContent.innerHTML + '<div class="mui-slider-item"><img src="' + imgUrl[i] + '" /></div><div class="mui-slider-item mui-slider-item-duplicate"><img src="' + imgUrl[0] + '" /></div>';
            } else {
                picContent.innerHTML = picContent.innerHTML + '<div class="mui-slider-item"><img src="' + imgUrl[i] + '" /></div>';
            }
            indicator.innerHTML = indicator.innerHTML + '<div class="mui-indicator"></div>';
        }
    }

    var gallery = mui('.mui-slider');
    gallery.slider({
        interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
    });


    $("#description").text(jsonobj.data.description);
    $("#monthPay").text(jsonobj.data.monthPay);
    $("#publishTime").text(jsonobj.data.publishTime);
    $("#downPay").text('约' + jsonobj.data.downPay + '万');
    $("#innerIntroduction").text(jsonobj.data.innerIntroduction);
    $("#houseFloor").text(jsonobj.data.houseFloor + '层');
    $("#ownerTime").text(jsonobj.data.ownerTime + '年商品房');
    $("#decoration").text(jsonobj.data.decoration);
    $("#monthPay1").text('约' + jsonobj.data.monthPay + '元');
    $("#houseSpace").text(jsonobj.data.space + '平米');
    $("#direction").text(jsonobj.data.direction);
    $("#completeTime").text(jsonobj.data.completeTime + '年');
    $("#houseUse").text(jsonobj.data.houseUse);
    $("#town").text(jsonobj.data.town);
    $("#location").text(jsonobj.data.location);
    $("#houseDetail").text(jsonobj.data.houseDetail);
    $("#contactUser").text(jsonobj.data.contactUser);
    $("#contactPhone").text(jsonobj.data.contactPhone);

    $(".call a").attr('href', 'tel:' + jsonobj.data.contactPhone);

}