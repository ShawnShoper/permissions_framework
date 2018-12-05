/**
 * Created by chengwb on 2016/8/6.
 * 备注：
 *  命名规则：函数的名称应该使用动词+名词，变量名则最好使用名词。
 *      常量区变量请全部用大写字母,且单词间用下划线链接；
 *      方法名、普通变量名请使用小驼峰命名规则，即除了第一个单词的首字母外其余单词首字母大写。
 */
(function (global, $) {
    global.tools = global.tools || {};

    /***********************************************************
     *********************** 常量区 *****************************
     **********************************************************/
        //暂无数据
    global.tools.NO_DATA = '<p class="no_data">暂无数据！</p>';
    global.tools.NO_DATA1 = '<p class="no_data1">暂无数据！</p>';
    //获取数据失败，刷新页面
    global.tools.TRY_REFRESH = '<p class="try_refresh">获取服务器数据失败，请尝试刷新浏览器页面！</p>';
    global.tools.TRY_REFRESH1 = '<p class="try_refresh1">获取服务器数据失败，请尝试刷新浏览器页面！</p>';

    /***********************************************************
     *********************** 方法区 *****************************
     **********************************************************/
    /**
     * 正在加载中提示
     * @param option
     *  可以是对象
     *  {
     *      selector: '',//选择器
     *      position: ''//插入的位置（相对于选择器而言）before/in/after,前、中、后
    *  }
     *  也可以是字符串(表示selector，插入位置默认为in)
     * @param custom 回调函数，可以加工loadTip也可以自定义提示
     * @returns {{clean: clean}} 如果自定义loadTip则clean可能无效，需要自己根据自定义的tip进行清空处理（先使用着，待完善处理）
     */
    global.tools.loading = function (option, custom) {
        var loadTip = '<div class="loading_tips"><img src="images/loading_max.gif"><p>数据加载中...</p></div>';
        if (custom && $.isFunction(custom)) {
            loadTip = custom(loadTip);
        }

        if (typeof option === 'string') {
            $(option).append(loadTip);
        } else {
            switch (option.position) {
                case 'in':
                    $(option.selector).append(loadTip);
                    break;
                case 'after':
                    $(option.selector).after(loadTip);
                    break;
                case 'before':
                    $(option.selector).before(loadTip);
                    break;
                default:
                    $(option.selector).append(loadTip);
                    break;
            }
        }

        function clean() {
            if (typeof option === 'string') {
                $(option + ' .loading_tips').remove();
            } else {
                switch (option.position) {
                    case 'in':
                        $(option.selector + ' .loading_tips').remove();
                        break;
                    case 'after':
                    case 'before':
                        $(option.selector).siblings('.loading_tips').remove();
                        break;
                    default:
                        $(option.selector + ' .loading_tips').remove();
                        break;
                }
            }
        }

        return {
            clean: clean
        };
    };

    /**
     * 内容长度限制，转换为省略号结尾
     * @param content 目标内容
     * @param length 限制的长度
     * @returns {*} 超过限制长度的数据则返回限制长度的字符串加上...，没超过则原文返回
     */
    global.tools.ellipsisContent = function (content, length) {
        var result;

        if (!content || typeof content !== 'string' ||
            typeof length !== 'number' || content.length <= length || length <= 0) {
            result = content;
        } else {
            result = content.substr(0, length) + "...";
        }
        return result;
    };

    /**
     * 图片加载异常时调用，一般用于img中的onerror=tools.errImg(this)
     * @param tag
     */
    global.tools.errImg = function (el) {
        el.src = "/images/bad.jpg";
        el.onerror = null;
    };

    /**
     * 瀑布流图片加载异常时调用，一般用于img中的onerror
     * @param el 当前图片元素
     * @param defaultHeight 设置该元素的高度，默认为bad.jpg的高度
     */
    global.tools.waterfallErrImg = function (el, defaultHeight) {
        defaultHeight = defaultHeight || 240;//240px为bad.jpg的高度
        $(el).height(defaultHeight);

        el.src = "/images/bad.jpg";
        el.onerror = null;
    };

    /**
     *百度分享
     */
    global.tools.share = function () {
        window._bd_share_config = {
            "common": {
                "bdSnsKey": {},
                "bdText": "",
                "bdMini": "2",
                "bdDesc": "",
                "bdMiniList": false,
                "bdPic": "",
                "bdUrl": "",
                "bdStyle": "2",
                "bdSize": "16"/*,
                 "bdPopupOffsetLeft": "30"*/
            },
            "share": {}
        };
        with (document)0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];
    };

    /**
     * 日期处理，
     * @param dataStr 需要处理的日期字符串，如果不传递则默认为当前时间
     * @returns {{getCurrentYear: getCurrentYear, getCurrentMonth: getCurrentMonth, renderYears: renderYears, renderMonths: renderMonths}}
     */
    global.tools.date = function (time) {
        var year = 1970;
        var month = 1;
        var day = 1;
        var date = new Date();
        //var reg = new RegExp("-");//火狐不兼容

        if (time) {
            if (typeof time === 'string') {
                date = new Date(time.replace(/-/g, "/"));
            } else if (typeof time === 'number') {
                date = new Date(time);
            }
        }

        year = date.getFullYear();
        month = date.getMonth() + 1;
        day = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var week = date.getDay();

        function getCurrentYear() {
            return year;
        }

        function getCurrentMonth() {
            return month;
        }

        function getDay() {
            return day;
        }

        function getHour() {
            return hours;
        }

        function getDate(separator) {
            return year + separator + month + separator + day;
        }

        function getTime() {
            return (hours < 10 ? ('0' + hours) : hours) + ':' +
                (minutes < 10 ? ('0' + minutes) : minutes) + ':' +
                (seconds < 10 ? ('0' + seconds) : seconds);
        }

        function getWeek() {
            var weekDesc = '星期';

            switch (week) {
                case 1:
                    weekDesc += '一';
                    break;
                case 2:
                    weekDesc += '二';
                    break;
                case 3:
                    weekDesc += '三';
                    break;
                case 4:
                    weekDesc += '四';
                    break;
                case 5:
                    weekDesc += '五';
                    break;
                case 6:
                    weekDesc += '六';
                    break;
                case 0:
                    weekDesc += '日';
                    break;
                default:
                    break;
            }
            return weekDesc;
        }

        /**
         * 渲染select的选项
         * @param select select的选择器
         * @param from 从哪一年开始，不设置默认是1970
         * @param to   到那一年，不设置默认为当前年份
         */
        function renderYears(select, from, to) {
            var options = '';
            var startYear = 1970;
            var endYear = year;
            var $select = $(select);

            if (from && $.isNumeric(from)) {
                startYear = from;
            }
            if (to && $.isNumeric(to)) {
                endYear = to;
            }

            var i = endYear;
            for (i; i >= startYear; i--) {
                options += '<option value="' + i + '">' + i + '年</option>';
            }

            $select.empty();
            $select.append(options);
        }

        /**
         * 渲染select的选项
         * @param select select的选择器
         * @param from 从哪一年开始，不设置默认是1970
         * @param to   到那一年，不设置默认为当前年份
         */
        function renderSpecialYears(select, years) {
            var options = '';
            var $select = $(select);

            var i = 0;
            var length = years.length;
            for (i = 0; i < length; i++) {
                options += '<option value="' + years[i] + '">' + years[i] + '年</option>';
            }

            $select.empty();
            $select.append(options);
        }

        /**
         * 渲染select中月份选项
         * @param select select的选择器
         * @param assignYear 指定那一年，没指定则1-12月
         */
        function renderMonths(select, assignYear) {
            var options = '';
            var startMonth = 1;
            var endMonth = 12;
            var $select = $(select);

            if (assignYear && $.isNumeric(assignYear)) {
                if (year == assignYear) {
                    endMonth = month;
                }
            }

            var i = startMonth;
            for (i; i <= endMonth; i++) {
                options += '<option value="' + i + '">' + i + '月</option>';
            }

            $select.empty();
            $(select).append(options);

            if (assignYear && $.isNumeric(assignYear)) {
                if (year == assignYear) {
                    $select.val(month);
                }
            }
        }

        /**
         * 格式化时间
         * @param format 默认为'yyyy-MM-dd hh:mm'
         * @returns {*}
         */
        function format(format) {
            if (!format) {
                format = 'yyyy-MM-dd hh:mm';
            }
            var time = {
                "M+": month,
                "d+": day,
                "h+": hours,
                "m+": minutes,
                "s+": seconds,
                "q+": Math.floor((month + 2) / 3),
                "S+": date.getMilliseconds()
            };
            if (/(y+)/i.test(format)) {
                format = format.replace(RegExp.$1, (year + '').substr(4 - RegExp.$1.length));
            }
            for (var k in time) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length === 1 ?
                        time[k] : ("00" + time[k]).substr(("" + time[k]).length));
                }
            }
            return format;
        }

        return {
            format: format,
            getYear: getCurrentYear,
            getMonth: getCurrentMonth,
            getDay: getDay,
            getTime: getTime,
            getDate: getDate,
            getHour: getHour,
            getWeek: getWeek,
            renderYears: renderYears,
            renderSpecialYears: renderSpecialYears,
            renderMonths: renderMonths
        };
    };

    /**
     * 格式化数字，例如：12300400格式化为12,300,400
     * @param number
     */
    global.tools.formatDigital = function (number) {
        var result = number;

        if (!number || !$.isNumeric(number)) {
            return result;
        }

        var numberStr = number.toString();
        var pointIndex = numberStr.indexOf('.');
        var lastIndex = numberStr.length - 1;

        if (pointIndex >= 0) {
            lastIndex = pointIndex - 1;
        }

        result = '';
        var count = 1;
        for (var i = lastIndex; i >= 0; i--, count++) {
            var temp = numberStr[i];

            result = temp + result;
            if (count % 3 === 0 && i !== 0) {
                result = ',' + result;
            }
        }

        return result;
    };

    /**
     * 初始定位侧边悬浮导航。注意使用时，侧边导航栏高度请设置为auto。
     * @param options
     * {
	 *  wrapper: 外框选择器（包含侧边栏和内容区）
	 *  head：头部，没有则设置为空；
	 *  foot: 底部，没有则设置为空；
	 *  contentStartIndex: 内容列表有效起始索引；
	 *  navStartIndex: 导航栏列表有效起始索引;
	 *  sideNav: 导航栏选择器，例子id:'#nav',class:'.nav'
	 *  sideNavEntry: 导航栏列表选择器，例子li元素：'li',class:'.entry'；（与sideNav是父子关系）
	 *  content: 内容区选择器
	 *  contentEntry: 内容区列表选择器（与content是父子关系）;
	 *  selectClass: 选中的侧边导航栏的选项class，如：'curr';
	 *  currIndex: 设置默认选中的导航栏索引,-1表示不设置；
	 *  scrollAnimate: true则使用动画，false为不使用，默认为使用动画;
	 *  position: 侧边导航栏原始定位方式，absolute(float布局)，relative（非float布局）
	 * }
     */
    global.tools.sideNavInit = function (options) {
        //待检查参数
        var animate = !!options.scrollAnimate || true;
        var headHeight = options.head ? $(options.head).height() : 0;
        var footHeight = options.foot ? $(options.foot).height() : 0;
        var windowHeight = $(window).height();
        var sideNavHeight = windowHeight - headHeight;
        var clickIndex = -1; //导航栏鼠标点击的元素的索引
        var contentStartIndex = options.contentStartIndex;//内容列表起始索引
        var navStartIndex = options.navStartIndex;//导航栏列表起始索引
        var $sideNav = $(options.sideNav);
        var sideNavInitHeight = $sideNav.height();
        var $sideNavLi = $(options.sideNav + ' > ' + options.sideNavEntry);
        var $contentLi = $(options.content + ' > ' + options.contentEntry);
        var selectClass = options.selectClass;
        var defaultIndex = options.currIndex;

        var nav2HeadDistance = $sideNav.offset().top - headHeight;//侧边导航栏到头部的距离
        var scrollDistance = 0;//滚动条滚动的距离

        //设置左边导航的高度,
        if (sideNavHeight > sideNavInitHeight) {
            $sideNav.css("height", sideNavHeight);
        } else {
            sideNavHeight = sideNavInitHeight + footHeight;
            $sideNav.css("height", sideNavHeight);
        }

        /**
         * 窗口自动定位
         */
        function clickPosition() {
            var targetIndex = clickIndex - navStartIndex + contentStartIndex;
            var entryTop = $contentLi.eq(targetIndex).offset().top;

            scrollWindow(entryTop, function () {
                if (clickIndex > -1) {
                    $sideNavLi.eq(clickIndex).addClass(selectClass).siblings('.' + selectClass).removeClass(selectClass);
                    clickIndex = -1;
                }
            });
        }

        /**
         * 滚动窗口
         * @param scrollTop 窗口滚动的距离
         * @param done 滚动完成后的回调
         */
        function scrollWindow(scrollTop, done) {
            if (animate) {
                $('html, body').stop(true).animate({
                    scrollTop: scrollTop - headHeight
                }, {
                    duration: 100,
                    always: done //动画不管完没完成总是会执行这个回调
                });
            } else {
                //不使用动画
                $('html, body').scrollTop(scrollTop - headHeight);
                done();
            }
        }

        /**
         * 图片加载过程中，定位校正
         */
        function regulatePosition() {
            var selectedNavIndex = $sideNav.find('.' + selectClass).index();
            var length = $contentLi.length;
            var absIndex = selectedNavIndex - navStartIndex;
            var sideNavTop = $sideNav.offset().top;
            var mistake = 5;//误差范围，浏览器滚动一次长度不一致

            var currContentTop = $contentLi.eq(absIndex + contentStartIndex).offset().top;
            var nextContentTop = absIndex < length - 1 ? $contentLi.eq(absIndex + 1 + contentStartIndex).offset().top : 99999;

            if (sideNavTop >= currContentTop - mistake &&
                sideNavTop < nextContentTop - mistake) {

                return;
            }

            scrollWindow(currContentTop, function () {
                $sideNavLi.eq(selectedNavIndex).addClass(selectClass).siblings('.' + selectClass).removeClass(selectClass);
            });
        }

        //导航栏点击事件
        $sideNav.on("click", options.sideNavEntry, function () {
            clickIndex = $(this).index();

            //如果点击的导航栏条目的index小于有效的导航栏起始index则不处理，即不是有效的栏目就不处理事件
            if (clickIndex < navStartIndex) {
                return;
            }

            //自动对齐导航栏和内容
            clickPosition();
        });

        //窗口大小变化事件，动态修改侧边栏位置
        $(window).on('resize', function () {
            //如果侧边导航栏是处于悬浮状态则动态修改位置
            if ($sideNav.css('position') === 'fixed') {
                var left = $(options.wrapper).offset().left;
                $sideNav.css({left: left + 'px'});
            }
        });

        $(window).on("scroll", function () {
            scrollDistance = $(document).scrollTop();

            //如果窗口的滚动距离大于了侧边导航栏到头部的距离则悬浮侧边导航栏
            if (scrollDistance > nav2HeadDistance) {
                var left = $(options.wrapper).offset().left;
                var footTop = footHeight === 0 ? $('html').height() : $(options.foot).offset().top;

                //左侧导航栏数据区域的底部抵达foot的时候，如果用户继续往下滚动则保持左侧导航栏数据区底部与foot相切
                var distance = (scrollDistance + headHeight + sideNavInitHeight) - footTop;
                if (distance > 0) {
                    $sideNav.css({position: "fixed", top: (headHeight - distance) + "px", left: left + 'px'});
                } else {
                    $sideNav.css({position: "fixed", top: headHeight + "px", left: left + 'px'});
                }
            } else {
                if ($sideNav.css('position') !== 'absolute') {
                    $sideNav.css({position: 'absolute', top: "0", left: '0'});
                }
            }

            //根据窗口滚动情况动态设置左边导航栏的选中项
            autoSelectNav();
        });

        /**
         * 左侧导航栏根据窗口滚动情况自动选择选项
         */
        function autoSelectNav() {
            var length = $contentLi.length;
            var sideNavTop = $sideNav.offset().top;
            var mistake = 5;//误差范围，浏览器滚动一次长度不一致

            //当左侧导航栏的位置在右边内容列表的某个条目内，则设置侧边导航栏选中该条目对应的选项（通过index对应）
            for (var i = 0; i < length; i++) {
                var currContentTop = $contentLi.eq(i + contentStartIndex).offset().top;
                var nextContentTop = i < length - 1 ? $contentLi.eq(i + 1 + contentStartIndex).offset().top : 99999;

                if (sideNavTop >= currContentTop - mistake &&
                    sideNavTop < nextContentTop - mistake) {

                    if (clickIndex > -1 && clickIndex !== i + navStartIndex) {
                        return;
                    }

                    $sideNavLi.eq(i + navStartIndex).addClass(selectClass).siblings('.' + selectClass).removeClass(selectClass);
                    break;
                }
            }
        }

        /**
         * 图片加载过程中校正被影响的定位。每加载完一张就校正定位（待优化为每正在加载一张就校正定位，难度较大）。
         * 此方法使用在进入页面就有默认定位时，如果没有默认定位则不必调用。
         */
        function perImgLoadPosition() {
            $contentLi.find('img').each(function (index) {
                //之前用deferred是想到等所有图片加载完后才校正位置；
                //后来经过优化每张图片加载完成就校正，发现deferred用在这儿就已经失去了意义
                //var deferred = $.Deferred();
                //$(this).load(deferred.resolve);
                //
                //images.push(deferred);
                //$.when(images[index]).done(function () {
                //	regulatePosition();
                //});

                $(this).load(regulatePosition);
            });
        }

        //刚进入页面，如果设置了默认定位则定位
        if (defaultIndex >= 0) {
            $sideNavLi.eq(defaultIndex).click();
            perImgLoadPosition();
        }
    };

    /**
     * ajax方法，统一处理
     * @param options
     * @param todo
     */
    global.tools.executeRequest = function (options, todo) {
        var prefix = (options.prefix !== undefined && options.prefix !== null) ? '/' + options.prefix : '';

        $.ajax({
            cache: false,//放置IE浏览器缓存
            url: prefix + options.url,
            traditional:true,
            type: options.method || 'post',
            data: options.data || null,
            beforeSend: function (xhr) {
                var token = $("meta[name='_csrf']").attr("content");
                var header = $("meta[name='_csrf_header']").attr("content");
                xhr.setRequestHeader(header, token);
            },
            complete: function (jqXHR, textStatus) {
                if (textStatus === 'success') {
                    var result = $.parseJSON(jqXHR.responseText);

                    //特殊处理
                    if (result.status) {
                        if (result.status === 302) {
                            alert('您已经登录过，为您跳转到首页!');
                            window.location.href = result.url;
                        } else if (jqXHR.status === 401 || jqXHR.status === 403) {
                            alert('您无权限，或者会话已过期，请重新登录!');
                            window.location.href = result.url;
                        }
                    }

                    todo(result);
                } else if (textStatus === 'timeout') {
                    todo({
                        error: true,
                        message: '服务器响应超时'
                    });
                } else {
                    var result;
                    if (jqXHR.responseText) {
                        result = $.parseJSON(jqXHR.responseText);
                    }

                    if (jqXHR.status === 401 || jqXHR.status === 403) {
                        alert('您无权限，或者会话已过期，请重新登录!');
                        window.location.href = '/login-font.html';
                        return;
                    }

                    if (jqXHR.status === 400) {
                        todo({
                            error: true,
                            message: result ? result.message : '参数错误'
                        });
                    } else {
                        todo({
                            error: true,
                            message: result ? result.message : '服务器错误'
                        });
                    }
                }
            }
        });

    };

    /**
     * 计算字符长度，一个英文字符占一个长度，一个汉字字符占两个长度
     * @param str 字符串
     * @returns {*} 长度
     */
    global.tools.strLength = function (str) {
        var realLength = 0;
        var length = str.length;
        var charCode = 0;

        for (var i = 0; i < length; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) {
                realLength += 1;
            } else {
                realLength += 2;
            }
        }

        return realLength;
    };

    /**
     * 提示
     * @param option
     * {
     *  message: 要提示的信息
     *  time: 显示时间，单位毫秒
     *  easing: 查看fadeOut相关参数，默认是linear线性
     *  complete: 提示后执行,
     *  before: 提示前执行
     * }
     */
    global.tools.tip = function (option) {
        var tipHtml = '<div class="tip_box">' + (option.message || '') + '</div>';
        if (option.before && typeof option.before === 'function') {
            option.before();
        }

        $(tipHtml).appendTo('body').fadeOut(option.time || 2000, option.easing || 'linear', function () {
            $(this).remove();

            if (option.complete && typeof option.complete === 'function') {
                option.complete();
            }
        });
    };

    /**
     * 处理信息
     * @param option
     * {
     *  message: 要提示的信息
     * }
     */
    global.tools.process = function (message) {
        var tipHtml = '<div class="tip_box">' + (message || '请不要切换页面，系统正在处理中') + '···</div>';
        var $targetTip = $(tipHtml).appendTo('body');
        var count = 1;
        var timer = setInterval(function () {
            $targetTip.html((message || '请不要切换页面，系统正在处理中') + (count % 3 === 1 ? '·' : (count % 3 === 2 ? '··' : '···')));
            count = count % 3 + 1;
        }, 500);

        return {
            remove: function () {
                clearInterval(timer);
                timer = 0;

                $targetTip.remove();
            }
        }
    };

    /**
     * 确认提示框
     * @param option
     * {
     *    selector: 添加提示框的选择器，默认为body
     *    count: 操作的条数
     *    sure: 确认回调
     * }
     */
    global.tools.confirm = function (option) {
        var selector = option.selector || 'body';
        var html = '<div class="tip_mask">' +
            '<div class="tip_confirm">' +
            '<p class="confirm_text">' + (option.message ? option.message : ('确定要删除这' + (option.count || '') + '条数据吗？')) + '</p>' +
            '<p class="confirm_btn clearfix">' +
            '<span class="fl btn_sure">确定</span>' +
            '<span class="fr btn_cancel">我再考虑考虑</span>' +
            '</p></div></div>';

        $(selector).append(html);

        $(selector).on('click', '.tip_mask .btn_sure', function (event) {
            $(selector).find('.tip_mask').remove();

            if (option.sure && typeof option.sure === 'function') {
                option.sure();
            }
        }).on('click', '.tip_mask .btn_cancel', function (event) {
            $(selector).find('.tip_mask').remove();

            if (option.cancel && typeof option.cancel === 'function') {
                option.cancel();
            }
        });
    };

    /**
     * 输入校验
     * @param option
     * {
     * 	types: [] 校验类型 email、url等
     * 	other: {
     * 		min:
     * 		max:
     *		length:
     *	   range: [0, 10]
     * 	}
     * 	lang: 'en'|'ch' 语言类型，en英文格式，ch中文格式（一般针对长度限制判断），默认为en
     * 	defaultTip: 默认提示
     * }
     * @returns {{check: (*|$.check|Function)}}
     */
    global.tools.contentCheck = function (content, option) {
        var types = option.types || [];
        var other = option.other || {};
        var lang = option.lang || 'en';

        function charLength(str) {
            var realLength = 0;
            var length = str.length;
            var charCode = 0;

            for (var i = 0; i < length; i++) {
                charCode = str.charCodeAt(i);
                if (charCode >= 0 && charCode <= 128) {
                    realLength += 1;
                } else {
                    realLength += 2;
                }
            }

            return realLength;
        }

        var methods = {
            required: function (value) {
                return !!value;
            },
            email: function (value) {
                return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
            },
            url: function (value) {
                //return /^(http|https|ftp)\:\/\/([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)?((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.[a-zA-Z]{2,4})(\:[0-9]+)?(\/[^/][a-zA-Z0-9\.\,\?\'\\/\+&amp;%\$#\=~_\-@]*)*$/.test(value);
                return /^((http|ftp|https):\/\/)(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(\/[a-zA-Z0-9\&%_\./-~-]*)?$/.test(value);
                //return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);//jquery 自带
            },
            date: function (value) {
                return !/Invalid|NaN/.test(new Date(value).toString());
            },
            dateISO: function (value) {
                return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
            },
            number: function (value) {
                return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
            },
            digits: function (value) {
                return /^\d+$/.test(value);
            },
            minlength: function (value, param) {
                var length = charLength(value);

                return (lang === 'ch' ? length / 2 : length) >= param;
            },
            maxlength: function (value, param) {
                var length = charLength(value);

                return (lang === 'ch' ? length / 2 : length) <= param;
            },
            min: function (value, param) {
                return value >= param;
            },
            max: function (value, param) {
                return value <= param;
            },
            range: function (value, param) {
                return ( value >= param[0] && value <= param[1] );
            }
        };

        for (var i = 0; i < types.length; i++) {
            switch (types[i]) {
                case 'required':
                    if (!methods.required(content)) {
                        return {
                            pass: false,
                            message: '必填字段'
                        };
                    }
                    break;
                case 'email':
                case 'mail':
                    if (!methods.email(content)) {
                        return {
                            pass: false,
                            message: '请输入正确的邮箱'
                        };
                    }
                    break;
                case 'url':
                    if (!methods.url(content)) {
                        return {
                            pass: false,
                            message: '请输入正确的URL地址'
                        };
                    }
                    break;
                case 'date':
                    if (!methods.date(content)) {
                        return {
                            pass: false,
                            message: '请输入正确的日期'
                        };
                    }
                    break;
                case 'number':
                    if (!methods.number(value)) {
                        return {
                            pass: false,
                            message: '请输入正确的数值'
                        };
                    }
                    break;
                case 'digits':
                    if (!methods.digits(content)) {
                        return {
                            pass: false,
                            message: '请输入数字'
                        };
                    }
                    break;
                default:
                    break;
            }
        }

        for (var key in other) {
            switch (key) {
                case 'min':
                    if (!methods.min(content, other[key])) {
                        return {
                            pass: false,
                            message: '不能低于最小值' + other[key]
                        };
                    }
                    break;
                case 'max':
                    if (!methods.max(content, other[key])) {
                        return {
                            pass: false,
                            message: '不能高于最大值' + other[key]
                        };
                    }
                    break;
                case 'range':
                    if (!methods.range(content, other[key])) {
                        return {
                            pass: false,
                            message: '范围为：' + other[key][0] + '~' + other[key][1]
                        };
                    }
                    break;
                case 'minlength':
                    if (!methods.minlength(content, other[key])) {
                        return {
                            pass: false,
                            message: '最小长度为' + other[key] + (lang === 'ch' ? '个中文字符' : '个英文字符')
                        };
                    }
                    break;
                case 'maxlength':
                    if (!methods.maxlength(content, other[key])) {
                        return {
                            pass: false,
                            message: '最大长度为' + other[key] + (lang === 'ch' ? '个中文字符' : '个英文字符')
                        };
                    }
                    break;
                default:
                    break;
            }
        }

        return {
            pass: true,
            message: ''
        }
    };

    /**
     * 不支持placeholder的浏览器处理
     */
    global.tools.placeholder = function () {
        function havePlaceholder() {
            return 'placeholder' in document.createElement('input');
        }

        if (!havePlaceholder()) {
            $('.input_group > input').each(function () {
                var placeholder = $(this).attr('placeholder');

                $(this).before('<span class="label">' + placeholder + '</span>').attr('placeholder', '');

                var value = $(this).val();
                if (value) {
                    $(this).siblings('.label').hide();
                }
            });

            $('.input_group').on('click', '.label', function () {
                $(this).siblings('input').focus();
            });

            function showOrHide() {
                var value = $(this).val();
                if (value) {
                    $(this).siblings('.label').hide();
                } else {
                    $(this).siblings('.label').show();
                }
            }

            $('.input_group')
                .on('keydown', 'input', function () {
                    $(this).siblings('.label').hide();
                }).on('blur', 'input', showOrHide);
        }
    };

    //条件配置
    global.tools.TYPES = {
        name: {
            types: ['required'],
            other: {
                maxlength: 20
            },
            lang: 'ch'
        },
        summary: {//简介
            types: ['required'],
            other: {
                maxlength: 50
            },
            lang: 'ch'
        },
        introduce: {//介绍
            defaultTip: '',
            types: ['required'],
            other: {
                maxlength: 500
            },
            lang: 'ch'
        },
        describe: {//描述
            types: ['required']
        },
        url: {
            types: ['required', 'url'],
            other: {
                maxlength: 2048
            }
        },
        account: {
            types: ['required', 'en'],
            other: {
                maxlength: 20
            }
        },
        password: {
            types: ['required', 'en'],
            other: {
                minlength: 6,
                maxlength: 18
            }
        },
        userName: {
            types: ['required', 'username'],
            other: {
                maxlength: 10
            },
            lang: 'ch'
        },
        email: {
            defaultTip: '',
            types: ['required', 'email'],
            other: {
                maxlength: 100
            }
        },
        fileName: {
            defaultTip: '',
            types: ['required'],
            other: {
                maxlength: 50
            }
        }
    };

    /**
     * 只支持input、earetext
     * @param option
     * {
     *  selector: 选择器 必填
     *  type: 类型 必填
     * 	success: 成功处理
     * 	failed: 失败
     *	submitBtn:
     * }
     */
    global.tools.onBlurCheck = function (option) {
        var success = option.success || function () {
            };
        var failed = option.failed || function () {
            };

        if (!option.selector || $(option.selector).length === 0) {
            alert('请填写正确的选择器');
            return;
        }
        if (!option.type || !tools.TYPES[option.type]) {
            alert('请输入正确的验证类型');
            return;
        }

        $(option.selector).on('blur', function () {
            var $this = $(this);
            var value = $this.val();
            if (value === $this.attr('placeholder')) {
                value = '';
            }

            var result = tools.contentCheck(value, tools.TYPES[option.type]);
            if (result.pass) {
                $this.next().html(result.message).removeClass().addClass('success');

                success();
            } else {
                $this.next().html(result.message).removeClass().addClass('error');

                failed()
            }
        });
    }

    global.tools.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);
        } else {
            return null;
        }
    }

})(window, jQuery);