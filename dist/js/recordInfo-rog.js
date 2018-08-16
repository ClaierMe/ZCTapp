$(function () {

  //地址弹出框
  $("#picker").picker({
    title: "",
    cols: [{
      textAlign: 'center',
      values: ['石岐区', '东区', '南区', '西区', '港口镇', '火炬开发区', '南朗镇', '民众镇', '三角镇', '黄圃镇', '南头镇', '阜沙镇', '东凤镇', '小榄镇', '古镇镇', '东升镇', '沙溪镇', '大涌镇', '横栏镇', '板芙镇', '神湾镇', '坦洲镇', '三乡镇', '五桂山镇']
    }],
    onChange: function (p, v, dv) {
      // console.log(p, v, dv);
    },
    onClose: function (p, v, d) {
      // console.log("close");
    }
  });

  //初始值
  var userMoney = 15;
  var specialCard;
  var phoneNum;
  var mailAdress;

  var storage = window.localStorage;
  storage.phone = '';
  storage.location = '';
  storage.needSend = false;
  storage.isSpecialCard = false;
  storage.mailMoney = 0;

  // 自取
  $(".elder1").on("touchstart", function () {
    $(".elder1").addClass("inp-radio-active");
    $(".elder2").removeClass("inp-radio-active");
    $(".mail-city").hide();
    $(".mail-money").hide();
    storage.needSend = false;
    storage.mailMoney = 0;
    $('.mail-money-insert').text(storage.mailMoney);
    $('.all-money-insert').text(userMoney + parseInt(storage.mailMoney));
  })
  //邮寄
  $(".elder2").on("touchstart", function () {
    $(".elder2").addClass("inp-radio-active");
    $(".elder1").removeClass("inp-radio-active");
    storage.needSend = true;
    storage.mailMoney = 10;
    $('.mail-money-insert').text(storage.mailMoney);
    $('.all-money-insert').text(userMoney + parseInt(storage.mailMoney));
    $(".mail-city").show();
    $(".mail-money").show();
    if (storage.isSpecialCard === 'true') {
      storage.mailMoney = 0;
      $('.mail-money').hide();
      $('.mail-money-insert').text(storage.mailMoney);
      $('.all-money-insert').text(userMoney + parseInt(storage.mailMoney));
    }
  })
  //判断是否有广发自在卡
  $(".switch-inp").on('click', function () {
    storage.isSpecialCard = $(".switch-inp").prop('checked');
    if (storage.isSpecialCard === 'true') {
      $('.inp-brand-id').show();
      $('.mail-money').hide();
      storage.mailMoney = 0;
      $('.mail-money-insert').text(storage.mailMoney);
      $('.all-money-insert').text(userMoney + parseInt(storage.mailMoney));
    } else {
      $('.inp-brand-id').hide();
      $('.mail-money').show();
      storage.mailMoney = 10;
      $('.mail-money-insert').text(storage.mailMoney);
      $('.all-money-insert').text(userMoney + parseInt(storage.mailMoney));
    }
  })

  //插入数据
  $('.user-id-insert').text(window.localStorage.elderCardID1);
  $('.user-name-insert').text(window.localStorage.name);
  $('.user-money-insert').text(userMoney);

  //验证手机号
  $('.phone-num').on('blur', function () {
    phoneNum = $(".phone-num").val();
    var reg = /^1[0-9]{10}$/;
    if (reg.test(phoneNum) === false) {
      $.alert({
        title: '温馨提示',
        text: '请输入正确的手机号码',
        onOK: function () {
          //点击确认
          $("#next1").css('backgroundColor','#0079C5');
        }
      });
    }else {
      $('#next2').css('backgroundColor','#0079C5');
    }
  })
  $('.phone-num').on("input",function() {
    if($(".phone-num").val().length >=11) {
      $("#next2").css('backgroundColor','#0079C5');
    }
  })

  // //验证是否有广发卡
  // $('.special-card').on('blur', function () {
  //   storage.SpecialCard = $('.special-card').val();
  //   if (storage.isSpecialCard === 'true') {
  //     request({
  //       host: 'http://113.106.3.65:8052',
  //       url: '/ZST/oldCard/checkCard',
  //       type: 'POST',
  //       data:{
  //         specialCard:parseInt(storage.SpecialCard)
  //       }
  //     }, function (res) {
  //       alert(res.result);
  //       if (res == 01) {
  //         $.alert({
  //           title: '温馨提示',
  //           text: '验证成功',
  //           onOK: function () {
  //             //点击确认
  //           }
  //         });
  //       } else if (res == 04) {
  //         $.alert({
  //           title: '温馨提示',
  //           text: '非广发自在卡，请查看是否输入正确',
  //           onOK: function () {
  //             //点击确认
  //           }
  //         });
  //       }
  //     });
  //   }
  // })

  //点击下一步
  $("#next2").on('touchstart', function () {
    $(this).css('backgroundColor','#00629f');
    // 获取数据
    mailAdress = '广东省中山市' + $('#picker').val() + $('.street-adr').val();
    //存储数据
    storage.location = mailAdress;
    storage.allMoney = $('.all-money-insert').text();
    storage.phone = phoneNum; //预留手机号

    $.confirm({
      title: '温馨提示',
      text: '请确认信息填写无误，提交后将不能修改，是否继续？',
      onOK: function () {
        //点击确认
        window.location.href = '/views/lastPay.html';
      },
      onCancel: function () { 
      }
    });
  })
  $("#next2").on("touchend",function() {
    $(this).css('backgroundColor','#0079C5');
  })

})