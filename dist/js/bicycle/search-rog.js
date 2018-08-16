$(function () {
    // alert(location.href)
    var urlObj = parseQueryString(location.href)
    zct.showLoading({
        content: ''
    })
    // zct.setTitleBarRightButton()
    showPosList(urlObj)
    setTimeout(function(){
        zct.hideLoading()
    }, 1000)
})

// 现实站点列表
function showPosList(obj) {
    var bike = JSON.parse(localStorage.bike)
    // 从已有数据做选择
    var posList = _.filter(bike, function (o) {
        return _.includes(o.name, decodeURI(obj.query))
    })
    console.log(posList)
    var html = ''
    if (posList.length) {
        for (var i = 0; i < posList.length; i++) {
            html += '<div onclick="toCommonMap(' + posList[i].lng + ', ' + posList[i].lat + ')" class="pos-item">' +
                '<div class="pos-head flex"><p class="pos-name">' + posList[i].name + '</p>' +
                '<p class="pos-availBike">可借:<span class="red">' + posList[i].availBike + '</span></p>' +
                '<p class="pos-capacity">可停:<span class="red">' + posList[i].capacity + '</span></p>' +
                '</div>' +
                '<div class="pos-footer flex"><p><img src="../../img/location@3x.png">' + posList[i].address + '</p>' +
                '<img class="collect" src="../../img/alreadycollected@3x.png">' +
                '</div>' +
                '</div>'
        }
    } else {
        html += '<div class="empty"><img src="../../img/record11@3x.png"><p class="empty-desc">没有找到你所需要的信息</p></div>'
    }
    
    $('.search-container').append(html)
}

function toCommonMap(lng, lat) {
    toMap({
        longitude: lng,
        latitude: lat,
        markType: 'zsbike',
        marks: JSON.parse(localStorage.bike) // 地点数组
    })
}