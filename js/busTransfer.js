var outsetPoint = document.getElementById("outset");
var destinationPoint = document.getElementById("destination");
var btn = document.getElementsByClassName("inquiry")[0];


//outsetPoint.value="qq";
$(function(){
    //var lloc = zct.getLocation();
    if(destinationPoint.value ==='' || destinationPoint.value ==='终点位置：'){
        //btn.setAttribute("disabled","disabled");
        btn.style.backgroundColor = "#92CDF2";
    }
})


function chooseDes(obj){
    destinationPoint.value = obj.innerText;
    destinationPoint.name = obj.id;
    submitData();
}

function chooseOri(obj){
    outsetPoint.value = obj.innerText;
    outsetPoint.name = obj.id;
}

// function DesCallback(response){
//     if(response.type==2){
//         return;
//     }
//     if(response.type==1){
//         console.log(typeof(response.destination));
//         if(response.destination.length==1||typeof(response.destination)=='string'){
//             return;
//         }
//         var destination = response.destination;
//         var specDestination;
//         var latandlon;
//         for(var i =0;i<destination.length;i++){
//             specDestination=(destination[i].split("_"))[0];
//             latandlon=(destination[i].split("_"))[2];

//             var div = document.createElement("div");
//             var node = document.createTextNode(specDestination);
//             div.appendChild(node);
//             document.getElementById("specficDes").appendChild(div);
//             div.className = "desClass";
//             div.setAttribute("id",latandlon);
//             div.setAttribute("name",specDestination)
//             div.setAttribute("onclick","chooseDes(this)")
//         }
        
//     }
// }


//获取模糊目的地的推荐地点后查询
// function getDestination(this){
//     $("#specficDes").empty();

//     if(destinationPoint.value !='' || destinationPoint.value!='终点位置：'){
//         //btn.setAttribute("disabled","false");
//         btn.style.backgroundColor = "#0079c5";
//     }
//     if(destinationPoint.value=='' || destinationPoint.value=='终点位置：'){
//         //btn.setAttribute("disabled","disabled");
//         btn.style.backgroundColor = "#92CDF2";
//     }

//     var target;
//     if(this.id === 'outset'){
        
//     }else if(this.id === 'destination'){

//     }

//     queryTransfer(outsetPoint.value,destinationPoint.value,function(response){
//         if(response.type==2){
//             return;
//         }
//         if(response.type==1){
//             //console.log(typeof(response.destination));
//             if(response.destination.length==1||typeof(response.destination)=='string'){
//                 return;
//             }
//             var destination = response.destination;
//             var specDestination;
//             var latandlon;
            
//             var paragra = document.createElement("p");
//             var con = document.createTextNode("猜您想去:");
//             paragra.appendChild(con);
//             paragra.className = "prompt";
//             document.getElementById("specficDes").appendChild(paragra);

//             for(var i =0;i<destination.length;i++){
//                 specDestination=(destination[i].split("_"))[0];
//                 latandlon=(destination[i].split("_"))[2];
    
//                 var div = document.createElement("div");
//                 var node = document.createTextNode(specDestination);
//                 div.appendChild(node);
//                 document.getElementById("specficDes").appendChild(div);
//                 div.className = "desClass";
//                 div.setAttribute("id",latandlon);
//                 div.setAttribute("name",specDestination)
//                 div.setAttribute("onclick","chooseDes(this)")
//             }
            
//         }
//     });

// }

function getDestination(obj){
    $("#specficDes").empty();

    if(destinationPoint.value !='' || destinationPoint.value!='终点位置：'){
        //btn.setAttribute("disabled","false");
        btn.style.backgroundColor = "#0079c5";
    }
    if(destinationPoint.value=='' || destinationPoint.value=='终点位置：'){
        //btn.setAttribute("disabled","disabled");
        btn.style.backgroundColor = "#92CDF2";
    }

    var target;
    var start,end;
    if(obj.id === 'outset'){
        start = obj.value;
        end = '22.523775,113.3684';
    }else if(obj.id === 'destination'){
        start = '22.523775,113.3684';
        end = obj.value;
    }

    queryTransfer(start,end,function(response){
        if(response.type==2){
            return;
        }
        if(response.type==1){
            //console.log(typeof(response.destination));
            if((response.destination.length==1&&response.origin.length==1)||(typeof(response.destination)=='string'&&response.origin=='22.523775,113.3684')||(typeof(response.origin)=='string'&&response.destination=='22.523775,113.3684')){
                return;
            }
            var destination
            if(response.destination.length>=1&&typeof(response.destination)!='string'){
                destination = response.destination;
            }else if(response.origin.length>=1&&typeof(response.origin)!='string'){
                destination = response.origin;
            }
            //var destination = response.destination;
            var specDestination;
            var latandlon;
            
            var paragra = document.createElement("p");
            var con = document.createTextNode("猜您想去:");
            paragra.appendChild(con);
            paragra.className = "prompt";
            document.getElementById("specficDes").appendChild(paragra);

            for(var i =0;i<destination.length;i++){
                specDestination=(destination[i].split("_"))[0];
                latandlon=(destination[i].split("_"))[2];
    
                var div = document.createElement("div");
                var node = document.createTextNode(specDestination);
                div.appendChild(node);
                document.getElementById("specficDes").appendChild(div);
                div.className = "desClass";
                div.setAttribute("id",latandlon);
                div.setAttribute("name",specDestination)
                if(obj.id=='destination'){
                    div.setAttribute("onclick","chooseDes(this)")
                }else{
                    div.setAttribute("onclick","chooseOri(this)")
                }
            }
            
        }
    });

}


