/** 常量 **/
var
    // 所属项目ID, 用于替换成相应项目的UUID，生成监控代码的时候搜索替换
    WEB_MONITOR_ID = sessionStorage.CUSTOMER_WEB_MONITOR_ID || "jeffery_webmonitor"

    // 判断是http或是https的项目
    , WEB_HTTP_TYPE = window.location.href.indexOf('https') === -1 ? 'http://' : 'https://'

    // 获取当前页面的URL
    , WEB_LOCATION = window.location.href

    // 本地IP, 用于区分本地开发环境
    , WEB_LOCAL_IP = 'localhost'

    // 应用的主域名, 用于主域名下共享customerKey
    , MAIN_DOMAIN = '&&&webfunny.cn&&&'

    // 监控平台地址
    , WEB_MONITOR_IP = '&&&www.webfunny.cn&&&'

    // 上传数据的uri, 区分了本地和生产环境
    ,
    HTTP_UPLOAD_URI = WEB_LOCATION.indexOf(WEB_LOCAL_IP) == -1 ? WEB_HTTP_TYPE + WEB_MONITOR_IP : WEB_HTTP_TYPE + WEB_LOCAL_IP + ':8011'

    // 上传数据的接口API
    , HTTP_UPLOAD_LOG_API = '/home/js_error_info' // '/api/v1/upLog'

    // 上传数据时忽略的uri, 需要过滤掉监控平台上传接口
    , WEB_MONITOR_IGNORE_URL = HTTP_UPLOAD_URI + HTTP_UPLOAD_LOG_API

    // 上传数据的接口
    , HTTP_UPLOAD_LOG_INFO = HTTP_UPLOAD_URI + HTTP_UPLOAD_LOG_API

    // 获取当前项目的参数信息的接口
    , HTTP_PROJECT_INFO = HTTP_UPLOAD_URI + '/home/js_error_info'

    // 上传埋点数据接口
    , HTTP_UPLOAD_RECORD_DATA = HTTP_UPLOAD_URI + ''

    // 用户访问日志类型
    , CUSTOMER_PV = 'CUSTOMER_PV'

    // 用户加载页面信息类型
    , LOAD_PAGE = 'LOAD_PAGE'

    // 接口日志类型
    , HTTP_LOG = 'HTTP_LOG'

    // 接口错误日志类型
    , HTTP_ERROR = 'HTTP_ERROR'

    // js报错日志类型
    , JS_ERROR = 'JS_ERROR'

    // 截屏类型
    , SCREEN_SHOT = 'SCREEN_SHOT'

    // 用户的行为类型
    , ELE_BEHAVIOR = 'ELE_BEHAVIOR'

    // 静态资源类型
    , RESOURCE_LOAD = 'RESOURCE_LOAD'

    // 用户自定义行为类型
    , CUSTOMIZE_BEHAVIOR = 'CUSTOMIZE_BEHAVIOR'

    // 用户录屏事件类型
    , VIDEOS_EVENT = 'VIDEOS_EVENT'

    // 浏览器信息
    , BROWSER_INFO = window.navigator.userAgent

    // 工具类示例化
    , utils = new MonitorUtils()
    //
    // // 设备信息
    , DEVICE_INFO = utils.getDevice()

    // 监控代码空构造函数
    , WebMonitor = {}

    // 获取用户自定义信息
    , USER_INFO = localStorage.wmUserInfo ? JSON.parse(localStorage.wmUserInfo) : {}

    // 录屏JSON字符简化
    , JSON_KEY = {
        "type": "≠",
        "childNodes": "ā",
        "name": "á",
        "id": "ǎ",
        "tagName": "à",
        "attributes": "ē",
        "style": "é",
        "textContent": "ě",
        "isStyle": "è",
        "isSVG": "ī",
        "content": "í",
        "href": "ǐ",
        "src": "ì",
        "class": "ō",
        "tabindex": "ó",
        "aria-label": "ǒ",
        "viewBox": "ò",
        "focusable": "ū",
        "data-icon": "ú",
        "width": "ǔ",
        "height": "ù",
        "fill": "ǖ",
        "aria-hidden": "ǘ",
        "stroke": "ǚ",
        "stroke-width": "ǜ",
        "paint-order": "ü",
        "stroke-opacity": "ê",
        "stroke-dasharray": "ɑ",
        "stroke-linecap": "?",
        "stroke-linejoin": "ń",
        "stroke-miterlimit": "ň",
        "clip-path": "Γ",
        "alignment-baseline": "Δ",
        "fill-opacity": "Θ",
        "transform": "Ξ",
        "text-anchor": "Π",
        "offset": "Σ",
        "stop-color": "Υ",
        "stop-opacity": "Φ"
    }
    , JSON_CSS_KEY = {
        "background": "≠",
        "background-attachment": "ā",
        "background-color": "á",
        "background-image": "ǎ",
        "background-position": "à",
        "background-repeat": "ē",
        "background-clip": "é",
        "background-origin": "ě",
        "background-size": "è",
        "border": "Г",
        "border-bottom": "η",
        "color": "┯",
        "style": "Υ",
        "width": "б",
        "border-color": "ū",
        "border-left": "ǚ",
        "border-right": "ň",
        "border-style": "Δ",
        "border-top": "З",
        "border-width": "Ω",
        "outline": "α",
        "outline-color": "β",
        "outline-style": "γ",
        "outline-width": "δ",
        "left-radius": "Ж",
        "right-radius": "И",
        "border-image": "ω",
        "outset": "μ",
        "repeat": "ξ",
        "repeated": "π",
        "rounded": "ρ",
        "stretched": "σ",
        "slice": "υ",
        "source": "ψ",
        "border-radius": "Б",
        "radius": "Д",
        "box-decoration": "Й",
        "break": "К",
        "box-shadow": "Л",
        "overflow-x": "Ф",
        "overflow-y": "У",
        "overflow-style": "Ц",
        "rotation": "Ч",
        "rotation-point": "Щ",
        "opacity": "Ъ",
        "height": "Ы",
        "max-height": "Э",
        "max-width": "Ю",
        "min-height": "Я",
        "min-width": "а",
        "font": "в",
        "font-family": "г",
        "font-size": "ж",
        "adjust": "з",
        "aspect": "и",
        "font-stretch": "й",
        "font-style": "к",
        "font-variant": "л",
        "font-weight": "ф",
        "content": "ц",
        "before": "ч",
        "after": "ш",
        "counter-increment": "щ",
        "counter-reset": "ъ",
        "quotes": "ы",
        "list-style": "+",
        "image": "－",
        "position": "|",
        "type": "┌",
        "margin": "┍",
        "margin-bottom": "┎",
        "margin-left": "┏",
        "margin-right": "┐",
        "margin-top": "┑",
        "padding": "┒",
        "padding-bottom": "┓",
        "padding-left": "—",
        "padding-right": "┄",
        "padding-top": "┈",
        "bottom": "├",
        "clear": "┝",
        "clip": "┞",
        "cursor": "┟",
        "display": "┠",
        "float": "┡",
        "left": "┢",
        "overflow": "┣",
        "right": "┆",
        "top": "┊",
        "vertical-align": "┬",
        "visibility": "┭",
        "z-index": "┮",
        "direction": "┰",
        "letter-spacing": "┱",
        "line-height": "┲",
        "text-align": "6",
        "text-decoration": "┼",
        "text-indent": "┽",
        "text-shadow": "10",
        "text-transform": "┿",
        "unicode-bidi": "╀",
        "white-space": "╂",
        "word-spacing": "╁",
        "hanging-punctuation": "╃",
        "punctuation-trim": "1",
        "last": "3",
        "text-emphasis": "4",
        "text-justify": "5",
        "justify": "7",
        "text-outline": "8",
        "text-overflow": "9",
        "text-wrap": "11",
        "word-break": "12",
        "word-wrap": "13"
    }

    // LZString 加载标识
    , LZStringFlag = false;


