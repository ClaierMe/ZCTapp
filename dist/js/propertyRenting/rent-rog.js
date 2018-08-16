var div = '';
var houseType;
$(function () {
    getDetail1();
    //分页加载
    document.addEventListener('scroll', function () {
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        if (document.body.scrollHeight == scrollTop + window.innerHeight) {
            if (houseType === 2) {
                getSellDetail()
            } else {
                getDetail1()
            }
        }
    });
    //出租
    $('#inp-radio-label1').on('touchstart', function () {
        $('#inp-radio-label2').removeClass('inp-radio-active');
        $(this).addClass('inp-radio-active');
        $(".rent").removeClass("hide");
        $(".sell").addClass("hide");
        houseType = 1;
    })
    //出售
    $('#inp-radio-label2').on('touchstart', function () {
        $('#inp-radio-label1').removeClass('inp-radio-active');
        $(this).addClass('inp-radio-active');
        $(".rent").addClass("hide");
        $(".sell").removeClass("hide");
        houseType = 2;
        getSellDetail();
    })
    //点击全城
    $('.footer-left').on('touchstart', function () {
        $(this).addClass('active-color');
        $('.footer-left .bg-img1').addClass('bg-img1-active');
        $(this).siblings().removeClass('active-color');
        $(this).siblings().find("div:eq(0)").removeClass('bg-img2-active bg-img3-active');
        getDetail1();
        $('.rent .rent-1').removeClass('hide');
        $('.rent .rent-2').addClass('hide');
        // $(".sell .sell-distance").addClass("hide");
        if (houseType == 2) $(".sell .sell-distance").addClass("hide");

    })
    //点击附近
    $('.footer-mid').on('touchstart', function () {
        $(this).addClass('active-color');
        $('.footer-mid .bg-img2').addClass('bg-img2-active');
        $(this).siblings().removeClass('active-color');
        $(this).siblings().find("div:eq(0)").removeClass('bg-img1-active bg-img3-active');

        $('.rent .rent-1').addClass('hide');
        $('.rent .rent-2').removeClass('hide');
        if (houseType == 2) $(".sell .sell-distance").removeClass("hide");

        //获取当前位置的经纬度
        window.zct.getLocation(function (res) {
            window.localStorage.longitude0 = res.longitude;
            window.localStorage.latitude0 = res.latitude;
        });
        getDetail2();

    })
    //地图
    $('.footer-right').on('touchstart', function () {
        $(this).addClass('active-color');
        $('.footer-right .bg-img3').addClass('bg-img3-active');
        $(this).siblings().removeClass('active-color');
        $(this).siblings().find("div:eq(0)").removeClass('bg-img1-active bg-img2-active');
        //
        window.zct.getLocation(function (res) {
            // alert(JSON.stringify(res));
            toMap({
                longitude: res.longitude,
                latitude: res.latitude
            })
        });
    })

})

//插入data数据
function appendDiv1(dataArr) {
    for (var i = 0, len = dataArr.length; i < len; i++) {
        var data = dataArr[i];
        div += '<a class="content-wrapper" href="rent_detail.html?id=' + data.id + '" target="_blank">' +
            '<div class="icon-img">' +
            '<img src="' + data.smallPictureUrl + '" onerror="handleOnerror()" alt="">' +
            '</div>' +
            '<div class="text">' +
            '<div class="text-title">' + data.description + '</div>' +
            '<div class="text-desc">' + data.location + '</div>' +
            '<div class="text-footer">' + data.price + '元/月</div>' +
            '</div>' +
            '</a>'
    }
    $('.rent .rent-1 .wrapper').append(div);
    div = '';
}

function appendDiv2(dataArr) {
    for (var i = 0, len = dataArr.length; i < len; i++) {
        var data = dataArr[i];
        div += '<a class="content-wrapper" href="rent_detail.html?id=' + data.id + '" target="_blank">' +
            '<div class="icon-img">' +
            '<img src="' + data.smallPictureUrl + '" onerror="handleOnerror()" alt="">' +
            '</div>' +
            '<div class="text">' +
            '<div class="text-title">' + data.description + '</div>' +
            '<div class="text-desc">' + data.location + '</div>' +
            '<div class="text-footer">' + data.price + '元/月</div>' +
            '</div>' +
            '</a>'
    }
    $('.rent .rent-2 .wrapper').append(div);
    div = '';
}
//图片加载出错
function handleOnerror() {
    var imgArr = $('.icon-img img');
    for (var i = 0, len = imgArr.length; i < len; i++) {
        if ($(imgArr[i]).attr('src') == '') {
            $(imgArr[i]).attr("src", "../../img/no-img.png");
        }
    }
}