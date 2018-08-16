var page = 1,
    size = 12,
    count = 58,
    dis = 3000,
    zstData = [],
    mescroll, isFlag = true,
    saveSiteList = [],
    tmpList = [],
    type = 2,
    distanceList = [{
        value: "first",
        text: "3000米"
    }, {
        value: "second",
        text: "2000米"
    }, {
        value: "third",
        text: "1000米"
    }],
    sectionList = [{
        value: "first",
        text: "全部站点"
    }, {
        value: "second",
        text: "东区"
    }, {
        value: "third",
        text: "西区"
    }, {
        value: "fourth",
        text: "南区"
    }, {
        value: "fifth",
        text: "石岐山"
    }, {
        value: "six",
        text: "火炬区"
    }, {
        value: "secen",
        text: "古镇"
    }, {
        value: "eight",
        text: "三乡镇"
    }, {
        value: "nine",
        text: "港口镇"
    }, {
        value: "ten",
        text: "南头镇"
    }, {
        value: "eleven",
        text: "坦洲镇"
    }]

$(function () {
    zct.showLoading()

    // common.getUerInfo()
    setTimeout(function () {
        zct.hideLoading()
    }, 500)

    ajax({
        host: CONFIG.site + 'ZST/zstData/zstLocation.json',
        url: ''
    }, function (res) {
        // zstData = _.flatten(res)
        _.forEach(res, function (value, key) {
            zstData.push(value)
        })
        zstData = _.flatten(zstData)
        zstData = _.uniqBy(zstData, 'id')
        localStorage.siteList  = JSON.stringify(zstData)
        console.log(zstData)
        initScroll()
        initScrollData()
    })
    // console.log(_.now())
    // 获取当前位置
    zct.getLocation(function (res) {
        // alert(JSON.stringify(res))
        $('#menu-map').click(function () {
            toMap({
                longitude: res.longitude.toString(),
                latitude: res.latitude.toString(),
                markType: 'zswd',
                marks: zstData // 地点数组
            })
        })
    })

    // 监听tab切换
    listenTab()

    // 监听搜索
    listenSearch()
})

// 监听区域初始化
function initScroll() {
    mescroll = new MeScroll("mescroll", {
        //第一个参数"mescroll"对应上面布局结构div的id
        down: {
            use: false
        },
        up: {
            htmlNodata: '<p class="upwarp-nodata">-- 暂无更新数据 --</p>',
            offset: 50,
            isBounce: false,
            auto: false,
            isBoth: false,
            callback: initScrollData //上拉加载回调,简写callback:function(page){upCallback(page);}
        }
    })
}

// 初始化数据
function initScrollData() {
    if (type === 2) {
        showSection()
    } else if (type === 1) {
        filterNeighborhood()
    } else {
        showSave()
    }
}

mui.ready(function () {
    // 区域
    change2Section()

    change2Neighborhood()
})

// 切换到区域
function change2Section() {
    // initScroll()
    var picker = new mui.PopPicker();
    picker.setData(sectionList)

    var showUserPickerButton = document.getElementById('showUserPicker')
    var userResult = document.getElementById('userResult');
    showUserPickerButton.addEventListener('tap', function (event) {
        picker.show(function (items) {
            picker.innerText = JSON.stringify(items[0]);
            $('#district').html(items[0].text)
            mescroll.clearDataList()
            freshParam() // 初始化参数
            window.flag = items[0].text.replace('全部站点', '')
            showSection()
            //返回 false 可以阻止选择框的关闭
            //return false;
        });
    }, false)
}

// 更新数值
function freshParam() {
    page = 1
    isFlag = true
    $('.content-list').empty()
    mescroll.destroy()
    initScroll()
}


// 监听tab切换
function listenTab() {
    $('.tab-item').each(function (index) {
        $(this).off('touchstart').on('touchstart', function () {
            $('.tab-active').removeClass('tab-active')
            $(this).addClass('tab-active')
            freshParam()
            // $('.content-list').empty()
            switch (index) {
                case 0:
                    type = 0
                    initScrollData() // 显示收藏
                    break;
                case 1:
                    type = 1
                    initScrollData() // 显示附近
                    break;
                case 2:
                    type = 2
                    initScrollData() // 显示地区
                    break;
                default:
                    break;
            }
        })
    })
}