init();

/**
 * 监控代码需要的工具类
 * @constructor
 */
function MonitorUtils() {
    this.getUuid = function () {
        var timeStamp = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }) + "-" + timeStamp;
    };

    /**
     * 获取用户的唯一标识
     */
    this.getCustomerKey = function () {
        var customerKey = this.getUuid();
        var monitorCustomerKey = utils.getCookie("monitorCustomerKey");
        if (!monitorCustomerKey) {
            var extraTime = 30 * 24 * 3600 * 1000;// cookie 30天后过期时间
            var exp = new Date();
            exp.setTime(exp.getTime() + extraTime);
            if (MAIN_DOMAIN) {
                document.cookie = "monitorCustomerKey=" + customerKey + ";Path=/;domain=" + MAIN_DOMAIN + ";expires=" + exp.toGMTString()
            } else {
                document.cookie = "monitorCustomerKey=" + customerKey + ";Path=/;expires=" + exp.toGMTString()
            }
            monitorCustomerKey = customerKey
        }
        return monitorCustomerKey;
    };

    /**
     * 获取cookie
     */
    this.getCookie = function (name) {
        var arr;
        var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (document.cookie.match(reg)) {
            arr = document.cookie.match(reg);
            return unescape(arr[2])
        }
        return ""
    };

    /**
     * 获取页面的唯一标识
     */
    this.getPageKey = function () {
        var pageKey = this.getUuid();
        var reg = /^[0-9a-z]{8}(-[0-9a-z]{4}){3}-[0-9a-z]{12}-\d{13}$/;
        if (!localStorage.monitorPageKey) {
            localStorage.monitorPageKey = pageKey;
        } else if (!reg.test(localStorage.monitorPageKey)) {
            localStorage.monitorPageKey = pageKey;
        }
        return localStorage.monitorPageKey;
    };

    /**
     * 封装简易的ajax请求
     * @param method  请求类型(大写)  GET/POST
     * @param url     请求URL
     * @param param   请求参数
     * @param successCallback  成功回调方法
     * @param failCallback   失败回调方法
     */
    this.ajax = function (method, url, param, successCallback, failCallback) {
        var xmlHttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xmlHttp.open(method, url, true);
        xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var res = JSON.parse(xmlHttp.responseText);
                typeof successCallback == 'function' && successCallback(res);
            } else {
                typeof failCallback == 'function' && failCallback();
            }
        };
        xmlHttp.send("data=" + JSON.stringify(param));
    };

    /**
     * js处理截图
     */
    this.screenShot = function (cntElem, description) {
        var shareContent = cntElem;//需要截图的包裹的（原生的）DOM 对象
        var width = shareContent.offsetWidth; //获取dom 宽度
        var height = shareContent.offsetHeight; //获取dom 高度
        var canvas = document.createElement("canvas"); //创建一个canvas节点
        var scale = 0.3; //定义任意放大倍数 支持小数
        canvas.style.display = "none";
        canvas.width = width * scale; //定义canvas 宽度 * 缩放
        canvas.height = height * scale; //定义canvas高度 *缩放
        canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
        var opts = {
            scale: scale, // 添加的scale 参数
            canvas: canvas, //自定义 canvas
            logging: false, //日志开关，便于查看html2canvas的内部执行流程
            width: width, //dom 原始宽度
            height: height,
            useCORS: true // 【重要】开启跨域配置
        };
        window.html2canvas && window.html2canvas(cntElem, opts).then(function (canvas) {
            var dataURL = canvas.toDataURL("image/webp");
            var tempCompress = dataURL.replace("data:image/webp;base64,", "");
            var compressedDataURL = utils.b64EncodeUnicode(tempCompress);
            var screenShotInfo = new ScreenShotInfo(SCREEN_SHOT, description, compressedDataURL);
            screenShotInfo.handleLogInfo(SCREEN_SHOT, screenShotInfo);
        });
    };

    // 深拷贝方法. 注意: 如果对象里边包含function, 则对function的拷贝依然是浅拷贝
    this.encryptObj = function (o) {
        if (o instanceof Array) {
            var n = [];
            for (var i = 0; i < o.length; ++i) {
                n[i] = this.encryptObj(o[i])
            }
            return n
        } else if (o instanceof Object) {
            var n = {};
            for (var i in o) {
                n[i] = this.encryptObj(o[i])
            }
            return n
        }
        o = o + "";
        if (o.length > 8) {
            o = o.substring(0, 4) + "****" + o.substring(o.length - 3, o.length)
        }
        return o
    };

    // 压缩JSON字符串, 对key进行压缩
    // window.keyArray = localStorage.keyArray ? JSON.parse(localStorage.keyArray) : []
    // window.keyCountArray = window.keyCountArray ? JSON.parse(localStorage.keyArray) : []
    this.compressJson = function (o) {
        if (o instanceof Array) {
            var n = [];
            for (var i = 0; i < o.length; ++i) {
                n[i] = this.compressJson(o[i])
            }
            return n
        } else if (o instanceof Object) {
            var n = {};
            for (var i in o) {
                // if (window.keyArray.indexOf(i) == -1) {
                //   window.keyArray.push(i)
                // }

                // if (window.keyCountArray.length) {
                //   for (var m = 0; m < window.keyCountArray.length; m ++) {
                //     if (window.keyCountArray[m][i]) {
                //       window.keyCountArray[m][i] = window.keyCountArray[m][i] + 1
                //     } else {
                //       window.keyCountArray[m][i] = 1
                //     }
                //   }
                // } else {
                //   var obj = {}
                //   obj[i] = 1
                //   window.keyCountArray.push(obj)
                // }
                if (i == "_cssText") {
                    o[i] = o[i].replace(/ {/g, "{").replace(/; /g, ";").replace(/: /g, ":").replace(/, /g, ",").replace(/{ /g, "{")
                    for (var key in JSON_CSS_KEY) {
                        var cssAttr = JSON_CSS_KEY[key];
                        var cssReg = new RegExp(key, "g");
                        o[i] = o[i].replace(cssReg, cssAttr)
                    }
                }

                if (JSON_KEY[i]) {
                    n[JSON_KEY[i]] = this.compressJson(o[i]);
                    delete n[i]
                } else {
                    n[i] = this.compressJson(o[i])
                }
            }
            return n
        }
        return o
    };

    this.Compress = function (strNormalString) {
        var strCompressedString = "";

        var ht = new Array();
        for (i = 0; i < 128; i++) {
            ht[i] = i;
        }

        var used = 128;
        var intLeftOver = 0;
        var intOutputCode = 0;
        var pcode = 0;
        var ccode = 0;
        var k = 0;

        for (var i = 0; i < strNormalString.length; i++) {
            ccode = strNormalString.charCodeAt(i);
            k = (pcode << 8) | ccode;
            if (ht[k] != null) {
                pcode = ht[k];
            } else {
                intLeftOver += 12;
                intOutputCode <<= 12;
                intOutputCode |= pcode;
                pcode = ccode;
                if (intLeftOver >= 16) {
                    strCompressedString += String.fromCharCode(intOutputCode >> (intLeftOver - 16));
                    intOutputCode &= (Math.pow(2, (intLeftOver - 16)) - 1);
                    intLeftOver -= 16;
                }
                if (used < 4096) {
                    used++;
                    ht[k] = used - 1;
                }
            }
        }

        if (pcode != 0) {
            intLeftOver += 12;
            intOutputCode <<= 12;
            intOutputCode |= pcode;
        }

        if (intLeftOver >= 16) {
            strCompressedString += String.fromCharCode(intOutputCode >> (intLeftOver - 16));
            intOutputCode &= (Math.pow(2, (intLeftOver - 16)) - 1);
            intLeftOver -= 16;
        }

        if (intLeftOver > 0) {
            intOutputCode <<= (16 - intLeftOver);
            strCompressedString += String.fromCharCode(intOutputCode);
        }

        return strCompressedString;
    };

    this.Decompress = function (strCompressedString) {
        var strNormalString = "";
        var ht = new Array();

        for (i = 0; i < 128; i++) {
            ht[i] = String.fromCharCode(i);
        }

        var used = 128;
        var intLeftOver = 0;
        var intOutputCode = 0;
        var ccode = 0;
        var pcode = 0;
        var key = 0;

        for (var i = 0; i < strCompressedString.length; i++) {
            intLeftOver += 16;
            intOutputCode <<= 16;
            intOutputCode |= strCompressedString.charCodeAt(i);

            while (1) {
                if (intLeftOver >= 12) {
                    ccode = intOutputCode >> (intLeftOver - 12);
                    if (typeof (key = ht[ccode]) != "undefined") {
                        strNormalString += key;
                        if (used > 128) {
                            ht[ht.length] = ht[pcode] + key.substr(0, 1);
                        }
                        pcode = ccode;
                    } else {
                        key = ht[pcode] + ht[pcode].substr(0, 1);
                        strNormalString += key;
                        ht[ht.length] = ht[pcode] + key.substr(0, 1);
                        pcode = ht.length - 1;
                    }

                    used++;
                    intLeftOver -= 12;
                    intOutputCode &= (Math.pow(2, intLeftOver) - 1);
                } else {
                    break;
                }
            }
        }
        return strNormalString;
    };

    this.getDevice = function () {
        var device = {};
        var ua = navigator.userAgent;
        var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
        var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
        var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
        var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
        var mobileInfo = ua.match(/Android\s[\S\s]+Build\//);
        device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;
        device.isWeixin = /MicroMessenger/i.test(ua);
        device.os = "web";
        device.deviceName = "PC";
        // Android
        if (android) {
            device.os = 'android';
            device.osVersion = android[2];
            device.android = true;
            device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
        }
        if (ipad || iphone || ipod) {
            device.os = 'ios';
            device.ios = true;
        }
        // iOS
        if (iphone && !ipod) {
            device.osVersion = iphone[2].replace(/_/g, '.');
            device.iphone = true;
        }
        if (ipad) {
            device.osVersion = ipad[2].replace(/_/g, '.');
            device.ipad = true;
        }
        if (ipod) {
            device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
            device.iphone = true;
        }
        // iOS 8+ changed UA
        if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
            if (device.osVersion.split('.')[0] === '10') {
                device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
            }
        }

        // 如果是ios, deviceName 就设置为iphone，根据分辨率区别型号
        if (device.iphone) {
            device.deviceName = "iphone";
            var screenWidth = window.screen.width;
            var screenHeight = window.screen.height;
            if (screenWidth === 320 && screenHeight === 480) {
                device.deviceName = "iphone 4";
            } else if (screenWidth === 320 && screenHeight === 568) {
                device.deviceName = "iphone 5/SE";
            } else if (screenWidth === 375 && screenHeight === 667) {
                device.deviceName = "iphone 6/7/8";
            } else if (screenWidth === 414 && screenHeight === 736) {
                device.deviceName = "iphone 6/7/8 Plus";
            } else if (screenWidth === 375 && screenHeight === 812) {
                device.deviceName = "iphone X/S/Max";
            }
        } else if (device.ipad) {
            device.deviceName = "ipad";
        } else if (mobileInfo) {
            var info = mobileInfo[0];
            var deviceName = info.split(';')[1].replace(/Build\//g, "");
            device.deviceName = deviceName.replace(/(^\s*)|(\s*$)/g, "");
        }
        // 浏览器模式, 获取浏览器信息
        // TODO 需要补充更多的浏览器类型进来
        if (ua.indexOf("Mobile") == -1) {
            var agent = navigator.userAgent.toLowerCase();
            var regStr_ie = /msie [\d.]+;/gi;
            var regStr_ff = /firefox\/[\d.]+/gi;
            var regStr_chrome = /chrome\/[\d.]+/gi;
            var regStr_saf = /safari\/[\d.]+/gi;

            device.browserName = '未知';
            //IE
            if (agent.indexOf("msie") > 0) {
                var browserInfo = agent.match(regStr_ie)[0];
                device.browserName = browserInfo.split('/')[0];
                device.browserVersion = browserInfo.split('/')[1];
            }
            //firefox
            if (agent.indexOf("firefox") > 0) {
                var browserInfo = agent.match(regStr_ff)[0];
                device.browserName = browserInfo.split('/')[0];
                device.browserVersion = browserInfo.split('/')[1];
            }
            //Safari
            if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
                var browserInfo = agent.match(regStr_saf)[0];
                device.browserName = browserInfo.split('/')[0];
                device.browserVersion = browserInfo.split('/')[1];
            }
            //Chrome
            if (agent.indexOf("chrome") > 0) {
                var browserInfo = agent.match(regStr_chrome)[0];
                device.browserName = browserInfo.split('/')[0];
                device.browserVersion = browserInfo.split('/')[1];
            }
        }
        // Webview
        device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);

        // Export object
        return device;
    };
    this.loadJs = function (url, callback) {
        var script = document.createElement('script');
        script.async = 1;
        script.src = url;
        script.onload = callback;
        var dom = document.getElementsByTagName('script')[0];
        dom.parentNode.insertBefore(script, dom);
        return dom;
    };
    this.b64EncodeUnicode = function (str) {
        try {
            return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
                return String.fromCharCode("0x" + p1);
            }));
        } catch (e) {
            return str;
        }
    };
    // 字符串转换成二进制流
    this.char2buf = function (str) {
        var out = new ArrayBuffer(str.length * 2);
        var u16a = new Uint16Array(out);
        var strs = str.split("");
        for (var i = 0; i < strs.length; i++) {
            u16a[i] = strs[i].charCodeAt();
        }
        return out;
    }
}

