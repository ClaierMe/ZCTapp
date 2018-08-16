$(document).ready(function () {

  // 出租页面--全城--逻辑控制
  $(".rent .rent-1 .price").on("touchstart", function () {
    var type = $(".rent .rent-1 .price-content").hasClass("hide");
    if (type) {
      $(".rent .rent-1 .collapse-content").removeClass("hide")
      $(".rent .rent-1 .price-content").removeClass("hide");
      $(".rent .rent-1 .price-content").siblings().addClass("hide");
      $(".mask").removeClass("hide");
      $(this).find(".comm-img").css("background-image", "url(../../img/arrowu.png)")
      $(this).siblings().find(".comm-img").css("background-image", "url(../../img/arrowd.png)")
    } else {
      $(".rent .rent-1 .collapse-content").addClass("hide")
      $(".rent .rent-1 .collapse-content").find("ul").addClass("hide");
      $(".mask").addClass("hide");
      $(this).find(".comm-img").css("background-image", "url(../../img/arrowd.png)")
    }
  })
  $(".rent .rent-1 .area").on("touchstart", function () {
    var type = $(".rent .rent-1 .area-content").hasClass("hide");
    if (type) {
      $(".rent .rent-1 .collapse-content").removeClass("hide")
      $(".rent .rent-1 .area-content").removeClass("hide");
      $(".rent .rent-1 .area-content").siblings().addClass("hide");
      $(".mask").removeClass("hide");
      $(this).find(".comm-img").css("background-image", "url(../../img/arrowu.png)")
      $(this).siblings().find(".comm-img").css("background-image", "url(../../img/arrowd.png)")
    } else {
      $(".rent .rent-1 .collapse-content").addClass("hide")
      $(".rent-1 .collapse-content").find("ul").addClass("hide");
      $(".mask").addClass("hide");
      $(this).find(".comm-img").css("background-image", "url(../../img/arrowd.png)")
    }
  })
  $(".rent .rent-1 .source").on("touchstart", function () {
    var type = $(".rent .rent-1 .source-content").hasClass("hide");
    if (type) {
      $(".rent .rent-1 .collapse-content").removeClass("hide")
      $(".rent .rent-1 .source-content").removeClass("hide");
      $(".rent .rent-1 .source-content").siblings().addClass("hide");
      $(".mask").removeClass("hide");
      $(this).find(".comm-img").css("background-image", "url(../../img/arrowu.png)")
      $(this).siblings().find(".comm-img").css("background-image", "url(../../img/arrowd.png)")
    } else {
      $(".rent .rent-1 .collapse-content").addClass("hide")
      $(".rent-1 .collapse-content").find("ul").addClass("hide");
      $(".mask").addClass("hide");
      $(this).find(".comm-img").css("background-image", "url(../../img/arrowd.png)")
    }
  })
  $(".rent .rent-1 .room").on("touchstart", function () {
    var type = $(".rent .rent-1 .room-content").hasClass("hide");
    if (type) {
      $(".rent .rent-1 .collapse-content").removeClass("hide")
      $(".rent .rent-1 .room-content").removeClass("hide");
      $(".rent .rent-1 .room-content").siblings().addClass("hide");
      $(".mask").removeClass("hide");
      $(this).find(".comm-img").css("background-image", "url(../../img/arrowu.png)")
      $(this).siblings().find(".comm-img").css("background-image", "url(../../img/arrowd.png)")
    } else {
      $(".rent .rent-1 .collapse-content").addClass("hide")
      $(".rent-1 .collapse-content").find("ul").addClass("hide");
      $(".mask").addClass("hide");
      $(this).find(".comm-img").css("background-image", "url(../../img/arrowd.png)")
    }
  })
  $(".rent .rent-more").on("touchstart", function () {
    var type = $(".rent .rent-more-content").hasClass("hide");
    if (type) {
      $(".rent-2 .collapse-content").removeClass("hide")
      $(".rent-2 .rent-more-content").removeClass("hide");
      $(".rent-2 .rent-more-content").siblings().addClass("hide");
      $(".rent-2 .mask").removeClass("hide");
      $(this).find(".comm-img").css("background-image", "url(../../img/arrowu.png)")
      $(this).siblings().find(".comm-img").css("background-image", "url(../../img/arrowd.png)")
    } else {
      $(".rent-2 .collapse-content").addClass("hide")
      $(".rent-2 .collapse-content").find("ul").addClass("hide");
      $(".mask").addClass("hide");
      $(this).find(".comm-img").css("background-image", "url(../../img/arrowd.png)")
    }
  })

  // 出租页面--附近--逻辑控制
  $(".rent .rent-2 .price").on("touchstart", function () {
    var type = $(".rent-2 .price-content").hasClass("hide");
    if (type) {
      $(".rent .rent-2 .collapse-content").removeClass("hide")
      $(".rent .rent-2 .price-content").removeClass("hide");
      $(".rent .rent-2 .price-content").siblings().addClass("hide");
      $(".mask").removeClass("hide");
      $(this).find(".comm-img").css("background-image", "url(../../img/arrowu.png)")
      $(this).siblings().find(".comm-img").css("background-image", "url(../../img/arrowd.png)")
    } else {
      $(".rent-2 .collapse-content").addClass("hide")
      $(".rent-2 .collapse-content").find("ul").addClass("hide");
      $(".mask").addClass("hide");
      $(this).find(".comm-img").css("background-image", "url(../../img/arrowd.png)")
    }
  })
  $(".rent .rent-2 .area").on("touchstart", function () {
    var type = $(".rent-2 .area-content").hasClass("hide");
    if (type) {
      $(".rent .rent-2 .collapse-content").removeClass("hide")
      $(".rent .rent-2 .area-content").removeClass("hide");
      $(".rent .rent-2 .area-content").siblings().addClass("hide");
      $(".mask").removeClass("hide");
      $(this).find(".comm-img").css("background-image", "url(../../img/arrowu.png)")
      $(this).siblings().find(".comm-img").css("background-image", "url(../../img/arrowd.png)")
    } else {
      $(".rent-2 .collapse-content").addClass("hide")
      $(".rent-2 .collapse-content").find("ul").addClass("hide");
      $(".mask").addClass("hide");
      $(this).find(".comm-img").css("background-image", "url(../../img/arrowd.png)")
    }
  })
  $(".rent .rent-2 .source").on("touchstart", function () {
    var type = $(".rent-2 .source-content").hasClass("hide");
    if (type) {
      $(".rent .rent-2 .collapse-content").removeClass("hide")
      $(".rent .rent-2 .source-content").removeClass("hide");
      $(".rent .rent-2 .source-content").siblings().addClass("hide");
      $(".mask").removeClass("hide");
      $(this).find(".comm-img").css("background-image", "url(../../img/arrowu.png)")
      $(this).siblings().find(".comm-img").css("background-image", "url(../../img/arrowd.png)")
    } else {
      $(".rent-2 .collapse-content").addClass("hide")
      $(".rent-2 .collapse-content").find("ul").addClass("hide");
      $(".mask").addClass("hide");
      $(this).find(".comm-img").css("background-image", "url(../../img/arrowd.png)")
    }
  })
  //点击距离
  $(".rent .rent-2 .distance").on("touchstart", function () {
    var type = $(".rent-2 .distance-content").hasClass("hide");
    if (type) {
      $(".rent .rent-2 .collapse-content").removeClass("hide")
      $(".rent .rent-2 .distance-content").removeClass("hide");
      $(".distance-content").siblings().addClass("hide");
      $(".mask").removeClass("hide");
      $(this).find(".comm-img").css("background-image", "url(../../img/arrowu.png)")
      $(this).siblings().find(".comm-img").css("background-image", "url(../../img/arrowd.png)")
    } else {
      $(".rent-2 .collapse-content").addClass("hide")
      $(".rent-2 .collapse-content").find("ul").addClass("hide");
      $(".mask").addClass("hide");
      $(this).find(".comm-img").css("background-image", "url(../../img/arrowd.png)")
    }
  })
  // 出租页面--全城--点击选中条件--逻辑控制
  $(".rent .rent-1 .price-content").find("li").on("click", function () {
    $('.rent .rent-1 .wrapper').empty();
    page1 = 1;
    event.preventDefault();
    $(".rent .rent-1 .price-content").addClass("hide");
    var str = $(this).text();
    $(".rent .rent-1 .selected-content").find(".selected-price").text(str);
    $(".rent .rent-1 .price-clear").removeClass("hide").css("margin-right", "10px");
    $(".mask").addClass("hide");
    getDetail1();
  })
  $(".rent .rent-1 .area-content").find("li").on("click", function () {
    $('.rent .rent-1 .wrapper').empty();
    page1 = 1;
    event.preventDefault();
    $(".rent .rent-1 .area-content").addClass("hide");
    var str = $(this).text();
    $(".rent .rent-1  .selected-content").find(".selected-area").text(str);
    $(".rent .rent-1 .area-clear").removeClass("hide").css("margin-right", "10px");
    $(".mask").addClass("hide");
    getDetail1();
  })
  $(".rent .rent-1 .source-content").find("li").on("click", function () {
    $('.rent .rent-1 .wrapper').empty();
    page1 = 1;
    event.preventDefault();
    $(".rent .rent-1 .source-content").addClass("hide");
    var str = $(this).text();
    $(".rent .rent-1 .selected-content").find(".selected-source").text(str);
    $(".rent .rent-1 .source-clear").removeClass("hide").css("margin-right", "10px");
    $(".mask").addClass("hide");
    getDetail1();
  })
  $(".rent .rent-1 .room-content").find("li").on("click", function () {
    $('.rent .rent-1 .wrapper').empty();
    page1 = 1;
    event.preventDefault();
    $(".rent .rent-1 .room-content").addClass("hide");
    var str = $(this).text();
    $(".rent .rent-1 .selected-content").find(".selected-room").text(str);
    $(".rent .rent-1 .room-clear").removeClass("hide").css("margin-right", "10px");
    $(".mask").addClass("hide");
    getDetail1();
  })
  // 出租页面--附近--点击选中条件--逻辑控制
  $(".rent .rent-2 .price-content").find("li").on("click", function () {
    $('.rent .rent-2 .wrapper').empty();
    page2 = 1;
    event.preventDefault();
    $(".rent .rent-2 .price-content").addClass("hide");
    var str = $(this).text();
    $(".rent .rent-2 .selected-content").find(".selected-price").text(str);
    $(".rent .rent-2 .price-clear").removeClass("hide").css("margin-right", "10px");
    $(".mask").addClass("hide");
    getDetail2();
  })
  $(".rent .rent-2 .area-content").find("li").on("click", function () {
    $('.rent .rent-2 .wrapper').empty();
    page2 = 1;
    event.preventDefault();
    $(".rent .rent-2 .area-content").addClass("hide");
    var str = $(this).text();
    $(".rent .rent-2  .selected-content").find(".selected-area").text(str);
    $(".rent .rent-2 .area-clear").removeClass("hide").css("margin-right", "10px");
    $(".mask").addClass("hide");
    getDetail2();
  })
  $(".rent .rent-2 .source-content").find("li").on("click", function () {
    $('.rent .rent-2 .wrapper').empty();
    page2 = 1;
    event.preventDefault();
    $(".rent .rent-2 .source-content").addClass("hide");
    var str = $(this).text();
    $(".rent .rent-2 .selected-content").find(".selected-source").text(str);
    $(".rent .rent-2 .source-clear").removeClass("hide").css("margin-right", "10px");
    $(".mask").addClass("hide");
    getDetail2();
  })
  $(".rent .rent-2 .distance-content").find("li").on("click", function () {
    $('.rent .rent-2 .wrapper').empty();
    page2 = 1;
    event.preventDefault();
    $(".rent .rent-2 .distance-content").addClass("hide");
    distanceText = $(this).text();
    $(".rent .rent-2 .selected-content").find(".selected-distance").text(distanceText);
    distanceText = distanceText.split("米")[0];
    $(".rent .rent-2 .distance-clear").removeClass("hide").css("margin-right", "10px");
    $(".mask").addClass("hide");
    getDetail2();
  })
  //点击厅室条件
  $(".rent-2 .rent-hall-room").on("touchstart", function () {
    $(".rent-2").find(".rent-room-list").removeClass("hide");
    $(".rent-2 .rent-hall-room").addClass("hide")
    $(".rent-2 .search").addClass("hide");
    $(".rent-2 .back").removeClass("hide");
  })
  $(".rent-2 .rent-room-list").find("li").on("touchstart", function (params) {
    $(".rent-room-list").addClass("hide");
    var content = $(this).text();
    $(".rent-2 .rent-hall-room").find("span:eq(0)").text(content);
    $(".rent-2 .rent-hall-room").removeClass("hide");
    $(".rent-2 .search").removeClass("hide");
    $(".rent-2 .back").addClass("hide");
  })
  $(".rent-2 .back").on("touchstart", function () {
    $(".rent-2 .rent-room-list").addClass("hide");
    $(".rent-2 .rent-hall-room").removeClass("hide");
    $(".rent-2 .search").removeClass("hide");
    $(".rent-2 .back").addClass("hide");
  })
  $(".rent-2 .search").on("touchstart", function () {
    $('.rent .rent-2 .wrapper').empty();
    page2 = 1;
    event.preventDefault();
    $(".rent-2 .rent-more-content").addClass("hide");
    var hallRoom = $(".rent-2 .rent-hall-room").find("span:eq(0)").text();
    $(".rent-2").find(".selected-room").text(hallRoom);
    if (hallRoom != '') $(".rent-2 .room-clear").removeClass("hide").css("margin-right", "10px");
    $(".mask").addClass("hide");
    getDetail2();
  })

  // 出租页面--全城--清除删选条件--逻辑控制
  $(".rent .rent-1 .selecte-detail").find("div:eq(1)").on("touchstart", function (params) {
    $('.rent .rent-1 .wrapper').empty();
    page1 = 1;
    $(".rent .rent-1 .selected-price").text("");
    $(".rent .rent-1 .price-clear").addClass("hide")
    getDetail1();
  })
  $(".rent .rent-1 .selecte-detail").find("div:eq(2)").on("touchstart", function (params) {
    $('.rent .rent-1 .wrapper').empty();
    page1 = 1;
    $(".rent .rent-1 .selected-area").text("");
    $(".rent .rent-1 .area-clear").addClass("hide")
    getDetail1();
  })
  $(".rent .rent-1 .selecte-detail").find("div:eq(3)").on("touchstart", function (params) {
    $('.rent .rent-1 .wrapper').empty();
    page1 = 1;
    $(".rent .rent-1 .selected-source").text("");
    $(".rent .rent-1 .source-clear").addClass("hide")
    getDetail1();
  })
  $(".rent .rent-1 .selecte-detail").find("div:eq(4)").on("touchstart", function (params) {
    $('.rent .rent-1 .wrapper').empty();
    page1 = 1;
    $(".rent .rent-1 .selected-room").text("");
    $(".rent .rent-1 .room-clear").addClass("hide")
    getDetail1();
  })
  // 出租页面--附近--清除删选条件--逻辑控制
  $(".rent .rent-2 .selecte-detail").find("div:eq(1)").on("touchstart", function (params) {
    $('.rent .rent-2 .wrapper').empty();
    page2 = 1;
    $(".rent .rent-2 .selected-distance").text("");
    $(".rent .rent-2 .distance-clear").addClass("hide")
    getDetail2();
  })
  $(".rent .rent-2 .selecte-detail").find("div:eq(2)").on("touchstart", function (params) {
    $('.rent .rent-2 .wrapper').empty();
    page2 = 1;
    $(".rent .rent-2 .selected-price").text("");
    $(".rent .rent-2 .price-clear").addClass("hide")
    getDetail2();
  })
  $(".rent .rent-2 .selecte-detail").find("div:eq(3)").on("touchstart", function (params) {
    $('.rent .rent-2 .wrapper').empty();
    page2 = 1;
    $(".rent .rent-2 .selected-area").text("");
    $(".rent .rent-2 .area-clear").addClass("hide")
    getDetail2();
  })
  $(".rent .rent-2 .selecte-detail").find("div:eq(4)").on("touchstart", function (params) {
    $('.rent .rent-2 .wrapper').empty();
    page2 = 1;
    $(".rent .rent-2 .selected-source").text("");
    $(".rent .rent-2 .source-clear").addClass("hide")
    getDetail2();
  })
  $(".rent .rent-2 .selecte-detail").find("div:eq(5)").on("touchstart", function (params) {
    $('.rent .rent-2 .wrapper').empty();
    page2 = 1;
    $(".rent .rent-2 .selected-room").text("");
    $(".rent .rent-2 .room-clear").addClass("hide")
    getDetail2();
  })
  $(".rent .rent-2 .selecte-detail").find("div:eq(6)").on("touchstart", function (params) {
    $('.rent .rent-2 .wrapper').empty();
    page2 = 1;
    $(".rent .rent-2 .selected-rent-more").text("");
    $(".rent .rent-2 .rent-more-clear").addClass("hide")
    getDetail2();
  })
  $(".mask").on("touchstart", function () {
    event.preventDefault();
    $(".collapse-content").addClass("hide")
    $(this).addClass("hide");
  })

  // 出售页面逻辑控制

});


