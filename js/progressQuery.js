$(function () {
    // window.localStorage.user = 18657769868; //模拟用户登录手机号
    var div = '';
    $.ajax({
        url: CONFIG.loginByZst + 'ZST/oldCard/getStatus',
        type: 'POST',
        data: {
            user: window.localStorage.user
        },
        dataType: 'json',
        success: function (response) {
            var res = response.data;
            if (res && res.length > 0) {
                for (var i = 0, len = res.length; i < len; i++) {
                    if (res[i].bNeedSend == true) {
                        res[i].bNeedSend = '是'
                    } else {
                        res[i].bNeedSend = '否'
                    }
                    divfor(res[i]);
                }
            } else {
                $('.container').append('<div class="no-record">您没有挂失补办记录</div>');
            }
        }
    });
})



function divfor(data) {
    div =
        '<div class="progress-query">' +
        '<div class="content-item">' +
        '<div class="con-item-left">预留电话</div>' +
        '<div class="con-item-right phone-num">' + data.phone + '</div>' +
        '</div>' +
        '<div class="content-item">' +
        '    <div class="con-item-left">卡片状态</div>' +
        '    <div class="con-item-right card-status">' + data.cardStatus + '</div>' +
        '</div>' +
        '<div class="content-item">' +
        '    <div class="con-item-left">是否邮寄</div>' +
        '    <div class="con-item-right need-send">' + data.bNeedSend + '</div>' +
        '</div>' +
        '<div class="content-item">' +
        '    <div class="con-item-left">邮寄地址</div>' +
        '    <div class="con-item-right need-send-insert">' + data.location + '</div>' +
        '</div>' +
        '<div class="content-item">' +
        '    <div class="con-item-left">挂失时间</div>' +
        '    <div class="con-item-right card-time">' + data.lockTime + '</div>' +
        '</div>' +
        '</div>'
    $('.container').append(div);
}