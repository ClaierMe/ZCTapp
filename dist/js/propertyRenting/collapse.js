function dealWith(e){switch(e){case"1室":e="一室";break;case"2室":e="二室";break;case"3室":e="三室";break;case"4室":e="四室";break;case"5室":e="五室"}return e}$(document).ready(function(){$(".rent .rent-1 .price").on("touchstart",function(){$(".rent .rent-1 .price-content").hasClass("hide")?($(".rent .rent-1 .collapse-content").removeClass("hide"),$(".rent .rent-1 .price-content").removeClass("hide"),$(".rent .rent-1 .price-content").siblings().addClass("hide"),$(".mask").removeClass("hide"),$(this).find(".comm-img").css("background-image","url(../../img/arrowu.png)"),$(this).siblings().find(".comm-img").css("background-image","url(../../img/arrowd.png)")):($(".rent .rent-1 .collapse-content").addClass("hide"),$(".rent .rent-1 .collapse-content").find("ul").addClass("hide"),$(".mask").addClass("hide"),$(this).find(".comm-img").css("background-image","url(../../img/arrowd.png)"))}),$(".rent .rent-1 .area").on("touchstart",function(){$(".rent .rent-1 .area-content").hasClass("hide")?($(".rent .rent-1 .collapse-content").removeClass("hide"),$(".rent .rent-1 .area-content").removeClass("hide"),$(".rent .rent-1 .area-content").siblings().addClass("hide"),$(".mask").removeClass("hide"),$(this).find(".comm-img").css("background-image","url(../../img/arrowu.png)"),$(this).siblings().find(".comm-img").css("background-image","url(../../img/arrowd.png)")):($(".rent .rent-1 .collapse-content").addClass("hide"),$(".rent-1 .collapse-content").find("ul").addClass("hide"),$(".mask").addClass("hide"),$(this).find(".comm-img").css("background-image","url(../../img/arrowd.png)"))}),$(".rent .rent-1 .source").on("touchstart",function(){$(".rent .rent-1 .source-content").hasClass("hide")?($(".rent .rent-1 .collapse-content").removeClass("hide"),$(".rent .rent-1 .source-content").removeClass("hide"),$(".rent .rent-1 .source-content").siblings().addClass("hide"),$(".mask").removeClass("hide"),$(this).find(".comm-img").css("background-image","url(../../img/arrowu.png)"),$(this).siblings().find(".comm-img").css("background-image","url(../../img/arrowd.png)")):($(".rent .rent-1 .collapse-content").addClass("hide"),$(".rent-1 .collapse-content").find("ul").addClass("hide"),$(".mask").addClass("hide"),$(this).find(".comm-img").css("background-image","url(../../img/arrowd.png)"))}),$(".rent .rent-1 .room").on("touchstart",function(){$(".rent .rent-1 .room-content").hasClass("hide")?($(".rent .rent-1 .collapse-content").removeClass("hide"),$(".rent .rent-1 .room-content").removeClass("hide"),$(".rent .rent-1 .room-content").siblings().addClass("hide"),$(".mask").removeClass("hide"),$(this).find(".comm-img").css("background-image","url(../../img/arrowu.png)"),$(this).siblings().find(".comm-img").css("background-image","url(../../img/arrowd.png)")):($(".rent .rent-1 .collapse-content").addClass("hide"),$(".rent-1 .collapse-content").find("ul").addClass("hide"),$(".mask").addClass("hide"),$(this).find(".comm-img").css("background-image","url(../../img/arrowd.png)"))}),$(".rent .rent-more").on("touchstart",function(){$(".rent .rent-more-content").hasClass("hide")?($(".rent-2 .collapse-content").removeClass("hide"),$(".rent-2 .rent-more-content").removeClass("hide"),$(".rent-2 .rent-more-content").siblings().addClass("hide"),$(".rent-2 .mask").removeClass("hide"),$(this).find(".comm-img").css("background-image","url(../../img/arrowu.png)"),$(this).siblings().find(".comm-img").css("background-image","url(../../img/arrowd.png)")):($(".rent-2 .collapse-content").addClass("hide"),$(".rent-2 .collapse-content").find("ul").addClass("hide"),$(".mask").addClass("hide"),$(this).find(".comm-img").css("background-image","url(../../img/arrowd.png)"))}),$(".rent .rent-2 .price").on("touchstart",function(){$(".rent-2 .price-content").hasClass("hide")?($(".rent .rent-2 .collapse-content").removeClass("hide"),$(".rent .rent-2 .price-content").removeClass("hide"),$(".rent .rent-2 .price-content").siblings().addClass("hide"),$(".mask").removeClass("hide"),$(this).find(".comm-img").css("background-image","url(../../img/arrowu.png)"),$(this).siblings().find(".comm-img").css("background-image","url(../../img/arrowd.png)")):($(".rent-2 .collapse-content").addClass("hide"),$(".rent-2 .collapse-content").find("ul").addClass("hide"),$(".mask").addClass("hide"),$(this).find(".comm-img").css("background-image","url(../../img/arrowd.png)"))}),$(".rent .rent-2 .area").on("touchstart",function(){$(".rent-2 .area-content").hasClass("hide")?($(".rent .rent-2 .collapse-content").removeClass("hide"),$(".rent .rent-2 .area-content").removeClass("hide"),$(".rent .rent-2 .area-content").siblings().addClass("hide"),$(".mask").removeClass("hide"),$(this).find(".comm-img").css("background-image","url(../../img/arrowu.png)"),$(this).siblings().find(".comm-img").css("background-image","url(../../img/arrowd.png)")):($(".rent-2 .collapse-content").addClass("hide"),$(".rent-2 .collapse-content").find("ul").addClass("hide"),$(".mask").addClass("hide"),$(this).find(".comm-img").css("background-image","url(../../img/arrowd.png)"))}),$(".rent .rent-2 .source").on("touchstart",function(){$(".rent-2 .source-content").hasClass("hide")?($(".rent .rent-2 .collapse-content").removeClass("hide"),$(".rent .rent-2 .source-content").removeClass("hide"),$(".rent .rent-2 .source-content").siblings().addClass("hide"),$(".mask").removeClass("hide"),$(this).find(".comm-img").css("background-image","url(../../img/arrowu.png)"),$(this).siblings().find(".comm-img").css("background-image","url(../../img/arrowd.png)")):($(".rent-2 .collapse-content").addClass("hide"),$(".rent-2 .collapse-content").find("ul").addClass("hide"),$(".mask").addClass("hide"),$(this).find(".comm-img").css("background-image","url(../../img/arrowd.png)"))}),$(".rent .rent-2 .distance").on("touchstart",function(){$(".rent-2 .distance-content").hasClass("hide")?($(".rent .rent-2 .collapse-content").removeClass("hide"),$(".rent .rent-2 .distance-content").removeClass("hide"),$(".distance-content").siblings().addClass("hide"),$(".mask").removeClass("hide"),$(this).find(".comm-img").css("background-image","url(../../img/arrowu.png)"),$(this).siblings().find(".comm-img").css("background-image","url(../../img/arrowd.png)")):($(".rent-2 .collapse-content").addClass("hide"),$(".rent-2 .collapse-content").find("ul").addClass("hide"),$(".mask").addClass("hide"),$(this).find(".comm-img").css("background-image","url(../../img/arrowd.png)"))}),$(".rent .rent-1 .price-content").find("li").on("click",function(){$(".rent .rent-1 .wrapper").empty(),page1=1,event.preventDefault(),$(".rent .rent-1 .price-content").addClass("hide");var e=$(this).text();$(".rent .rent-1 .selected-content").find(".selected-price").text(e),$(".rent .rent-1 .price-clear").removeClass("hide").css("margin-right","10px"),$(".mask").addClass("hide"),getDetail1()}),$(".rent .rent-1 .area-content").find("li").on("click",function(){$(".rent .rent-1 .wrapper").empty(),page1=1,event.preventDefault(),$(".rent .rent-1 .area-content").addClass("hide");var e=$(this).text();$(".rent .rent-1  .selected-content").find(".selected-area").text(e),$(".rent .rent-1 .area-clear").removeClass("hide").css("margin-right","10px"),$(".mask").addClass("hide"),getDetail1()}),$(".rent .rent-1 .source-content").find("li").on("click",function(){$(".rent .rent-1 .wrapper").empty(),page1=1,event.preventDefault(),$(".rent .rent-1 .source-content").addClass("hide");var e=$(this).text();$(".rent .rent-1 .selected-content").find(".selected-source").text(e),$(".rent .rent-1 .source-clear").removeClass("hide").css("margin-right","10px"),$(".mask").addClass("hide"),getDetail1()}),$(".rent .rent-1 .room-content").find("li").on("click",function(){$(".rent .rent-1 .wrapper").empty(),page1=1,event.preventDefault(),$(".rent .rent-1 .room-content").addClass("hide");var e=$(this).text();$(".rent .rent-1 .selected-content").find(".selected-room").text(e),$(".rent .rent-1 .room-clear").removeClass("hide").css("margin-right","10px"),$(".mask").addClass("hide"),getDetail1()}),$(".rent .rent-2 .price-content").find("li").on("click",function(){$(".rent .rent-2 .wrapper").empty(),page2=1,event.preventDefault(),$(".rent .rent-2 .price-content").addClass("hide");var e=$(this).text();$(".rent .rent-2 .selected-content").find(".selected-price").text(e),$(".rent .rent-2 .price-clear").removeClass("hide").css("margin-right","10px"),$(".mask").addClass("hide"),getDetail2()}),$(".rent .rent-2 .area-content").find("li").on("click",function(){$(".rent .rent-2 .wrapper").empty(),page2=1,event.preventDefault(),$(".rent .rent-2 .area-content").addClass("hide");var e=$(this).text();$(".rent .rent-2  .selected-content").find(".selected-area").text(e),$(".rent .rent-2 .area-clear").removeClass("hide").css("margin-right","10px"),$(".mask").addClass("hide"),getDetail2()}),$(".rent .rent-2 .source-content").find("li").on("click",function(){$(".rent .rent-2 .wrapper").empty(),page2=1,event.preventDefault(),$(".rent .rent-2 .source-content").addClass("hide");var e=$(this).text();$(".rent .rent-2 .selected-content").find(".selected-source").text(e),$(".rent .rent-2 .source-clear").removeClass("hide").css("margin-right","10px"),$(".mask").addClass("hide"),getDetail2()}),$(".rent .rent-2 .distance-content").find("li").on("click",function(){$(".rent .rent-2 .wrapper").empty(),page2=1,event.preventDefault(),$(".rent .rent-2 .distance-content").addClass("hide"),distanceText=$(this).text(),$(".rent .rent-2 .selected-content").find(".selected-distance").text(distanceText),distanceText=distanceText.split("米")[0],$(".rent .rent-2 .distance-clear").removeClass("hide").css("margin-right","10px"),$(".mask").addClass("hide"),getDetail2()}),$(".rent-2 .rent-hall-room").on("touchstart",function(){$(".rent-2").find(".rent-room-list").removeClass("hide"),$(".rent-2 .rent-hall-room").addClass("hide"),$(".rent-2 .search").addClass("hide"),$(".rent-2 .back").removeClass("hide")}),$(".rent-2 .rent-room-list").find("li").on("touchstart",function(e){$(".rent-room-list").addClass("hide");var t=$(this).text();$(".rent-2 .rent-hall-room").find("span:eq(0)").text(t),$(".rent-2 .rent-hall-room").removeClass("hide"),$(".rent-2 .search").removeClass("hide"),$(".rent-2 .back").addClass("hide")}),$(".rent-2 .back").on("touchstart",function(){$(".rent-2 .rent-room-list").addClass("hide"),$(".rent-2 .rent-hall-room").removeClass("hide"),$(".rent-2 .search").removeClass("hide"),$(".rent-2 .back").addClass("hide")}),$(".rent-2 .search").on("touchstart",function(){$(".rent .rent-2 .wrapper").empty(),page2=1,event.preventDefault(),$(".rent-2 .rent-more-content").addClass("hide");var e=$(".rent-2 .rent-hall-room").find("span:eq(0)").text();$(".rent-2").find(".selected-room").text(e),""!=e&&$(".rent-2 .room-clear").removeClass("hide").css("margin-right","10px"),$(".mask").addClass("hide"),getDetail2()}),$(".rent .rent-1 .selecte-detail").find("div:eq(1)").on("touchstart",function(e){$(".rent .rent-1 .wrapper").empty(),page1=1,$(".rent .rent-1 .selected-price").text(""),$(".rent .rent-1 .price-clear").addClass("hide"),getDetail1()}),$(".rent .rent-1 .selecte-detail").find("div:eq(2)").on("touchstart",function(e){$(".rent .rent-1 .wrapper").empty(),page1=1,$(".rent .rent-1 .selected-area").text(""),$(".rent .rent-1 .area-clear").addClass("hide"),getDetail1()}),$(".rent .rent-1 .selecte-detail").find("div:eq(3)").on("touchstart",function(e){$(".rent .rent-1 .wrapper").empty(),page1=1,$(".rent .rent-1 .selected-source").text(""),$(".rent .rent-1 .source-clear").addClass("hide"),getDetail1()}),$(".rent .rent-1 .selecte-detail").find("div:eq(4)").on("touchstart",function(e){$(".rent .rent-1 .wrapper").empty(),page1=1,$(".rent .rent-1 .selected-room").text(""),$(".rent .rent-1 .room-clear").addClass("hide"),getDetail1()}),$(".rent .rent-2 .selecte-detail").find("div:eq(1)").on("touchstart",function(e){$(".rent .rent-2 .wrapper").empty(),page2=1,$(".rent .rent-2 .selected-distance").text(""),$(".rent .rent-2 .distance-clear").addClass("hide"),getDetail2()}),$(".rent .rent-2 .selecte-detail").find("div:eq(2)").on("touchstart",function(e){$(".rent .rent-2 .wrapper").empty(),page2=1,$(".rent .rent-2 .selected-price").text(""),$(".rent .rent-2 .price-clear").addClass("hide"),getDetail2()}),$(".rent .rent-2 .selecte-detail").find("div:eq(3)").on("touchstart",function(e){$(".rent .rent-2 .wrapper").empty(),page2=1,$(".rent .rent-2 .selected-area").text(""),$(".rent .rent-2 .area-clear").addClass("hide"),getDetail2()}),$(".rent .rent-2 .selecte-detail").find("div:eq(4)").on("touchstart",function(e){$(".rent .rent-2 .wrapper").empty(),page2=1,$(".rent .rent-2 .selected-source").text(""),$(".rent .rent-2 .source-clear").addClass("hide"),getDetail2()}),$(".rent .rent-2 .selecte-detail").find("div:eq(5)").on("touchstart",function(e){$(".rent .rent-2 .wrapper").empty(),page2=1,$(".rent .rent-2 .selected-room").text(""),$(".rent .rent-2 .room-clear").addClass("hide"),getDetail2()}),$(".rent .rent-2 .selecte-detail").find("div:eq(6)").on("touchstart",function(e){$(".rent .rent-2 .wrapper").empty(),page2=1,$(".rent .rent-2 .selected-rent-more").text(""),$(".rent .rent-2 .rent-more-clear").addClass("hide"),getDetail2()}),$(".mask").on("touchstart",function(){event.preventDefault(),$(".collapse-content").addClass("hide"),$(this).addClass("hide")})});var page1=1;function getDetail1(e){var t=handleParams1();t.page=page1,$.ajax({url:CONFIG.loginByZst+"ZST/house/getHouseData",type:"POST",dataType:"json",data:t,success:function(e){if(page1+=1,e.data&&e.data.length>0){var t=e.data;appendDiv1(t)}$(".rent .rent-1 .wrapper").html().trim("")||$(".rent .rent-1 .wrapper").append('<div class="no-info"><img src="../../img/no-info.png" alt=""><div class="no-info-text">暂时没有您要的出租信息</div></div>')}})}function handleParams1(){var e={type:1,price:$(".rent .rent-1 .selected-price").text().split("元")[0],town:$(".rent .rent-1 .selected-area").text(),sourceFrom:$(".rent .rent-1 .selected-source").text(),innerIntroduction:dealWith($(".rent .rent-1 .selected-room").text())};for(var t in e)""!==e[t]&&"不限"!==e[t]||delete e[t];return e}var page2=1;function getDetail2(){var e=handleParams2();e.page=page2,$.ajax({url:CONFIG.loginByZst+"ZST/house/getHouseData",type:"POST",dataType:"json",data:e,success:function(e){if(page2+=1,e.data&&e.data.length>0){var t=e.data;appendDiv2(t)}$(".rent .rent-2 .wrapper").html().trim("")||$(".rent .rent-2 .wrapper").append('<div class="no-info"><img src="../../img/no-info.png" alt=""><div class="no-info-text">暂时没有您要的出租信息</div></div>')}})}var distanceText="";function handleParams2(){var e=getNeighStation({lat:window.localStorage.latitude0,lng:window.localStorage.longitude0,dis:distanceText}),t={type:1,price:$(".rent .rent-2 .selected-price").text().split("元")[0],town:$(".rent .rent-2 .selected-area").text(),sourceFrom:$(".rent .rent-2 .selected-source").text(),innerIntroduction:dealWith($(".rent .rent-2 .selected-room").text()),lat:e.minlat+"-"+e.maxlat,lng:e.minlng+"-"+e.maxlng};for(var n in t)""!==t[n]&&"不限"!==t[n]&&"NaN-NaN"!==t[n]||delete t[n];return t}