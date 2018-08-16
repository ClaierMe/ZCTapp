$(function () {
    // alert(location.href)
    var urlObj = parseQueryString(location.href)
    zct.showLoading({
        content: ''
    })
    // zct.setTitleBarRightButton()
    showPosList(urlObj)
    setTimeout(function () {
        zct.hideLoading()
    }, 1000)
})

// 现实站点列表
function showPosList(obj) {
    var bike = JSON.parse(localStorage.siteList)
    // 从已有数据做选择
    var siteList = _.filter(bike, function (o) {
        return _.includes(o.name, decodeURI(obj.query))
    }), hidden = pic = ''
    console.log(siteList)

    var html = '', saveSiteList = localStorage.saveSiteList ? JSON.parse(localStorage.saveSiteList) : []

    if (siteList.length) {
        for (var i = 0; i < siteList.length; i++) {
            if (siteList[i].name === '') hidden = 'none'
            else hidden = ''

            if (!_.includes(saveSiteList.idList, +siteList[i].id)) pic = '../../img/collection@3x.png'
            else pic = '../../img/alreadycollected@3x.png'

            html += '<div onclick="toCommonMap(' + siteList[i].lng + ', ' + siteList[i].lat + ')" class="site-item" style="display:' + hidden + '"  data="' + siteList[i].name + '">' +
                '<div class="site-head flex flex-column"><div class="site-name">' + siteList[i].name + '</div>' +
                '<div class="flex" style="width:100%;">' +
                '<p class="site-availBike">类型:' + siteList[i].site_type + '</p>' +
                '<p class="site-capacity">' + siteList[i].phone + '</p>' +
                '</div>' +
                '<div class="site-footer flex"><p><img src="../../img/location@3x.png">' + siteList[i].address + '</p>' +
                '<div class="collect-pic"><img id="pic' + siteList[i].id + '" class="collect" src="' + pic + '"></div>' +
                '</div>' +
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
        longitude: lng.toString(),
        latitude: lat.toString(),
        markType: 'zswd',
        marks: JSON.parse(localStorage.siteList) // 地点数组
    })
}