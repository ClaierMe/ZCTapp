function showPosList(a){var s=JSON.parse(localStorage.bike),e=_.filter(s,function(s){return _.includes(s.name,decodeURI(a.query))});console.log(e);var o="";if(e.length)for(var i=0;i<e.length;i++)o+='<div onclick="toCommonMap('+e[i].lng+", "+e[i].lat+')" class="pos-item"><div class="pos-head flex"><p class="pos-name">'+e[i].name+'</p><p class="pos-availBike">可借:<span class="red">'+e[i].availBike+'</span></p><p class="pos-capacity">可停:<span class="red">'+e[i].capacity+'</span></p></div><div class="pos-footer flex"><p><img src="../../img/location@3x.png">'+e[i].address+'</p><img class="collect" src="../../img/alreadycollected@3x.png"></div></div>';else o+='<div class="empty"><img src="../../img/record11@3x.png"><p class="empty-desc">没有找到你所需要的信息</p></div>';$(".search-container").append(o)}function toCommonMap(a,s){toMap({longitude:a,latitude:s,markType:"zsbike",marks:JSON.parse(localStorage.bike)})}$(function(){var a=parseQueryString(location.href);zct.showLoading({content:""}),showPosList(a),setTimeout(function(){zct.hideLoading()},1e3)});