//处理起始地和目的地数据
function submitData(){

    var start,end;
    if(destinationPoint.name!=''){
        end = destinationPoint.name;
    }
    else{
        end = destinationPoint.value
    }

    if(end==''||end=='终点位置：'){
        $.confirm({
            title: '温馨提示',
            text: '请您输入终点位置',
            onOK: function () {
                //点击确认
                window.location.href = '/views/busTransfer.html';
            },
            onCancel: function () {
                window.location.href = '/views/busTransfer.html';
            }
        });
        return;
    }
    if(outsetPoint.value !== "" && outsetPoint.value !== "起始位置：我的位置"){
        if(outsetPoint.name==''){
            start = outsetPoint.value
        }else{
            start = outsetPoint.name
        }
        queryTransfer(start,end,function(response){
            if(response.type !== 2){
                $.confirm({
                    title: '没找到相关路线',
                    text: '可能是因为您输入的起始地或者目的地过于模糊哦',
                    onOK: function () {
                        //点击确认
                        //window.location.href = '/views/busTransfer.html';
                    },
                    onCancel: function () {
                        //window.location.href = '/views/busTransfer.html';
                    }
                });
                return;
                }

            else{
                if(response.plan == ''){
                    $.confirm({
                        title: '没找到相关路线',
                        text: '',
                        onOK: function () {
                            //点击确认
                            //window.location.href = '/views/busTransfer.html';
                        },
                        onCancel: function () {
                            //window.location.href = '/views/busTransfer.html';
                        }
                    });
                    return;
                }
                var plan = response.plan;
                sessionStorage.plan = JSON.stringify(plan);
                window.location.href = '../views/busTransferPlan.html';
            }

        })
    }else{
        zct.getLocation(function(res){
            //alert(res);
            outsetPoint.name = res.latitude + ',' + res.longitude;
            start = outsetPoint.name;
            //alert(start);
    
            queryTransfer(start,end,function(response){
                if(response.type!== 2){
                    $.confirm({
                        title: '没找到相关路线',
                        text: '可能是因为您输入的起始地或者目的地过于模糊哦',
                        onOK: function () {
                            //点击确认
                            //window.location.href = '/views/busTransfer.html';
                        },
                        onCancel: function () {
                            //window.location.href = '/views/busTransfer.html';
                        }
                    });
                    return;
                }
    
                else{
                    if(response.type == ''){
                        $.confirm({
                            title: '没找到相关路线',
                            text: '',
                            onOK: function () {
                                //点击确认
                                //window.location.href = '/views/busTransfer.html';
                            },
                            onCancel: function () {
                                //window.location.href = '/views/busTransfer.html';
                            }
                        });
                        return;
                    }
                    var plan = response.plan;
                    sessionStorage.plan = JSON.stringify(plan);
                    window.location.href = '../views/busTransferPlan.html';
                }
    
            })
        });
    }
}

//调接口查询换乘信息
function queryTransfer(p0,p1,callback){
    var loc = {
        'p0': '',
        'p1': ''
    }
    loc.p0 = p0;
    loc.p1 = p1;

    var locUrl = createURL(loc);
    console.log(loc.p0);

    $.ajax({
        url:CONFIG.getLineInfoAndCardInfo +'realtimebus/query/queryService/getTransit' + locUrl, 
        type:"GET", 
        //data: message,
        processData:false,  
        contentType:false,
        dataType:'json',
        async:true,
        success:function(response){  
            //根据返回结果指定界面操作
            //alert('success');
            callback(response);
        },
        error: function(response) {
            //alert("位置有误");
        }
    })
}

/*
var jsontmp = {"error":0,"type":2,"plan":["第1方案:(预计到达时间11:39:51)步行644米 从富华酒店a1站,乘k12路(东凤人民医院方向),经过6站,到小榄车站 步行1383米 ","第2方案:(预计到达时间11:45:00)步行631米 从富华酒店站,乘k13路(小榄(城区客运中心)方向),经过3站,到小榄大信站 步行536米 ","第3方案:(预计到达时间11:39:50)步行644米 从富华酒店a1站,乘k12路(东凤人民医院方向),经过6站,到小榄车站 步行291米 从小榄车站,乘301路(东锐工业区方向),经过2站,到升平中路站 步行122米 ","第4方案:(预计到达时间11:39:31)步行644米 从富华酒店a1站,乘k12路(东凤人民医院方向),经过5站,到城轨小榄站路口站 同站换乘 从城轨小榄站路口站,乘506路(小榄人民医院方向),经过6站,到升平中路站 步行127米 ","第5方案:(预计到达时间11:40:34)步行644米 从富华酒店a1站,乘k12路(东凤人民医院方向),经过6站,到小榄车站 步行281米 从小榄车站,乘518路(广福路方向),经过2站,到升平中路站 步行159米 "]};
var plan = jsontmp.plan;
for(var i=0;i<plan.length;i++){
    var para = document.createElement("p");
    var node = document.createTextNode(plan[i]);
    para.appendChild(node);
    document.getElementById("allPlan").appendChild(para);
}*/