// 显示地区
function showSection() {
    $('#distance-box').hide()
    $('#district-box').show()

    var html = '',
        siteList = zstData

    saveSiteList = localStorage.saveSiteList ? JSON.parse(localStorage.saveSiteList) : []

    if (window.flag) {
        siteList = _.filter(siteList, function (o) {
            return _.includes(o.address, flag)
        })
    }

    tmpList = siteList

    console.log(page, siteList.length)

    if (siteList.length) {

        count = Math.ceil(siteList.length / size)

        if (page <= count) {
            var l = siteList.length,
                pic = '../../img/collection@3x.png',
                hidden = ''
            // console.log((page - 1) * size, _.min([page * size, l]))
            for (var i = (page - 1) * size; i < _.min([page * size, l]); i++) {
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
                    '<div onclick="saveSite(' + siteList[i].id + ',' + i + ', event);" class="collect-pic"><img id="pic' + siteList[i].id + '" class="collect" src="' + pic + '"></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
            }
            // console.log(html)
            $('#mescroll .content-list').append(html)
            page++
            mescroll.endSuccess()
        } else {
            mescroll.endUpScroll(true)
            // mescroll.showNoMore()
        }
    } else {
        mescroll.endUpScroll(true)
        // mescroll.showNoMore()
    }
}

// 切换到附近
function change2Neighborhood() {
    // 距离
    var distancPicker = new mui.PopPicker();
    distancPicker.setData(distanceList)

    var showDistancePicker = document.getElementById('showDistancePicker')
    var distanceResult = document.getElementById('distanceResult');
    // freshParam() // 初始化参数
    showDistancePicker.addEventListener('tap', function (event) {
        distancPicker.show(function (items) {
            distancPicker.innerText = JSON.stringify(items[0]);
            $('#distance').html(items[0].text)
            dis = +items[0].text.replace('米', '')
            freshParam() // 初始化参数
            filterNeighborhood()
        });
    }, false)
}

function filterNeighborhood() {
    // initScroll2()
    var location = localStorage.location ? JSON.parse(localStorage.location) : {}
    var siteList = zstData
    var _list = _.filter(siteList, function (o) {
        return _.gte(dis || 3000, distanceCaculate({
            lat0: location.lat,
            lng0: location.lng,
            lat: o.lat,
            lng: o.lng,
        }))
    })
    showNeighborhood(_list)
}

// 显示附近
function showNeighborhood(_list) {
    $('#distance-box').show()
    $('#district-box').hide()

    var html = ''
    tmpList = _list
    saveSiteList = localStorage.saveSiteList ? JSON.parse(localStorage.saveSiteList) : []

    console.log(page, _list.length, dis)

    if (_list.length) {
        count = Math.ceil(_list.length / size)
        if (page <= count) {
            var l = _list.length,
                hidden = ''
            // console.log((page - 1) * size, _.min([page * size, l]))
            for (var i = (page - 1) * size; i < _.min([page * size, l]); i++) {
                if (_list[i].name === '') hidden = 'none'
                else hidden = ''

                if (!_.includes(saveSiteList.idList, _list[i].id)) pic = '../../img/collection@3x.png'
                else pic = '../../img/alreadycollected@3x.png'

                html += '<div onclick="toCommonMap(' + _list[i].lng + ', ' + _list[i].lat + ')" class="site-item" style="display:' + hidden + '"  data="' + _list[i].name + '">' +
                    '<div class="site-head flex flex-column"><div class="site-name">' + _list[i].name + '</div>' +
                    '<div class="flex" style="width:100%;">' +
                    '<p class="site-availBike">类型:' + _list[i].site_type + '</p>' +
                    '<p class="site-capacity">' + _list[i].phone + '</p>' +
                    '</div>' +
                    '<div class="site-footer flex"><p><img src="../../img/location@3x.png">' + _list[i].address + '</p>' +
                    '<div onclick="saveSite(' + _list[i].id + ',' + i + ', event);" class="collect-pic"><img id="pic' + _list[i].id + '" class="collect" src="' + pic + '"></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
            }
            // console.log(html)
            $('.content-list').append(html)
            page++
            mescroll.endSuccess()
        } else {
            mescroll.showNoMore()
        }
    } else {
        mescroll.showNoMore()
    }
}