// 处理数据方法
function dealWith(val) {
  switch (val) {
    case '1室':
      val = '一室';
      break;
    case '2室':
      val = '二室';
      break;
    case '3室':
      val = '三室';
      break;
    case '4室':
      val = '四室';
      break;
    case '5室':
      val = '五室';
      break;
    default:
      break;
  }
  return val
}
// 接口请求
var page1 = 1;

function getDetail1(params) {
  var parmarm = handleParams1();
  parmarm.page = page1;
  $.ajax({
    url: CONFIG.loginByZst + 'ZST/house/getHouseData',
    type: 'POST',
    dataType: 'json',
    data: parmarm,
    success: function (res) {
      page1 += 1;
      if (res.data && res.data.length > 0) {
        var dataArr = res.data;
        appendDiv1(dataArr);
      }
      var textContent = $('.rent .rent-1 .wrapper').html().trim("");
      if (!textContent) {
        $('.rent .rent-1 .wrapper').append('<div class="no-info"><img src="../../img/no-info.png" alt=""><div class="no-info-text">暂时没有您要的出租信息</div></div>')
      }
    }
  })
}

function handleParams1() {
  var params = {
    type: 1,
    price: $('.rent .rent-1 .selected-price').text().split("元")[0],
    town: $('.rent .rent-1 .selected-area').text(),
    sourceFrom: $('.rent .rent-1 .selected-source').text(),
    innerIntroduction: dealWith($('.rent .rent-1 .selected-room').text()),
  }
  for (var i in params) {
    if (params[i] === '' || params[i] === '不限') {
      delete params[i];
    }
  }
  return params;
}

