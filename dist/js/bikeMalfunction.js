var picture=document.getElementsByClassName("picture"),input=document.getElementsByClassName("inputstyle"),filearr=[];function readFile(){if(picture[0].children.length+this.files.length>4)alert("大于四张");else for(var e=0;e<this.files.length;e++){if(this.files[e].size/1024>1e4){alert("大于10mb");break}if(!this.files[e].name.substring(this.files[e].name.lastIndexOf(".")).toLowerCase().match(/.jpg|.png/i))return void alert("请上传jpg/png文件");filearr.push(this.files[e]);var t=new FileReader;t.readAsDataURL(this.files[e]),t.onload=function(e){picture[0].innerHTML=picture[0].innerHTML+'<div class="imgcont" style="float:left;position:relative"><img class="showimg" src="'+this.result+'" alt="" data-preview-src="" data-preview-group="1"/><img src="../img/cancel_delete_remove.png" class="delete" onclick="del(this)" /></div>';var t=picture[0].children.length;document.getElementsByClassName("txt")[0].innerHTML="<span>上传图片</span> "+t+"/4";var n=document.getElementsByClassName("imgcont")[0],i=document.getElementById("moveinput");i.style.marginLeft=Number(i.style.marginLeft.replace("px",""))+n.offsetWidth+"px",picture[0].children.length>=4&&(document.getElementById("moveinput").style.display="none")}}}function del(e){var t=$(e.parentNode).index(),n=document.getElementsByClassName("imgcont")[0],i=document.getElementById("moveinput");i.style.marginLeft=Number(i.style.marginLeft.replace("px",""))-n.offsetWidth+"px",e.parentNode.parentNode.removeChild(e.parentNode);var o=picture[0].children.length;o<4&&(document.getElementById("moveinput").style.display="block"),document.getElementsByClassName("txt")[0].innerHTML="<span>上传图片</span> "+o+"/4",filearr.splice(t,1)}input[0].addEventListener("change",readFile,!1);var txt=document.getElementById("txt0"),txtNum=document.getElementById("txtNum"),chnIpt=!1;function countTxt(){0==chnIpt&&(txtNum.textContent=txt.value.length)}function compress(e,t,n,i){var o=new Image;o.src=e;var a,r=document.createElement("canvas");(a=o.width*o.height/4e6)>1?(a=Math.sqrt(a),o.width/=a,o.height/=a):a=1,r.width=o.width,r.height=o.height,r.getContext("2d").drawImage(o,0,0,r.width,r.height);var l=dataURItoBlob(r.toDataURL(t,.8));n.append("img",l,i)}function dataURItoBlob(e){for(var t=atob(e.split(",")[1]),n=e.split(",")[0].split(":")[1].split(";")[0],i=new ArrayBuffer(t.length),o=new Uint8Array(i),a=0;a<t.length;a++)o[a]=t.charCodeAt(a);return new Blob([i],{type:n})}function uploadMessage(){var e="";e="请输入您的宝贵意见或建议。"==txt.value?"":txt.value;var t={phone:"",context:"",location:""};t.context=e,zct.getAuthcode(function(e){request({host:CONFIG.loginByZst,url:"ZST/orienteering/loginByZst?authCode="+e+"&systemId="+window.sysInfo.systemId,type:"GET"},function(e){localStorage.userInfo=JSON.stringify(e),zct.getLocation(function(e){t.phone=localStorage.userInfo.phone,t.location=e.latitude+","+e.longitude;var n=createURL(t);request({url:CONFIG.loginByZst+"ZST/bicycleReport/save"+n,type:"POST",cache:!1,processData:!1,contentType:!1},function(e){"01"===e.result&&(alert("上传建议成功！"),window.location.href="../views/warrantySuccess.html")},function(e){alert("上传信息失败"),console.log("error")})})})})}function uploadPic(){if(0!==filearr.length)for(var e=0;e<filearr.length;e++){var t=document.getElementsByClassName("showimg")[e].src,n=new FormData;filearr[e].size/1024>500?compress(t,filearr[e].type,n,filearr[e].name):n.append("img",filearr[e]),request({host:CONFIG.loginByZst+"ZST/bicycleReport/uploadImage",type:"POST",data:n,processData:!1,contentType:!1,dataType:"json",async:!1},function(t){alert(JSON.stringify(t)),"01"===t.result?e==filearr.length-1&&uploadMessage():alert("上传图片失败")},function(){alert("上传图片失败,请查看网络链接"),console.log("error")})}else $.confirm({title:"温馨提示",text:"请您至少要上传图片哦",onOK:function(){},onCancel:function(){}})}function ready(e){window.AlipayJSBridge?e&&e():document.addEventListener("AlipayJSBridgeReady",e,!1)}function pushHistory(){var e={title:"自行车报障",url:"../views/bikeMalfunction.html"};window.history.pushState(e,e.title,e.url)}txt.addEventListener("keyup",function(){0==chnIpt&&countTxt()}),txt.addEventListener("compositionstart",function(){chnIpt=!0}),txt.addEventListener("compositionend",function(){chnIpt=!1,countTxt()}),txt.value="请输入您的宝贵意见或建议。（最多输入200字）",txt.onfocus=function(){"请输入您的宝贵意见或建议。（最多输入200字）"==this.value&&(this.value="")},ready(function(){AlipayJSBridge.call("setOptionMenu",{title:"提交",redDot:"-1",color:"#ff5a6169"}),AlipayJSBridge.call("showOptionMenu"),document.addEventListener("optionMenu",function(){uploadPic()},!1)}),$(function(){zct.getAuthcode(function(e){console.log(e)}),pushHistory(),window.addEventListener("popstate",function(e){$.confirm({title:"温馨提示",text:"您确定放弃报障事件吗？",onOK:function(){},onCancel:function(){pushHistory()}})},!1)});