// 日志基类, 用于其他日志的继承
function MonitorBaseInfo() {
    this.handleLogInfo = function (type, logInfo) {
        var tempString = localStorage[type] ? localStorage[type] : "";
        switch (type) {
            case ELE_BEHAVIOR:
                localStorage[ELE_BEHAVIOR] = tempString + JSON.stringify(logInfo) + '$$$';
                break;
            case JS_ERROR:
                localStorage[JS_ERROR] = tempString + JSON.stringify(logInfo) + '$$$';
                break;
            case HTTP_LOG:
                localStorage[HTTP_LOG] = tempString + JSON.stringify(logInfo) + '$$$';
                break;
            case SCREEN_SHOT:
                localStorage[SCREEN_SHOT] = tempString + JSON.stringify(logInfo) + '$$$';
                break;
            case CUSTOMER_PV:
                localStorage[CUSTOMER_PV] = tempString + JSON.stringify(logInfo) + '$$$';
                break;
            case LOAD_PAGE:
                localStorage[LOAD_PAGE] = tempString + JSON.stringify(logInfo) + '$$$';
                break;
            case RESOURCE_LOAD:
                localStorage[RESOURCE_LOAD] = tempString + JSON.stringify(logInfo) + '$$$';
                break;
            case CUSTOMIZE_BEHAVIOR:
                localStorage[CUSTOMIZE_BEHAVIOR] = tempString + JSON.stringify(logInfo) + '$$$';
                break;
            case VIDEOS_EVENT:
                localStorage[VIDEOS_EVENT] = tempString + JSON.stringify(logInfo) + '$$$';
                break;
            default:
                break;
        }
    };
}

