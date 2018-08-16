var picture = document.getElementsByClassName("picture");
var input = document.getElementsByClassName("inputstyle");
var filearr = [];


input[0].addEventListener('change', readFile, false);

//获取图片
function readFile() {

    if (picture[0].children.length + this.files.length > 4) {
        alert("大于四张");
        return;
    }

    for (var i = 0; i < this.files.length; i++) {

        if (this.files[i].size / 1024 > 10000) {
            alert("大于10mb");
            break;
        }

        var fileExt = this.files[i].name.substring(this.files[i].name.lastIndexOf(".")).toLowerCase();
        if (!fileExt.match(/.jpg|.png/i)) {
            alert("请上传jpg/png文件");
            return;
        }


        filearr.push(this.files[i]);

        var reader = new FileReader();
        reader.readAsDataURL(this.files[i]);
        reader.onload = function (e) {
            picture[0].innerHTML = picture[0].innerHTML + '<div class="imgcont" style="float:left;position:relative"><img class="showimg" src="' + this.result + '" alt="" data-preview-src="" data-preview-group="1"/><img src="../img/cancel_delete_remove.png" class="delete" onclick="del(this)" /></div>'
            var childnum = picture[0].children.length;
            //console.log(this.result);
            document.getElementsByClassName("txt")[0].innerHTML = '<span>上传图片</span> ' + childnum + '/4';

            var tmp = document.getElementsByClassName('imgcont')[0];
            var inputcontrol = document.getElementById("moveinput");
            inputcontrol.style.marginLeft = Number(inputcontrol.style.marginLeft.replace("px", "")) + tmp.offsetWidth + "px";
            if (picture[0].children.length >= 4)
                document.getElementById("moveinput").style.display = "none";
        }

    }

}


function del(obj) {
    var index = $(obj.parentNode).index();
    var tmp = document.getElementsByClassName('imgcont')[0];
    var inputcontrol = document.getElementById("moveinput");
    inputcontrol.style.marginLeft = Number(inputcontrol.style.marginLeft.replace("px", "")) - tmp.offsetWidth + "px";

    obj.parentNode.parentNode.removeChild(obj.parentNode);

    var num = picture[0].children.length
    if (num < 4)
        document.getElementById("moveinput").style.display = "block";

    document.getElementsByClassName("txt")[0].innerHTML = '<span>上传图片</span> ' + num + '/4';

    filearr.splice(index, 1);

}

//限制输入字数
var txt = document.getElementById("txt0");
var txtNum = document.getElementById("txtNum");
var chnIpt = false;
txt.addEventListener("keyup", function () {
    if (chnIpt == false) {
        countTxt();
    }
});
txt.addEventListener("compositionstart", function () {
    chnIpt = true;
})
txt.addEventListener("compositionend", function () {
    chnIpt = false;
    countTxt();
})

function countTxt() {
    if (chnIpt == false) {
        txtNum.textContent = txt.value.length;
    }
}

//文本域聚焦
txt.value = "请输入您的宝贵意见或建议。（最多输入200字）";
txt.onfocus = function () {
    if (this.value == '请输入您的宝贵意见或建议。（最多输入200字）') {
        this.value = "";
    }
}


//压缩图片
//参数：（原图src，图片类型，存放压缩图片的formdata，formdata提交时的文件名）
function compress(uncompressed, fileType, formdata, filename) {
    var image = new Image();
    image.src = uncompressed;

    var canvas = document.createElement('canvas');

    //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
    var ratio;
    if ((ratio = image.width * image.height / 4000000) > 1) {
        ratio = Math.sqrt(ratio);
        image.width /= ratio;
        image.height /= ratio;
    } else {
        ratio = 1;
    }

    canvas.width = image.width;
    canvas.height = image.height;

    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    //压缩图片（压缩质量可以根据实际情况调整）
    var newImage = canvas.toDataURL(fileType, 0.8);

    //转化成二进制文件数据并存入 FormData
    var blob = dataURItoBlob(newImage);
    formdata.append("img", blob, filename);
}

//base64 转 二进制文件
function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {
        type: mimeString
    });
}


/*
//一次上传多张图片
function uploadPic(){
    //var form_data = $("#ttest").serializeArray();
    var formData = new FormData();
    for(var i=0;i<filearr.length;i++){
        formData.append("img",filearr[i]);
    } 
    //var tem = formData.getAll("img");
    $.ajax({
        url:'http://113.106.3.65:8052/ZST/bicycleReport/uploadImage', 
        type:"POST", 
        data: formData, 
        cache:false,
        processData:false,  
        contentType:false,
        success:function(response){  
            //根据返回结果指定界面操作
            alert("success");
            var res = response;
        },
        error: function(response) {
            alert("error");
            console.log('error');
        }
    })
}*/

