//返回需挂失补办的卡号
function getReissue() {
    var form_data = $("#formData").serializeArray();
    // console.log(form_data);
    var values = {};
    for (x in form_data) {
        values[form_data[x].name] = form_data[x].value;
    }
    // console.log(values)
    $.ajax({
        url: CONFIG.getLineInfoAndCardInfo + 'realtimebus/query/cardManagerService/getAsnByNameAndID',
        // url: 'http://113.106.3.65:4440/realtimebus/query/cardManagerService/getAsnByNameAndID',
        type: 'POST',
        dataType: 'json',
        data: values,
        success: function (res) {
            // alert(JSON.stringify(res));
            var asnArr = res.asn;
            // alert(asnArr);
            if (asnArr) {
                var len = asnArr.length;
                for (var i = 0; i < len; i++) {
                    var asn = asnArr[0]; //拿到原卡号中的第一位
                    window.localStorage.elderCardID1 = asn;
                    window.location.href = "/views/recordInfo.html";
                }
            } else {
                window.yl.call("alert", {
                    title: "温馨提示",
                    content: "无该用户可挂失卡信息",
                    buttonText: "确定"
                })
            }
        }
    })
}
//实现开关按钮功能
function swithRadio() {
    var inpRadioLabs = $('.inp-radio label');
    var len = inpRadioLabs.length;
    for (var i = 0; i < len; i++) {
        inpRadioLabs[i].onclick = function () {
            for (var j = 0; j < len; j++) {
                inpRadioLabs[j].className = '';
            }
            this.className = ' inp-radio-active';
        }
    }
}

function isCardNo(card) {
    // 身份证号码为18位，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
    var reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(card) === false) {
        window.yl.call("alert", {
            title: "温馨提示",
            content: "请输入正确的身份证号",
            buttonText: "确定"
        })
        return;
    }
}

function checkBtn() {
    var userID = $('.id-card').val();
    var name = $('.user-name').val();
    if ((name !== '') && (/(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(userID) === true)) {
        $("#next1").css("background-color", "#0079C5");
        $("#next1").removeAttr("disabled")
    } else {
        $("#next1").css("background-color", "#92CDF2");
        $("#next1").attr("disabled", "disabled");
    }
}

$(function () {
    // $('.user-name').val('卢鸠有')
    // $('.id-card').val('440620193610114675')
    $('.id-card').val('');
    $('.user-name').val('');
    swithRadio();
    $("#next1").on("click", function () {
        var userID = $('.id-card').val();
        var name = $('.user-name').val();
        window.localStorage.name = name; //获取用户姓名

        isCardNo(userID);
        if (name === '') {
            window.yl.call("alert", {
                title: "温馨提示",
                content: "请输入姓名",
                buttonText: "确定"
            })
            return;
        }
        getReissue();
    });
})