function setCommonProperty() {
    this.happenTime = new Date().getTime(); // 日志发生时间
    this.webMonitorId = WEB_MONITOR_ID;     // 用于区分应用的唯一标识（一个项目对应一个）
    this.simpleUrl = window.location.href.split('?')[0].replace('#', ''); // 页面的url
    this.customerKey = utils.getCustomerKey(); // 用于区分用户，所对应唯一的标识，清理本地数据后失效
    this.pageKey = utils.getPageKey();  // 用于区分页面，所对应唯一的标识，每个新页面对应一个值
    this.deviceName = DEVICE_INFO.deviceName;
    this.os = DEVICE_INFO.os + (DEVICE_INFO.osVersion ? " " + DEVICE_INFO.osVersion : "");
    this.browserName = DEVICE_INFO.browserName;
    this.browserVersion = DEVICE_INFO.browserVersion;
    // TODO 位置信息, 待处理
    this.monitorIp = "";  // 用户的IP地址
    this.country = "china";  // 用户所在国家
    this.province = "";  // 用户所在省份
    this.city = "";  // 用户所在城市
    // 用户自定义信息， 由开发者主动传入， 便于对线上进行准确定位
    this.userId = USER_INFO.userId;
    this.firstUserParam = USER_INFO.firstUserParam;
    this.secondUserParam = USER_INFO.secondUserParam;
}

