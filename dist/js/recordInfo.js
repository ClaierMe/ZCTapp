$(function(){$("#picker").picker({title:"",cols:[{textAlign:"center",values:["石岐区","东区","南区","西区","港口镇","火炬开发区","南朗镇","民众镇","三角镇","黄圃镇","南头镇","阜沙镇","东凤镇","小榄镇","古镇镇","东升镇","沙溪镇","大涌镇","横栏镇","板芙镇","神湾镇","坦洲镇","三乡镇","五桂山镇"]}],onChange:function(e,n,t){},onClose:function(e,n,t){}});var e,n,t=window.localStorage;t.phone="",t.location="",t.needSend=!1,t.isSpecialCard=!1,t.mailMoney=0,$(".elder1").on("touchstart",function(){$(".elder1").addClass("inp-radio-active"),$(".elder2").removeClass("inp-radio-active"),$(".mail-city").hide(),$(".mail-money").hide(),t.needSend=!1,t.mailMoney=0,$(".mail-money-insert").text(t.mailMoney),$(".all-money-insert").text(15+parseInt(t.mailMoney))}),$(".elder2").on("touchstart",function(){$(".elder2").addClass("inp-radio-active"),$(".elder1").removeClass("inp-radio-active"),t.needSend=!0,t.mailMoney=10,$(".mail-money-insert").text(t.mailMoney),$(".all-money-insert").text(15+parseInt(t.mailMoney)),$(".mail-city").show(),$(".mail-money").show(),"true"===t.isSpecialCard&&(t.mailMoney=0,$(".mail-money").hide(),$(".mail-money-insert").text(t.mailMoney),$(".all-money-insert").text(15+parseInt(t.mailMoney)))}),$(".switch-inp").on("click",function(){t.isSpecialCard=$(".switch-inp").prop("checked"),"true"===t.isSpecialCard?($(".inp-brand-id").show(),$(".mail-money").hide(),t.mailMoney=0,$(".mail-money-insert").text(t.mailMoney),$(".all-money-insert").text(15+parseInt(t.mailMoney))):($(".inp-brand-id").hide(),$(".mail-money").show(),t.mailMoney=10,$(".mail-money-insert").text(t.mailMoney),$(".all-money-insert").text(15+parseInt(t.mailMoney)))}),$(".user-id-insert").text(window.localStorage.elderCardID1),$(".user-name-insert").text(window.localStorage.name),$(".user-money-insert").text(15),$(".phone-num").on("blur",function(){e=$(".phone-num").val();!1===/^1[0-9]{10}$/.test(e)?$.alert({title:"温馨提示",text:"请输入正确的手机号码",onOK:function(){$("#next1").css("backgroundColor","#0079C5")}}):$("#next2").css("backgroundColor","#0079C5")}),$(".phone-num").on("input",function(){$(".phone-num").val().length>=11&&$("#next2").css("backgroundColor","#0079C5")}),$("#next2").on("touchstart",function(){$(this).css("backgroundColor","#00629f"),n="广东省中山市"+$("#picker").val()+$(".street-adr").val(),t.location=n,t.allMoney=$(".all-money-insert").text(),t.phone=e,$.confirm({title:"温馨提示",text:"请确认信息填写无误，提交后将不能修改，是否继续？",onOK:function(){window.location.href="/views/lastPay.html"},onCancel:function(){}})}),$("#next2").on("touchend",function(){$(this).css("backgroundColor","#0079C5")})});