//上传信息（建议、手机号、位置）
function uploadMessage() {
    var tipContent = '';
    if (txt.value == '请输入您的宝贵意见或建议。') {
        tipContent = '';
    } else {
        tipContent = txt.value;
    }
    var message = {
        'phone': '',
        'context': '',
        'location': ''
    }
    message.context = tipContent;

    //获取用户信息（包括手机号）
    zct.getAuthcode(function (authCode) {
        request({
            host: CONFIG.loginByZst,
            url: 'ZST/orienteering/loginByZst?authCode=' + authCode + "&systemId=" + window.sysInfo.systemId,
            type: 'GET'
        }, function (data) {
            //if (window.ENV === "dev") alert(JSON.stringify(data))
            localStorage.userInfo = JSON.stringify(data)

            //获取实时位置
            zct.getLocation(function (response) {
                message.phone = localStorage.userInfo.phone;

                message.location = response.latitude + ',' + response.longitude;
                //alert(message.location);
                var mesUrl = createURL(message);
                //console.log(message.context);
                //alert(mesUrl);

                request({
                    url: CONFIG.loginByZst + 'ZST/bicycleReport/save' + mesUrl,
                    type: "POST",
                    cache: false,
                    processData: false,
                    contentType: false
                }, function (response) {
                    //根据返回结果指定界面操作
                    var res = response;
                    if (res.result === '01') {
                        alert("上传建议成功！");
                        //报障成功后跳转指定页面
                        window.location.href = '../views/warrantySuccess.html';
                    }
                }, function (response) {
                    alert("上传信息失败");
                    console.log('error');
                })
            })
        })
    })
}

//上传图片
function uploadPic() {
    if (filearr.length === 0) {
        $.confirm({
            title: '温馨提示',
            text: '请您至少要上传图片哦',
            onOK: function () {},
            onCancel: function () {}
        });
        return;
    }
    //var form_data = $("#ttest").serializeArray();
    for (var i = 0; i < filearr.length; i++) {

        var imgsrc = document.getElementsByClassName("showimg")[i].src;
        var formData = new FormData();
        //var comfd = new FormData();
        //comfd.append("img",filearr[i]);

        if (filearr[i].size / 1024 > 500) {
            compress(imgsrc, filearr[i].type, formData, filearr[i].name);
        } else {
            formData.append("img", filearr[i]);
        }

        //测试压缩
        //var tmp = formData.getAll("img");
        //var tmp2 = comfd.getAll("img");

        request({
            host: CONFIG.loginByZst + 'ZST/bicycleReport/uploadImage',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            dataType: 'json',
            async: false
        }, function (data) {
            //alert('上传成功');
            alert(JSON.stringify(data))
            var res = data;
            if (res.result !== '01') {
                alert('上传图片失败');
                return;
            }
            if (i == filearr.length - 1) {
                uploadMessage();
            }
        }, function () {
            //提交失败自动执行的处理函数。
            alert("上传图片失败,请查看网络链接");
            console.log('error');
        })
    }

}


//右上角提交绑定事件（支付宝接口）
function ready(callback) {
    // 如果jsbridge已经注入则直接调用
    if (window.AlipayJSBridge) {
        callback && callback();
    } else {
        // 如果没有注入则监听注入的事件
        document.addEventListener('AlipayJSBridgeReady', callback, false);
    }
}

ready(function () {
    AlipayJSBridge.call('setOptionMenu', {
        title: '提交',
        redDot: '-1',
        color: '#ff5a6169', // 必须以＃开始ARGB颜色值
    });
    AlipayJSBridge.call('showOptionMenu');

    document.addEventListener('optionMenu', function () {
        //alert("右上角");
        uploadPic();
    }, false);

});

//监听返回
$(function () {
    zct.getAuthcode(function (res) {
        // alert(res)
        console.log(res)
    })
    pushHistory();

    //监听安卓物理返回
    window.addEventListener("popstate", function (e) { //回调函数中实现需要的功能
        /*
        //js
        var confirmm = confirm('您确定放弃报障事件吗？');
        if(confirmm){
            //单击确定触发
            window.history.back();
            //location.href='../views/busTransfer.html';  //在这里指定其返回的地址
            }else{
            //取消是触发,添加一个空连接
            pushHistory();
            };*/

        //jqueryweui.js
        $.confirm({
            title: '温馨提示',
            text: '您确定放弃报障事件吗？',
            onOK: function () {
                //点击确认
                //window.history.back();
                //window.location.href = '../views/bicycle/spot.html';

            },
            onCancel: function () {
                pushHistory();
            }
        });
    }, false);
});

function pushHistory() {
    var state = {
        title: "自行车报障",
        url: "../views/bikeMalfunction.html"
    };
    window.history.pushState(state, state.title, state.url);
}