/**
 * 页面JS错误监控
 */
function recordJavaScriptError() {
    // 重写console.error, 可以捕获更全面的报错信息
    var oldError = console.error;
    console.error = function () {
        jsMonitorStarted = false;
        // arguments的长度为2时，才是error上报的时机
        // if (arguments.length < 2) return;
        var errorMsg = arguments[0] && arguments[0].message;
        var url = WEB_LOCATION;
        var lineNumber = 0;
        var columnNumber = 0;
        var errorObj = arguments[0] && arguments[0].stack;
        if (!errorObj) errorObj = arguments[0];
        // 如果onerror重写成功，就无需在这里进行上报了
        !jsMonitorStarted && siftAndMakeUpMessage(errorMsg, url, lineNumber, columnNumber, errorObj);
        alert(oldError.apply(console, arguments));
        return oldError.apply(console, arguments);
    };

    // 重写 onerror 进行jsError的监听
    window.onerror = function (errorMsg, url, lineNumber, columnNumber, errorObj) {
        jsMonitorStarted = true;
        var errorStack = errorObj ? errorObj.stack : null;
        siftAndMakeUpMessage(errorMsg, url, lineNumber, columnNumber, errorStack);
    };

    function siftAndMakeUpMessage(origin_errorMsg, origin_url, origin_lineNumber, origin_columnNumber, origin_errorObj) {
        var errorMsg = origin_errorMsg ? origin_errorMsg : '';
        var errorObj = origin_errorObj ? origin_errorObj : '';
        var errorType = "";
        if (errorMsg) {
            var errorStackStr = JSON.stringify(errorObj);
            errorType = errorStackStr.split(": ")[0].replace('"', "");
        }

        var javaScriptErrorInfo = new JavaScriptErrorInfo(JS_ERROR, errorType + ": " + errorMsg, errorObj);
        javaScriptErrorInfo.handleLogInfo(JS_ERROR, javaScriptErrorInfo);
    }
}

