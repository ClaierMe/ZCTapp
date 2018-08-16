$(document).ready(function () {
  // 出售页面逻辑控制
  $(".sell .sell-distance").on("touchstart", function () {
    var type = $(".sell .sell-distance-content").hasClass("hide");
    if (type) {
      $(".sell .collapse-content").removeClass("hide")
      $(".sell-distance-content").removeClass("hide");
      $(".sell-distance-content").siblings().addClass("hide");
      $(".mask").removeClass("hide");
      $(this).find(".comm-img").css("background-image", "url(../../img/arrowu.png)")
      $(this).siblings().find(".comm-img").css("background-image", "url(../../img/arrowd.png)")
    } else {
      $(".sell .collapse-content").addClass("hide")
      $(".sell .collapse-content").find("ul").addClass("hide");
      $(".mask").addClass("hide");
      $(this).find(".comm-img").css("background-image", "url(../../img/arrowd.png)")
    }
  })
  $(".sell .total-price").on("touchstart", function () {
    var type = $(".sell .total-price-content").hasClass("hide");
    if (type) {
      $(".sell .collapse-content").removeClass("hide")
      $(".sell .total-price-content").removeClass("hide");
      $(".sell .total-price-content").siblings().addClass("hide");
      $(".mask").removeClass("hide");
      $(this).find(".comm-img").css("background-image", "url(../../img/arrowu.png)")
      $(this).siblings().find(".comm-img").css("background-image", "url(../../img/arrowd.png)")
    } else {
      $(".sell .collapse-content").addClass("hide")
      $(".sell .collapse-content").find("ul").addClass("hide");
      $(".mask").addClass("hide");
      $(this).find(".comm-img").css("background-image", "url(../../img/arrowd.png)")
    }
  })
  $(".sell .area").on("touchstart", function () {
    var type = $(".sell .area-content").hasClass("hide");
    if (type) {
      $(".sell .collapse-content").removeClass("hide")
      $(".sell .area-content").removeClass("hide");
      $(".sell .area-content").siblings().addClass("hide");
      $(".mask").removeClass("hide");
      $(this).find(".comm-img").css("background-image", "url(../../img/arrowu.png)")
      $(this).siblings().find(".comm-img").css("background-image", "url(../../img/arrowd.png)")
    } else {
      $(".sell .collapse-content").addClass("hide")
      $(".sell .collapse-content").find("ul").addClass("hide");
      $(".mask").addClass("hide");
      $(this).find(".comm-img").css("background-image", "url(../../img/arrowd.png)")
    }
  })
  $(".sell .source").on("touchstart", function () {
    var type = $(".sell .source-content").hasClass("hide");
    if (type) {
      $(".sell .collapse-content").removeClass("hide")
      $(".sell .source-content").removeClass("hide");
      $(".sell .source-content").siblings().addClass("hide");
      $(".mask").removeClass("hide");
      $(this).find(".comm-img").css("background-image", "url(../../img/arrowu.png)")
      $(this).siblings().find(".comm-img").css("background-image", "url(../../img/arrowd.png)")
    } else {
      $(".sell .collapse-content").addClass("hide")
      $(".sell .collapse-content").find("ul").addClass("hide");
      $(".mask").addClass("hide");
      $(this).find(".comm-img").css("background-image", "url(../../img/arrowd.png)")
    }
  })
  $(".sell .sell-more").on("touchstart", function () {
    var type = $(".sell .sell-more-content").hasClass("hide");
    if (type) {
      $(".sell .collapse-content").removeClass("hide")
      $(".sell .sell-more-content").removeClass("hide");
      $(".sell .sell-more-content").siblings().addClass("hide");
      $(".mask").removeClass("hide");
      $(this).find(".comm-img").css("background-image", "url(../../img/arrowu.png)")
      $(this).siblings().find(".comm-img").css("background-image", "url(../../img/arrowd.png)")
    } else {
      $(".sell .collapse-content").addClass("hide")
      $(".sell .collapse-content").find("ul").addClass("hide");
      $(".mask").addClass("hide");
      $(this).find(".comm-img").css("background-image", "url(../../img/arrowd.png)")
    }
  })
  // 点击选中条件
  $(".sell-distance-content").find("li").on("click", function () {
    $('.sell .wrapper').empty();
    sellPage = 1;
    event.preventDefault();
    $(".sell-distance-content").addClass("hide");
    var content = $(this).text();
    $(".sell").find(".selected-sell-distance").text(content);
    $(".sell-distance-clear").removeClass("hide").css("margin-right", "10px");
    $(".mask").addClass("hide");
    getSellDetail();
  })
  $(".sell .area-content").find("li").on("click", function () {
    $('.sell .wrapper').empty();
    sellPage = 1;
    event.preventDefault();
    $(".sell .area-content").addClass("hide");
    var content = $(this).text();
    $(".sell").find(".selected-area").text(content);
    $(".sell .area-clear").removeClass("hide").css("margin-right", "10px");
    $(".mask").addClass("hide");
    getSellDetail();
  })
  $(".sell .source-content").find("li").on("click", function () {
    $('.sell .wrapper').empty();
    sellPage = 1;
    event.preventDefault();
    $(".sell .source-content").addClass("hide");
    var content = $(this).text();
    $(".sell").find(".selected-source").text(content);
    $(".sell .source-clear").removeClass("hide").css("margin-right", "10px");
    $(".mask").addClass("hide");
    getSellDetail();
  })
  $(".sell .total-price-content").find("li").on("click", function () {
    $('.sell .wrapper').empty();
    sellPage = 1;
    event.preventDefault();
    $(".sell .total-price-content").addClass("hide");
    var content = $(this).text();
    $(".sell").find(".selected-total-price").text(content);
    $(".sell .total-price-clear").removeClass("hide").css("margin-right", "10px");
    $(".mask").addClass("hide");
    getSellDetail();
  })
  // 点击更多相关操作
  $(".sell .sell-room-list").find("li").on("click", function (params) {
    console.log(666666);
    $(".sell-room-list").addClass("hide");
    var content = $(this).text();
    $(".sell-hall-room").find("span:eq(0)").text(content);
    $(".sell-hall-room").removeClass("hide");
    $(".sell-build-area").removeClass("hide");
    $(".sell .search").removeClass("hide");
    $(".sell .back").addClass("hide");
  })
  $(".sell .sell-build-list").find("li").on("click", function (params) {
    $(".sell-build-list").addClass("hide");
    var content = $(this).text();
    $(".sell-build-area").find("span:eq(0)").text(content);
    $(".sell-build-area").removeClass("hide");
    $(".sell-hall-room").removeClass("hide");
    $(".sell .search").removeClass("hide");
    $(".sell .back").addClass("hide");
  })
  //点击厅室条件
  $(".sell-hall-room").on("click", function () {
    console.log(888888);
    $(".sell-build-area").addClass("hide")
    $(this).addClass("hide");
    $(".sell .search").addClass("hide");
    $(".sell .back").removeClass("hide");
    $(".sell").find(".sell-room-list").removeClass("hide");
  })
  //点击面积条件
  $(".sell-build-area").on("click", function () {
    $(".sell").find(".sell-build-list").removeClass("hide");
    $(".sell-hall-room").addClass("hide")
    $(this).addClass("hide");
    $(".sell .search").addClass("hide");
    $(".sell .back").removeClass("hide");
  })
  $(".sell .back").on("click", function () {
    $(".sell-room-list").addClass("hide");
    $(".sell-build-list").addClass("hide");
    $(".sell-hall-room").removeClass("hide");
    $(".sell-build-area").removeClass("hide");
    $(".sell .search").removeClass("hide");
    $(".sell .back").addClass("hide");
  })
  $(".sell .search").on("click", function () {
    sellPage = 1;
    $('.sell .wrapper').empty();
    event.preventDefault();
    $(".sell-more-content").addClass("hide");
    var hallRoom = $(".sell-hall-room").find("span:eq(0)").text();
    var buildArea = $(".sell-build-area").find("span:eq(0)").text();
    $(".sell").find(".selected-room").text(hallRoom);
    $(".sell").find(".selected-building-room").text(buildArea);
    if (hallRoom != '') $(".sell .room-clear").removeClass("hide").css("margin-right", "10px");
    if (buildArea != '') $(".sell .building-room-clear").removeClass("hide").css("margin-right", "10px");
    $(".mask").addClass("hide");
    getSellDetail();
  })
  //清除删选条件
  $(".sell .selecte-detail").find("div:eq(1)").on("touchstart", function () {
    sellPage = 1;
    $('.sell .wrapper').empty();
    $(".sell .selected-sell-distance").text("");
    $(".sell .sell-distance-clear").addClass("hide")
    getSellDetail();
  })
  $(".sell .selecte-detail").find("div:eq(2)").on("touchstart", function () {
    sellPage = 1;
    $('.sell .wrapper').empty();
    $(".sell .selected-total-price").text("");
    $(".sell .total-price-clear").addClass("hide")
    getSellDetail();
  })
  $(".sell .selecte-detail").find("div:eq(3)").on("touchstart", function () {
    sellPage = 1;
    $('.sell .wrapper').empty();
    $(".sell .selected-area").text("");
    $(".sell .area-clear").addClass("hide")
    getSellDetail();
  })
  $(".sell .selecte-detail").find("div:eq(4)").on("touchstart", function () {
    sellPage = 1;
    $('.sell .wrapper').empty();
    $(".sell .selected-source").text("");
    $(".sell .source-clear").addClass("hide")
    getSellDetail();
  })
  $(".sell .selecte-detail").find("div:eq(5)").on("touchstart", function () {
    sellPage = 1;
    $('.sell .wrapper').empty();
    $(".sell .selected-room").text("");
    $(".sell .room-clear").addClass("hide")
    getSellDetail();
  })
  $(".sell .selecte-detail").find("div:eq(6)").on("touchstart", function () {
    sellPage = 1;
    $('.sell .wrapper').empty();
    $(".sell .selected-building-room").text("");
    $(".sell .building-room-clear").addClass("hide")
    getSellDetail();
  })
  $(".mask").on("touchstart", function () {
    event.preventDefault();
    $(".collapse-content").addClass("hide")
    $(this).addClass("hide");
  })

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
var sellPage = 1;

function getSellDetail() {
  var parmarm = handleParams();
  parmarm.page = sellPage;
  console.log(parmarm)
  $.ajax({
    url: CONFIG.loginByZst + 'ZST/house/getHouseData',
    type: 'POST',
    dataType: 'json',
    data: parmarm,
    success: function (res) {
      sellPage += 1;
      if (res.data && res.data.length > 0) {
        var dataArr = res.data;
        appendDiv(dataArr);
      }
      var textContent = $(".sell .wrapper").html().trim("");
      if (!textContent) {
        $('.sell .wrapper').append('<div class="no-info"><img src="../../img/no-info.png" alt=""><div class="no-info-text">暂时没有您要的出租信息</div></div>')
      }
    }
  })
}

function handleParams() {
  var params = {
    type: 2,
    price: $('.sell .selected-price').text().split("元")[0],
    town: $('.sell .selected-area').text(),
    sourceFrom: $('.sell .selected-source').text(),
    innerIntroduction: dealWith($('.selected-room').text()),
    totalPrice: $('.sell .selected-total-price').text().split("万")[0],
    space: $('.sell .selected-building-room').text().split("米")[0],
  }
  var disText = $(".selected-sell-distance").text().split("米")[0];
  if (disText) {
    var disss = getNeighStation({
      lat: window.localStorage.latitude0,
      lng: window.localStorage.longitude0,
      dis: disText
    });
    params.lat = disss.minlat + "-" + disss.maxlat;
    params.lng = disss.minlng + "-" + disss.maxlng;
  }
  for (var i in params) {
    if (params[i] === '' || params[i] === '不限') {
      delete params[i];
    }
  }
  return params;
}

function appendDiv(dataArr) {
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
  $('.sell .wrapper').append(div);
  div = '';
}