var page2 = 1;

function getDetail2() {
  var parmarm = handleParams2();
  parmarm.page = page2;
  $.ajax({
    url: CONFIG.loginByZst + 'ZST/house/getHouseData',
    type: 'POST',
    dataType: 'json',
    data: parmarm,
    success: function (res) {
      page2 += 1;
      if (res.data && res.data.length > 0) {
        var dataArr = res.data;
        appendDiv2(dataArr);
      }
      var textContent = $('.rent .rent-2 .wrapper').html().trim("");
      if (!textContent) {
        $('.rent .rent-2 .wrapper').append('<div class="no-info"><img src="../../img/no-info.png" alt=""><div class="no-info-text">暂时没有您要的出租信息</div></div>')
      }
    }
  })
}
var distanceText = '';
// window.localStorage.latitude0 = 112;
// window.localStorage.longitude0 = 30;
function handleParams2() {
  var disss = getNeighStation({
    lat: window.localStorage.latitude0,
    lng: window.localStorage.longitude0,
    dis: distanceText
  });
  // alert(JSON.stringify(disss));
  var params = {
    type: 1,
    price: $('.rent .rent-2 .selected-price').text().split("元")[0],
    town: $('.rent .rent-2 .selected-area').text(),
    sourceFrom: $('.rent .rent-2 .selected-source').text(),
    innerIntroduction: dealWith($('.rent .rent-2 .selected-room').text()),
    lat: disss.minlat + "-" + disss.maxlat,
    lng: disss.minlng + "-" + disss.maxlng
  }
  for (var i in params) {
    if (params[i] === '' || params[i] === '不限' || params[i] === 'NaN-NaN') {
      delete params[i];
    }
  }
  return params;
}