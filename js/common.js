    // 系统环境
    window.ENV = 'production' //  production test dev 生产环境和测试环境切换
    console.log('system enviroment: ', window.ENV)


    if (window.ENV === 'dev' || window.ENV === 'test') {
        window.CONFIG = {
            loginByZst: 'http://113.106.3.65:8052/',
            site:'http://a.zhongshantong.net/',
            getLineInfoAndCardInfo: 'http://113.106.3.65:4180/',
            payRediectUrl: 'http://sit-zhongshan.allcitygo.com/views/balance_data.html'
        }
    } else {
        window.CONFIG = {
            loginByZst: 'http://a.zhongshantong.net/', // 授权登录:8443/app
            site:'http://a.zhongshantong.net/',
            getLineInfoAndCardInfo: 'http://113.106.3.65:4180/', // 正式获取卡片信息
            payRediectUrl: 'http://a.zhongshantong.net:8888/views/balance_bind.html'
        }
    }

    +
    (function () {
        var sysInfo = window.yl.getSystemInfo()
        console.log(sysInfo)
        window.sysInfo = sysInfo // 系统信息对象
    })()

    // app sdk 交互对象
    var zct = {
        // 获取当前位置
        getLocation: function (cb) {
            window.yl.call("getLocation", {}, {
                onSuccess: function (res) {
                    // alert(JSON.stringify(res))
                    localStorage.location = JSON.stringify(res.param)
                    cb && cb(res.param)
                },
                onFail: function (res) {
                    console.log(JSON.stringify(res))
                }
            })
        },
        // 关闭页面
        closeWebview: function () {
            window.yl.call("closeWebview")
        },
        // 右键设置
        setTitleBarRightButton: function (opt, cb) {

            opt = $.extend(true, {
                title: '关闭'
            }, opt)

            window.yl.call("setTitleBarRightButton", {
                rightButtonShow: true,
                rightButtonTextOpen: false,
                rightButtonText: opt.title,
                rightButtonIcon: "icon-user",
                itemList: []
            }, {
                onSuccess: function (a) {
                    // alert("success")
                    cb()
                },
                onFail: function (a) {
                    console.log("fail")
                }
            })
        },
        // 获取 code localStorage.authCode
        getAuthcode: function (cb) {
            window.yl.call("getAuthcode", {}, {
                onSuccess: function (res) {
                    if (window.ENV === "dev") alert(res.param.authCode)
                    localStorage.authCode = res.param.authCode
                    cb && cb(localStorage.authCode)
                },
                onFail: function (res) {
                    // alert("fail")
                    console.log(res)
                }
            })
        },
        // 确认弹框
        confirmAlert: function (opt, cb, fn) {
            opt = $.extend(true, {
                title: "温馨提示",
                content: '',
                leftButtonText: '取消',
                rightButtonText: '确定'
            }, opt)

            var html = '<div class="modal">' +
                '<div class="mask"></div>' +
                '<div class="modal-content">' +
                '<div class="modal-header"><p>' + opt.title + '</p></div>' +
                '<div class="modal-contenter"><p>' + opt.content + '</p></div>' +
                '<div class="modal-footer">' +
                '<button id="left-btn">' + opt.leftButtonText + '</button>' +
                '<button id="right-btn">' + opt.rightButtonText + '</button>' +
                '</div>' +
                '</div>' +
                '</div>'
            $('.modal').remove()
            $('body').append(html)

            $('#left-btn').on('click', function () {
                $('.modal').hide()
                fn && fn()
            })

            $('#right-btn').on('click', function () {
                $('.modal').hide()
                cb && cb()
            })
            // window.yl.call("confirmAlert", {
            //     title: opt.title,
            //     content: opt.content,
            //     leftButtonText: opt.leftButtonText,
            //     rightButtonText: opt.rightButtonText
            // }, {
            //     onSuccess: function (res) {
            //         cb && cb(res)
            //     },
            //     onFail: function (err) {
            //         fn && fn(err)
            //     }
            // })
        },
        // 隐藏菊花
        hideLoading: function () {
            window.yl.call("hideLoading")
        },
        // 菊花
        showLoading: function (opt) {
            opt = $.extend(true, {
                title: "加载中...",
                duration: 3000
            }, opt)

            window.yl.call("showLoading", {
                content: opt.title,
                duration: opt.duration
            }, {
                onSuccess: function (a) {
                    console.log("success")
                }
            })
        },
        // 提示框
        alert: function (opts) {
            window.yl.call("alert", {
                title: opts.title || "温馨提示",
                content: opts.content || "",
                buttonText: opts.buttonText || "确定"
            })
        },
        // 设置页面标题
        setTitleBarText: function (opts) {
            window.yl.call("setTitleBarText", {
                title: opts.title || "众城通",
                titleColor: opts.titleColor || "#F00FFFF",
                backgroundColor: opts.backgroundColor || "#F00FF00",
            }, {
                onSuccess: function (a) {
                    // alert("success")
                },
                onFail: function (a) {
                    console.log("fail")
                }
            })
        }
    }

    // 计算距离
    function distanceCaculate(latlng) {
        var lat = [latlng.lat0, latlng.lat]
        var lng = [latlng.lng0, latlng.lng]
        var R = 6378137;
        var dLat = (lat[1] - lat[0]) * Math.PI / 180;
        var dLng = (lng[1] - lng[0]) * Math.PI / 180;
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat[0] * Math.PI / 180) * Math.cos(lat[1] * Math.PI / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return Math.round(d);
    }
    // 通过当前经纬度和距离计算 经纬度范围
    function getNeighStation(opts) {
        var r = 6378137; //地球半径米  
        if (opts.dis === '' || opts.dis === '不限' || opts.dis === undefined) {
            opts.dis = 2000;
        }
        var dlng = 2 * Math.asin(Math.sin(opts.dis / (2 * r)) / Math.cos(opts.lat * Math.PI / 180));
        dlng = dlng * 180 / Math.PI; //角度转为弧度  
        var dlat = opts.dis / r;
        dlat = dlat * 180 / Math.PI;
        var minlat = opts.lat - dlat.toFixed(6);
        var maxlat = +dlat.toFixed(6) + opts.lat
        var minlng = opts.lng - dlng.toFixed(6);
        var maxlng = +dlng.toFixed(6) + opts.lng
        // console.log(dlat, dlng)
        return {
            minlat: minlat,
            maxlat: maxlat,
            minlng: minlng,
            maxlng: maxlng
        }
    }

    // 跳转地图 - demo 事例放置在 changeLog 中
    function toMap(obj) {

        zct.showLoading({
            content: '地图加载中'
        })

        obj = $.extend(true, {
            scale: 18,
            longitude: '',
            latitude: '',
            markType: "zsbike",
            marks: []
        }, obj)

        // alert(JSON.stringify(obj))

        window.yl.call("map", {
            longitude: obj.longitude.toString(), // 中心点经度
            latitude: obj.latitude.toString(), // 中心点纬度
            scale: obj.scale,
            markType: obj.markType,
            marks: obj.marks
        }, {
            onSuccess: function (res) {
                setTimeout(function () {
                    zct.hideLoading()
                }, 600)
            },
            onFail: function (err) {
                console.log(err)
            }
        })
    }

    // 通用调用方法
    var common = {
        // 判断用户是否绑卡
        isBandCrad: function () {
            if (localStorage.isBandCard) return true
            else location.href = '/views/balance_bind.html'
        },
        // 获取token
        getToken: function (cb) {
            request({
                url: "appTradeService/getToken",
                type: "GET"
            }, function (res) {
                // success
                // console.log(res)
                if (window.ENV === "dev") alert(res.token)
                var token = res.token
                window.token = token
                cb && cb(token)
            })
        },
        //  获取缓存userInfo
        getCachUserInfo: function (cb) {
            if (localStorage.userInfo) {
                cb && cb(JSON.parse(localStorage.userInfo))
            } else {
                zct.getAuthcode(function (authCode) {
                    // alert(authCode)
                    request({
                        host: CONFIG.loginByZst,
                        url: 'ZST/orienteering/loginByZst?authCode=' + authCode + "&systemId=" + window.sysInfo.systemId,
                        type: 'GET'
                    }, function (data) {
                        if (window.ENV === "dev") alert(JSON.stringify(data))
                        localStorage.userInfo = JSON.stringify(data) //  缓存userInfo
                        cb && cb(data)
                    })
                })
            }
        },
        // 获取用户信息
        getUerInfo: function (cb) {
            zct.getAuthcode(function (authCode) {
                // alert(window.sysInfo.systemId)
                request({
                    host: CONFIG.loginByZst,
                    url: 'ZST/orienteering/loginByZst?authCode=' + authCode + "&systemId=" + window.sysInfo.systemId,
                    type: 'GET'
                }, function (res) {
                    if (window.ENV === "dev") alert(JSON.stringify(res))
                    localStorage.userInfo = JSON.stringify(res)
                    cb && cb(data)
                })
            })
        }
    }

    // http请求方法
    function request(opt, cb) {
        var opts = $.extend(true, {
            host: 'https://a.zhongshantong.net:8443/app/d/app/',
            url: '',
            type: 'GET',
            dataType: 'json',
            data: {},
            headers: {
                'Content-type': "application/json;charset=utf-8",
                'Cookie': 'JSESSIONID=' + (localStorage.JSESSIONID || '')
            },
            timeout: 10000
        }, opt)

        opts.method = opts.type
        opts.url = opts.host + opts.url

        // alert(JSON.stringify(opts))

        window.yl.call("httpRequest", opts, {
            onSuccess: function (res) {
                // alert(JSON.stringify(res))
                var JSESSIONID = ""
                for (var i = 0; i < res.param.headers.length; i++) {
                    if (res.param.headers[i]['Set-Cookie']) {
                        JSESSIONID = res.param.headers[i]['Set-Cookie'];
                        var end = JSESSIONID.indexOf(";") // JSESSIONID=23BFAD711876B85BD09BD0CAD1E8369C; Path=/app; Secure; HttpOnly
                        var index = JSESSIONID.indexOf("=") + 1
                        JSESSIONID = JSESSIONID.substring(index, end)
                        localStorage.JSESSIONID = JSESSIONID
                        break
                    }
                }
                if (window.ENV === "dev") alert(res.param.data)
                var data = JSON.parse(res.param.data) // res.param

                cb(data)
            },
            onFail: function (res) {
                zct.hideLoading()
                console.log(JSON.stringify(res))
                window.yl.call("showToast", {
                    duration: 3000,
                    content: "网络异常，请查看网络连接"
                })
                // alert(JSON.stringify(a))
            }
        })
    }
    // raw ajax
    function ajax(opt, cb) {
        var opts = $.extend({
            host: '',
            url: '',
            method: 'GET',
            dataType: "json",
            crossDomain: true,
            processData: false,
            timeout: 8000,
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (window.ENV === "dev") alert(data)
                console.log(data)
                cb && cb.call(null, data)
            },
            error: function (xhr) {
                console.log(xhr)
                window.yl.call("showToast", {
                    duration: 3000,
                    content: "网络异常，请查看网络连接"
                })
            }
        }, opt)

        opts.url = opts.host + opts.url
        console.log(opts)
        // alert(JSON.stringify(opts))

        $.ajax(opts)
    }
    // 解析url
    function parseQueryString(url) {
        var obj = {};
        var keyvalue = [];
        var key = "",
            value = "";
        var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
        for (var i in paraString) {
            keyvalue = paraString[i].split("=");
            key = keyvalue[0];
            value = keyvalue[1];
            obj[key] = value;
        }
        return obj;
    }
    //拼接url
    function createURL(param) {
        var link = '';
        $.each(param, function (key, val) {
            link += '&' + key + "=" + val;
        })
        var Mylink = "?" + link.substr(1);
        $.trim(Mylink)
        return Mylink
    }

    $.fn.extend({
        animateCss: function (animationName, callback) {
            var animationEnd = (function (el) {
                var animations = {
                    animation: 'animationend',
                    OAnimation: 'oAnimationEnd',
                    MozAnimation: 'mozAnimationEnd',
                    WebkitAnimation: 'webkitAnimationEnd',
                };

                for (var t in animations) {
                    if (el.style[t] !== undefined) {
                        return animations[t];
                    }
                }
            })(document.createElement('div'));

            this.addClass('animated ' + animationName).one(animationEnd, function () {
                $(this).removeClass('animated ' + animationName);

                if (typeof callback === 'function') callback();
            });

            return this;
        },
    });

    // cookie 对象
    var cookie = {
        set: function (name, value, time = 365) {
            // 缓存过期时间
            var Days = time || 365
            var exp = new Date()
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
            document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/'
        },
        get: function (name) {
            var arr = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
            var reg = arr
            arr = document.cookie.match(reg)
            if (arr) {
                return unescape(arr[2])
            } else {
                return null
            }
        },
        delete: function (name) {
            var exp = new Date()
            exp.setTime(exp.getTime() - 1)
            var cval = this.get(name)
            if (cval != null) {
                document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() + ';path=/'
            }
        }
    }

    // 存储数据
    var cache = {
        getItem: function (key) {
            var _key = localStorage.getItem(key)
            if (_key) {
                _key = JSON.parse(_key)
                return _key
            } else {
                return false
            }
        },
        setItem: function (key, value) {
            localStorage.setItem(key, value)
            console.log('set localStorage key: ' + key + ', value: ' + value)
        },
        deelete: function (key) {
            localStorage.removeItem(key)
        },
        clearAll: function () {
            localStorage.clear()
            console.log('localStorage is cleared')
        }
    }

    // 获取用户信息
    // function getUserInfo(opts) {
    //     var urerInfo = JSON.parse(localStorage.userInfo)
    //     var str = "["+ urerInfo.phone +",'']";
    //     var sign = 'ZSTTZS'
    //     var key = opts // '201806252052225719011161' // opts;

    //     key = CryptoJS.enc.Utf8.parse(key);
    //     var signEncrypted = CryptoJS.TripleDES.encrypt(sign, key, {
    //         mode: CryptoJS.mode.ECB,
    //         padding: CryptoJS.pad.Pkcs7
    //     })
    //     var contentEncrypted = CryptoJS.TripleDES.encrypt(str, key, {
    //         mode: CryptoJS.mode.ECB,
    //         padding: CryptoJS.pad.Pkcs7
    //     })
    //     signEncrypted = signEncrypted.toString();
    //     contentEncrypted = contentEncrypted.toString();
    //     var content = '?content=' + encodeURIComponent(contentEncrypted) + '&sign=' + encodeURIComponent(signEncrypted)

    //     // console.log(content, contentEncrypted)

    //     // window.yl.call("httpRequest", {
    //     //     url: "https://a.zhongshantong.net:8443/app/d/app/appTradeService/getUserInfo" + content,
    //     //     method: "POST",
    //     //     timeout: 10000
    //     // }, {
    //     //     onSuccess: function (a) {
    //     //         //alert(JSON.stringify(a))
    //     //         console.log(JSON.stringify(a))
    //     //     },
    //     //     onFail: function (a) {
    //     //         console.log(JSON.stringify(a))
    //     //     }
    //     // })

    //     request({
    //         url: "appTradeService/getUserInfo" + content,
    //         type: "POST"
    //     }, function (res) {
    //         // success
    //         console.log(res)
    //         //  获取用户信息
    //         // desPrepay(JSON.parse(res))
    //     })
    // }