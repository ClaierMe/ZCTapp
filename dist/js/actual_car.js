function GetQueryString(s){var i=new RegExp("(^|&)"+s+"=([^&]*)(&|$)"),a=window.location.search.substr(1).match(i);return null!=a?unescape(a[2]):null}function getLineInfo(s,i){window.yl.call("showLoading",{content:"正在加载中…",duration:15e3}),$.post(CONFIG.getLineInfoAndCardInfo+"realtimebus/query/queryService/getLineInfoAndCardInfo",{p0:s,p1:i},function(s){window.yl.call("hideLoading");var i={},a=(s=JSON.parse(s)).line,n=s.car,d=0,t=0,c="";for(d=0;d<n.length;d++)for(t=0;t<a.length;t++)parseInt(n[d].nextStationNo)==parseInt(a[t].stationCode)&&(i[a[t].no]||(i[a[t].no]=""),n[d].desc.indexOf("到站")>-1?i[a[t].no]+="到站":i[a[t].no]+="中途");for(t=0;t<a.length;t++)0==t?(c+="<div class='stopName' id='filstStop'>",i[1]?(c+="<div class='car_top'><img class='busStop' src='../img/rechargebox.png' alt='' /></div>",c+="<div class='car_middle'><img class='noneBusStop' src='../img/dianxuanzhong@3x.png' alt='' /></div>",c+="<div class='car_bottom'><span class='busIn'>"+a[t].stopName+"</span></div>"):(c+="<div class='car_top'></div>",c+="<div class='car_middle'><img class='noneBusStop' src='../img/dian@3x.png' alt='' /></div>",c+="<div class='car_bottom'><span>"+a[t].stopName+"</span></div>"),c+="</div>"):(c+="<div class='stopImg'>",i[""+(t+1)]?i[""+(t+1)].indexOf("到站")>-1?i[""+(t+1)].indexOf("中途")>-1?(c+="<div class='car_top'><img class='bus' src='../img/bus@3x.png' alt='' /></div>",c+="<div class='car_middle'>",c+="    <div class='car_img_line'></div>",c+="</div>",c+="<div class='car_bottom'></div>",c+="</div>",t==a.length-1?c+=" <div class='stopName' id='lastStop'>":c+=" <div class='stopName'>",c+="<div class='car_top'><img class='busStop' src='../img/rechargebox.png' alt='' /></div>",c+="<div class='car_middle'><img class='noneBusStop' src='../img/dianxuanzhong@3x.png' alt='' /></div>",c+="<div class='car_bottom'><span class='busIn'>"+a[t].stopName+"</span></div>",c+="</div>"):(c+=" <div class='car_top'></div>",c+=" <div class='car_middle'>",c+=" <div class='car_img_line'></div>",c+=" </div>",c+=" <div class='car_bottom'></div>",c+=" </div>",t==a.length-1?c+=" <div class='stopName' id='lastStop'>":c+=" <div class='stopName'>",c+="<div class='car_top'><img class='busStop' src='../img/rechargebox.png' alt='' /></div>",c+="<div class='car_middle'><img class='noneBusStop' src='../img/dianxuanzhong@3x.png' alt='' /></div>",c+="<div class='car_bottom'><span class='busIn'>"+a[t].stopName+"</span></div>",c+="</div>"):(c+="<div class='car_top'><img class='bus' src='../img/bus@3x.png' alt='' /></div>",c+="<div class='car_middle'>",c+="    <div class='car_img_line'></div>",c+="</div>",c+="<div class='car_bottom'></div>",c+="</div>",t==a.length-1?c+=" <div class='stopName' id='lastStop'>":c+=" <div class='stopName'>",c+=" <div class='car_top'></div>",c+=" <div class='car_middle'><img class='noneBusStop' src='../img/dian@3x.png' alt='' /></div>",c+=" <div class='car_bottom'><span>"+a[t].stopName+"</span></div>",c+=" </div>"):(c+=" <div class='car_top'></div>",c+=" <div class='car_middle'>",c+=" <div class='car_img_line'></div>",c+=" </div>",c+=" <div class='car_bottom'></div>",c+=" </div>",t==a.length-1?c+=" <div class='stopName' id='lastStop'>":c+=" <div class='stopName'>",c+=" <div class='car_top'></div>",c+=" <div class='car_middle'><img class='noneBusStop' src='../img/dian@3x.png' alt='' /></div>",c+=" <div class='car_bottom'><span>"+a[t].stopName+"</span></div>",c+=" </div>"));$(".car_content").html(c)})}$(function(){var s,i=decodeURI(GetQueryString("routeName"));if(i){var a="",n=1;$.post(CONFIG.getLineInfoAndCardInfo+"/realtimebus/query/queryService/getRouteCodeByLineName",{p0:i},function(i){i=(i=JSON.parse(i)).lines[0],s=i.routeCode,$(document).attr("title",i.routeName);var d=i.description.split("开往"),t=i.runTime.split("-");a+="<div class='car_line_info'>",a+="        <div class='car_info_first'>",a+="            <span>"+d[0]+"</span>",a+="            <div class='rightImg'><img src='../img/dirRight.png' alt='' /></div>",a+="            <span>"+d[1]+"</span>",a+="        </div>",a+="        <div class='car_info_normal'>",a+="            <span>首"+t[0]+"&nbsp;末"+t[1]+"&nbsp;"+i.lineType+"</span>",a+="        </div>",a+="        <div class='car_info_normal'>",a+="            <span>发车间隔："+i.intervalTime+"</span>",a+="        </div>",a+="    </div>",a+="    <div class='car_line_func'>",a+="        <button id='direction'>反向</button>",a+="        <button id='flash'>刷新</button>",a+="    </div>",$(".car_head").html(a),$("#direction").click(function(){n=1==n?2:1,$(".car_content").html(""),getLineInfo(s,n)}),$("#flash").click(function(){getLineInfo(s,n)}),getLineInfo(s,n),setInterval(function(){getLineInfo(s,n)},3e4)})}else window.yl.call("showToast",{content:"后台获取参数出错",duration:3e3})});