// JS错误日志，继承于日志基类MonitorBaseInfo
function JavaScriptErrorInfo(uploadType, errorMsg, errorStack) {
    setCommonProperty.apply(this);
    this.uploadType = uploadType;
    this.errorMessage = encodeURIComponent(errorMsg);
    this.errorStack = errorStack;
    this.browserInfo = BROWSER_INFO;
}

JavaScriptErrorInfo.prototype = new MonitorBaseInfo();

// 接口请求日志，继承于日志基类MonitorBaseInfo
function HttpLogInfo(uploadType, simpleUrl, url, status, statusText, statusResult, responseText, currentTime, loadTime) {
    setCommonProperty.apply(this);
    this.uploadType = uploadType;  // 上传类型
    this.simpleUrl = simpleUrl;
    this.httpUrl = utils.b64EncodeUnicode(encodeURIComponent(url)); // 请求地址
    this.status = status; // 接口状态
    this.statusText = statusText; // 状态描述
    this.statusResult = statusResult; // 区分发起和返回状态
    this.requestText = ""; // 请求参数的JSON字符串
    this.responseText = utils.b64EncodeUnicode(responseText); // 返回的结果JSON字符串
    this.happenTime = currentTime;  // 客户端发送时间
    this.loadTime = loadTime; // 接口请求耗时
}

HttpLogInfo.prototype = new MonitorBaseInfo();


/**
 * 页面接口请求监控
 */