function toCommonMap(lng, lat) {
    toMap({
        longitude: lng.toString(),
        latitude: lat.toString(),
        markType: 'zswd',
        marks: zstData // 地点数组
    })
}

// 显示收藏
function showSave() {
    $('#distance-box').hide()
    $('#district-box').hide()
    var html = '',
        _list = saveSiteList.list || []
    console.log(_list)
    var l = _list.length,
        hidden = ''
    if (l && isFlag) {
        // console.log((page - 1) * size, _.min([page * size, l]))
        for (var i = 0; i < l; i++) {
            if (_list[i].name === '') hidden = 'none'
            else hidden = ''

            html += '<div id="delete'+ _list[i].id +'"  onclick="toCommonMap(' + _list[i].lng + ', ' + _list[i].lat + ')" class="site-item" style="display:' + hidden + '"  data="' + _list[i].name + '">' +
                '<div class="site-head flex flex-column"><div class="site-name">' + _list[i].name + '</div>' +
                '<div class="flex" style="width:100%;">' +
                '<p class="site-availBike">类型:' + _list[i].site_type + '</p>' +
                '<p class="site-capacity">' + _list[i].phone + '</p>' +
                '</div>' +
                '<div class="site-footer flex"><p><img src="../../img/location@3x.png">' + _list[i].address + '</p>' +
                '<div onclick="deleteSite(' + _list[i].id + ',event);" class="collect-pic"><img id="pic' + _list[i].id + '" class="collect" src="../../img/alreadycollected@3x.png"></div>' +
                '</div>' +
                '</div>' +
                '</div>'
        }
        isFlag = false
        // console.log(html)
        $('.content-list').append(html)

    }
    mescroll.showNoMore()
}

// 监听搜索
function listenSearch() {
    $('.search-btn').off('touchstart').on('touchstart', function () {
        var v = $('.search-input').val()
        console.log(v)
        if (v.length) {
            location.href = './search.html?query=' + v
        } else {
            zct.alert({
                content: '请输入搜索内容'
            })
        }
    })

    $('.search-input').off('keydown').on('keydown', function (e) {
        var v = $(this).val()
        if (13 === e.keyCode) {
            if (v.length) {
                location.href = './search.html?query=' + v
            } else {
                zct.alert({
                    content: '请输入搜索内容'
                })
            }
        }
    })
}

// 删除地点
function deleteSite(id, e) {
    // console.log(id, e)
    saveSiteList = localStorage.saveSiteList ? JSON.parse(localStorage.saveSiteList) : {
        idList: [],
        list: []
    }

    saveSiteList.idList = _.filter(saveSiteList.idList, function (o) {
        return +o !== id
    })

    saveSiteList.list = _.filter(saveSiteList.list, function (o) {
        return +o.id !== id
    })

    console.log(saveSiteList)

    localStorage.saveSiteList = JSON.stringify(saveSiteList)

    $('#delete' + id).remove()

    e.stopPropagation()
}
// 监听收藏
function saveSite(id, item, e) {
    console.log(id, item, e)
    saveSiteList = localStorage.saveSiteList ? JSON.parse(localStorage.saveSiteList) : {
        idList: [],
        list: []
    }
    if (!_.includes(saveSiteList.idList, id)) {
        saveSiteList.idList.push(id)
        saveSiteList.list.push(tmpList[item])
        localStorage.saveSiteList = JSON.stringify(saveSiteList)
        $('#pic' + id).attr('src', '../../img/alreadycollected@3x.png')
    }

    e.stopPropagation()
}