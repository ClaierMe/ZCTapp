var page = 1,
    size = 12,
    count = 58,
    dis = 3000,
    mescroll,isFlag = true,
    savePosList = [],
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
    // console.log(_.now())
    // 获取当前位置
    zct.getLocation(function (res) {
        // alert(JSON.stringify(res))
        $('#menu-map').click(function () {
            toMap({
                longitude: res.longitude.toString(),
                latitude: res.latitude.toString(),
                markType: 'zsbike',
                marks: JSON.parse(localStorage.bike) // 地点数组
            })
        })
    })

    // 监听tab切换
    listenTab()

    // 监听搜索
    listenSearch()

    initScroll()
    initScrollData()

    zct.setTitleBarRightButton({
        title: '报障'
    }, function () {
        // zct.closeWebview()
        // alert('我要报修')
        location.href = '../../views/bikeMalfunction.html'
    })
    // common.getUerInfo()
    setTimeout(function(){ zct.hideLoading() },500) 
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
        posList = JSON.parse(localStorage.bike)

    savePosList = localStorage.savePosList ? JSON.parse(localStorage.savePosList) : []

    if (window.flag) {
        posList = _.filter(posList, function (o) {
            return _.includes(o.address, flag)
        })
    }

    console.log(page, posList.length)

    if (posList.length) {

        count = Math.ceil(posList.length / size)

        if (page <= count) {
            var l = posList.length,
                pic = '../../img/collection@3x.png',
                hidden = ''
            // console.log((page - 1) * size, _.min([page * size, l]))
            for (var i = (page - 1) * size; i < _.min([page * size, l]); i++) {
                if (posList[i].name === '') hidden = 'none'
                else hidden = ''

                if (!_.includes(savePosList.idList, posList[i].id)) pic = '../../img/collection@3x.png'
                else pic = '../../img/alreadycollected@3x.png'

                html += '<div onclick="toCommonMap(' + posList[i].lng + ', ' + posList[i].lat + ')" class="pos-item" style="display:' + hidden + '"  data="' + posList[i].name + '">' +
                    '<div class="pos-head flex"><p class="pos-name">' + posList[i].name + '</p>' +
                    '<p class="pos-availBike">可借:<span class="red">' + posList[i].availBike + '</span></p>' +
                    '<p class="pos-capacity">可停:<span class="red">' + posList[i].capacity + '</span></p>' +
                    '</div>' +
                    '<div class="pos-footer flex"><p><img src="../../img/location@3x.png">' + posList[i].address + '</p>' +
                    '<div onclick="savePos(' + posList[i].id + ', event);" class="collect-pic"><img id="pic' + posList[i].id + '" class="collect" src="' + pic + '"></div>' +
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
    var posList = JSON.parse(localStorage.bike)
    var _list = _.filter(posList, function (o) {
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

    savePosList = localStorage.savePosList ? JSON.parse(localStorage.savePosList) : []

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

                if (!_.includes(savePosList.idList, _list[i].id)) pic = '../../img/collection@3x.png'
                else pic = '../../img/alreadycollected@3x.png'

                html += '<div onclick="toCommonMap(' + _list[i].lng + ', ' + _list[i].lat + ')" class="pos-item" style="display:' + hidden + '"  data="' + _list[i].name + '">' +
                    '<div class="pos-head flex"><p class="pos-name">' + _list[i].name + '</p>' +
                    '<p class="pos-availBike">可借:<span class="red">' + _list[i].availBike + '</span></p>' +
                    '<p class="pos-capacity">可停:<span class="red">' + _list[i].capacity + '</span></p>' +
                    '</div>' +
                    '<div class="pos-footer flex"><p><img src="../../img/location@3x.png">' + _list[i].address + '</p>' +
                    '<div onclick="savePos(' + _list[i].id + ', event);" class="collect-pic"><img id="pic' + _list[i].id + '" class="collect" src="' + pic + '"></div>' +
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
        markType: 'zsbike',
        marks: JSON.parse(localStorage.bike) // 地点数组
    })
}
// 显示收藏
function showSave() {
    $('#distance-box').hide()
    $('#district-box').hide()
    var html = '',
        _list = JSON.parse(localStorage.savePosList).list || []
        // savePosList = JSON.parse(localStorage.savePosList) || []
    console.log(_list)
    var l = _list.length,
            hidden = ''
    if (l && isFlag) {
        // console.log((page - 1) * size, _.min([page * size, l]))
        for (var i = 0; i < l; i++) {
            if (_list[i].name === '') hidden = 'none'
            else hidden = ''
            html += '<div id="delete'+ _list[i].id +'" onclick="toCommonMap(' + _list[i].lng + ', ' + _list[i].lat + ')" class="pos-item" style="display:' + hidden + '"  data="' + _list[i].name + '">' +
                '<div class="pos-head flex"><p class="pos-name">' + _list[i].name + '</p>' +
                '<p class="pos-availBike">可借:<span class="red">' + _list[i].availBike + '</span></p>' +
                '<p class="pos-capacity">可停:<span class="red">' + _list[i].capacity + '</span></p>' +
                '</div>' +
                '<div class="pos-footer flex"><p><img src="../../img/location@3x.png">' + _list[i].address + '</p>' +
                '<img onclick="deleteSave(' + _list[i].id +', event)" class="collect" src="../../img/alreadycollected@3x.png">' +
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
function deleteSave(id, e) {
    // console.log(id, e)
    savePosList = localStorage.savePosList ? JSON.parse(localStorage.savePosList) : {
        idList: [],
        list: []
    }

    savePosList.idList = _.filter(savePosList.idList, function(o){
        return +o !== id
    })

    savePosList.list = _.filter(savePosList.list, function(o){
        return +o.id !== id
    })

    console.log(savePosList)

    localStorage.savePosList = JSON.stringify(savePosList)

    $('#delete' + id).remove()

    e.stopPropagation()
}
// 监听收藏
function savePos(id, e) {
    console.log(id, e)
    savePosList = localStorage.savePosList ? JSON.parse(localStorage.savePosList) : {
        idList: [],
        list: []
    }
    if (!_.includes(savePosList.idList, id)) {
        savePosList.idList.push(id)
        savePosList.list.push(JSON.parse(localStorage.bike)[id - 1])
        localStorage.savePosList = JSON.stringify(savePosList)
        $('#pic' + id).attr('src', '../../img/alreadycollected@3x.png')
    }

    e.stopPropagation()
}