function recordHttpLog() {

    // 监听ajax的状态
    function ajaxEventTrigger(event) {
        var ajaxEvent = new CustomEvent(event, {detail: this});
        window.dispatchEvent(ajaxEvent);
    }

    var oldXHR = window.XMLHttpRequest;

    function newXHR() {
        var realXHR = new oldXHR();
        realXHR.addEventListener('abort', function () {
            ajaxEventTrigger.call(this, 'ajaxAbort');
        }, false);
        realXHR.addEventListener('error', function () {
            ajaxEventTrigger.call(this, 'ajaxError');
        }, false);
        realXHR.addEventListener('load', function () {
            ajaxEventTrigger.call(this, 'ajaxLoad');
        }, false);
        realXHR.addEventListener('loadstart', function () {
            ajaxEventTrigger.call(this, 'ajaxLoadStart');
        }, false);
        realXHR.addEventListener('progress', function () {
            ajaxEventTrigger.call(this, 'ajaxProgress');
        }, false);
        realXHR.addEventListener('timeout', function () {
            ajaxEventTrigger.call(this, 'ajaxTimeout');
        }, false);
        realXHR.addEventListener('loadend', function () {
            ajaxEventTrigger.call(this, 'ajaxLoadEnd');
        }, false);
        realXHR.addEventListener('readystatechange', function () {
            ajaxEventTrigger.call(this, 'ajaxReadyStateChange');
        }, false);
        // 此处的捕获的异常会连日志接口也一起捕获，如果日志上报接口异常了，就会导致死循环了。
        // realXHR.onerror = function () {
        //   siftAndMakeUpMessage("Uncaught FetchError: Failed to ajax", WEB_LOCATION, 0, 0, {});
        // }
        return realXHR;
    }

    function handleHttpResult(i, tempResponseText) {
        if (!timeRecordArray[i] || timeRecordArray[i].uploadFlag === true) {
            return;
        }
        var responseText = "";
        if (tempResponseText && responseText.length < 300) {
            try {
                responseText = tempResponseText ? JSON.stringify(utils.encryptObj(JSON.parse(tempResponseText))) : "";
            } catch (e) {
                responseText = "";
            }
        } else {
            responseText = "data is too long";
        }
        var simpleUrl = timeRecordArray[i].simpleUrl;
        var currentTime = new Date().getTime();
        var url = timeRecordArray[i].event.detail.responseURL;
        var status = timeRecordArray[i].event.detail.status;
        var statusText = timeRecordArray[i].event.detail.statusText;
        var loadTime = currentTime - timeRecordArray[i].timeStamp;
        if (!url || url.indexOf(HTTP_UPLOAD_LOG_API) != -1) return;
        var httpLogInfoStart = new HttpLogInfo(HTTP_LOG, simpleUrl, url, status, statusText, "发起请求", "", timeRecordArray[i].timeStamp, 0);
        httpLogInfoStart.handleLogInfo(HTTP_LOG, httpLogInfoStart);
        var httpLogInfoEnd = new HttpLogInfo(HTTP_LOG, simpleUrl, url, status, statusText, "请求返回", responseText, currentTime, loadTime);
        httpLogInfoEnd.handleLogInfo(HTTP_LOG, httpLogInfoEnd);
        // 当前请求成功后就，就将该对象的uploadFlag设置为true, 代表已经上传了
        timeRecordArray[i].uploadFlag = true;
    }

    var timeRecordArray = [];
    window.XMLHttpRequest = newXHR;
    window.addEventListener('ajaxLoadStart', function (e) {
        var tempObj = {
            timeStamp: new Date().getTime(),
            event: e,
            simpleUrl: window.location.href.split('?')[0].replace('#', ''),
            uploadFlag: false,
        };
        timeRecordArray.push(tempObj)
    });

    window.addEventListener('ajaxLoadEnd', function () {
        for (var i = 0; i < timeRecordArray.length; i++) {
            // uploadFlag == true 代表这个请求已经被上传过了
            if (timeRecordArray[i].uploadFlag === true) continue;
            if (timeRecordArray[i].event.detail.status > 0) {
                var rType = (timeRecordArray[i].event.detail.responseType + "").toLowerCase()
                if (rType === "blob") {
                    (function (index) {
                        var reader = new FileReader();
                        reader.onload = function () {
                            var responseText = reader.result;//内容就在这里
                            handleHttpResult(index, responseText);
                        };
                        try {
                            reader.readAsText(timeRecordArray[i].event.detail.response, 'utf-8');
                        } catch (e) {
                            handleHttpResult(index, timeRecordArray[i].event.detail.response + "");
                        }
                    })(i);
                } else {
                    var responseText = timeRecordArray[i].event.detail.responseText;
                    handleHttpResult(i, responseText);
                }
            }
        }
    });
}

/**
 * 监控初始化配置, 以及启动的方法
 */
function init() {
    try {
        // 启动监控
        // recordResourceError();
        // recordPV();
        // recordLoadPage();
        // recordBehavior({record: 1});
        recordJavaScriptError();
        recordHttpLog();
        /**
         * 添加一个定时器，进行数据的上传
         * 200毫秒钟进行一次URL是否变化的检测
         * 8秒钟进行一次数据的检查并上传; PS: 这个时间有可能跟后台服务的并发量有着直接，谨慎设置
         */
        var timeCount = 0;
        var waitTimes = 0;
        var typeList = [ELE_BEHAVIOR, JS_ERROR, HTTP_LOG, SCREEN_SHOT, CUSTOMER_PV, LOAD_PAGE, RESOURCE_LOAD, CUSTOMIZE_BEHAVIOR, VIDEOS_EVENT];
        setInterval(function () {
            checkUrlChange();
            // 进行一次上传
            if (timeCount >= 40) {
                // 如果是本地的localhost, 就忽略，不进行上传
                // if (window.location.href.indexOf("localhost") != -1) return;
                var logInfo = "";
                for (var i = 0; i < typeList.length; i++) {
                    logInfo += (localStorage[typeList[i]] || "");
                }
                // 收集到日志的数量如果小于10，则不进行上传，减少后台服务短时间内的并发量。
                // 如果，经过3次判断还没有收集到10个日志，则进行上传
                // 风险：有可能会丢失掉用户最后一段时间的操作信息，如果，最后几步操作信息很重要，可以选择删除这段逻辑
                var logInfoCount = logInfo.split("$$$").length;
                if (logInfoCount < 10 && waitTimes < 2) {
                    waitTimes++;
                    timeCount = 0;
                    return;
                }
                waitTimes = 0;

                logInfo.length > 0 && utils.ajax("POST", HTTP_UPLOAD_LOG_INFO, {logInfo: logInfo}, function () {
                    for (var i = 0; i < typeList.length; i++) {
                        localStorage[typeList[i]] = "";
                    }
                }, function () { // 如果失败了， 也需要清理掉本地缓存， 否则会积累太多
                    for (var i = 0; i < typeList.length; i++) {
                        localStorage[typeList[i]] = "";
                    }
                });
                timeCount = 0;
            }
            timeCount++;
        }, 200);
    } catch (e) {
        console.error("监控代码异常，捕获", e);
    }
}

// 获取当前url
defaultLocation = window.location.href.split('?')[0].replace('#', '');

/**
 * 用户访问记录监控
 * @param project 项目详情
 */
function checkUrlChange() {
    // 如果是单页应用， 只更改url
    var webLocation = window.location.href.split('?')[0].replace('#', '');
    // 如果url变化了， 就把更新的url记录为 defaultLocation, 重新设置pageKey
    if (defaultLocation != webLocation) {
        recordPV();
        defaultLocation = webLocation;
    }
}

/**
 * 添加一个定时器，进行数据的上传
 * 2秒钟进行一次URL是否变化的检测
 * 10秒钟进行一次数据的检查并上传
 */
var timeCount = 0;
setInterval(function () {
    checkUrlChange();
    // 循环5后次进行一次上传
    if (timeCount >= 25) {
        // 如果是本地的localhost, 就忽略，不进行上传


        var logInfo = (localStorage[ELE_BEHAVIOR] || "") +
            (localStorage[JS_ERROR] || "") +
            (localStorage[HTTP_LOG] || "") +
            (localStorage[SCREEN_SHOT] || "") +
            (localStorage[CUSTOMER_PV] || "") +
            (localStorage[LOAD_PAGE] || "") +
            (localStorage[RESOURCE_LOAD] || "");

        if (logInfo) {
            localStorage[ELE_BEHAVIOR] = "";
            localStorage[JS_ERROR] = "";
            localStorage[HTTP_LOG] = "";
            localStorage[SCREEN_SHOT] = "";
            localStorage[CUSTOMER_PV] = "";
            localStorage[LOAD_PAGE] = "";
            localStorage[RESOURCE_LOAD] = "";
            utils.ajax("POST", HTTP_UPLOAD_LOG_INFO, {logInfo: logInfo}, function (res) {
            }, function () {
            })
        }
        timeCount = 0;
    }
    timeCount++;
}, 200);


/**
 *
 * @param method  请求类型(大写)  GET/POST
 * @param url     请求URL
 * @param param   请求参数
 * @param successCallback  成功回调方法
 * @param failCallback   失败回调方法
 */
this.ajax = function (method, url, param, successCallback, failCallback) {
    var xmlHttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xmlHttp.open(method, url, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var res = JSON.parse(xmlHttp.responseText);
            typeof successCallback == 'function' && successCallback(res);
        } else {
            typeof failCallback == 'function' && failCallback();
        }
    };
    xmlHttp.send("data=" + JSON.stringify(param));
};