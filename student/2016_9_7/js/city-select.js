/**
 * 城市选择jquery插件
 *
 * Licensed under the MIT license:
 * https://github.com/callmeJozo/city-select
 *
 * Author: Naraku(http://segmentfault.com/u/naraku_)
 *
 * Version:  1.0.1  2016-01-14
 *
 */

var search_api_url = "https://sijipiao.alitrip.com/ie/auto_complete.do?_ksTS=1467963682760_2060&_input_charset=utf-8&userInput=";

(function($) {
    var CitySelect = function(options) {
        this.$input = null;
        this.domReady = false;
        this.kucity = null;
        this.citybox = null;
        this.result = null;
        this.resultLiNum = -1;
        this.$currentInput = null;

        var options = options || {};
        this.selectHandler = options.selectHandler || this.defaultHandler;
    };
    CitySelect.prototype = {
        constructor: CitySelect,

        /**************************** 组件初始化 ****************************/

        // 初始化
        init: function(input) {
            this.$input = $(input);
            this.bindInputClick(this.$input);
            this.bindInputKeyup(this.$input);
        },

        // 注册点击事件
        bindInputClick: function($input) {
            var _this = this;
            $input.on('click', function(e) {
                _this.$currentInput = $(e.target);
                _this.showMainDom();
                _this.setPosition(_this.$currentInput);
            })
        },

        // 获取城市之后显示城市
        showMainDom: function() {
            $(this.kucity).fadeIn();
            var _this = this;
            if (!this.domReady) {
                this.showContainer();
                _this.createMainDom(cityInfo);
                _this.bindResultClick();            //绑定搜索结果列表的事件
                _this.bindResultKeyboard();         //搜索列表键盘事件
                _this.bindHideClick();              //点击屏幕隐藏
                _this.domReady = true;
            }
        },

        // 显示加载
        showContainer: function() {
            var kucity = this.kucity = $('<div class="kucity"></div>');
            var citybox = this.citybox = $('<div class="citybox"></div>');
            var result = this.result = $('<ul class="result"></ul>');
            kucity.append(citybox).append(result);
            $('body').append(kucity);
        },

        // 设置面板位置
        setPosition: function($target) {
            var top = $target.offset().top + $target.outerHeight() + 1;
            var left = $target.offset().left;
            this.kucity.css({
                top: top,
                left: left
            })
        },


        /**************************** 热门城市选择 ****************************/

        // 整体dom结构
        createMainDom: function(cities) {
            var itemLength = cities.length;
            var header = $('<h3 class="kucity_header">支持汉字/拼音搜索</h3>'),
                tabNav = this.tabNav = $('<ul class="kucity_nav"></ul>'),
                tabsContainer = this.tabsContainer = $('<div class="kucity_body">'),
                tabHtml = '';
            for (var i = 0; i < itemLength; i++) {
                tabHtml += '<li>' + cities[i].tabname + '</li>';
                createTabs(cities[i], tabsContainer);
            }
            tabNav.html(tabHtml);
            tabNav.find('li:first-child').addClass('active');
            tabsContainer.find('div:first-child').addClass('active');
            this.citybox.append(header);
            this.citybox.append(tabNav);
            this.citybox.append(tabsContainer);
            this.bindTabClick();
            this.bindSelect();

            function createTabs(item, tabsContainer) {
                var currentItem = $('<div class="kucity_item group">');
                var current = item.tabdata;
                var str = "";
                for (var j = 0, jLen = current.length; j < jLen; j++) {
                    str += '<span data-code="' + current[j].cityCode + '">' + current[j].cityName + '</span>'
                }
                currentItem.append(str);
                tabsContainer.append(currentItem);
            }
        },

        // 注册tab切换事件
        bindTabClick: function() {
            var _this = this;
            this.tabNav.on('click', 'li', function(e) {
                var current = $(e.target),
                    index = current.index();
                current.addClass('active').siblings().removeClass('active');
                _this.citybox.find('.kucity_item').eq(index).addClass('active').siblings().removeClass('active');
                _this.citybox.find('.kucity_body').scrollTop(0);
            })
        },

        // 注册城市选择事件
        bindSelect: function() {
            var _this = this;
            this.tabsContainer.on('click', 'span', function(e) {
                var name = $(e.target).text();
                var code = $(e.target).data("code");
                _this.selectHandler(name,code);
                _this.kucity.hide();
            })
        },


        /**************************** 搜索功能 ****************************/

        // 注册搜索框keyup事件
        bindInputKeyup: function($input) {
            var _this = this;
            $input.on('keyup', function(e) {
                var key = e.keyCode;
                if(key === 40 || key === 38 || key === 13) return;
                _this.$currentInput = $(e.target);
                _this.throttle(_this.getSearchResult, _this);
            })
        },

        // 函数节流
        throttle: function(fn, context) {
            clearTimeout(fn.tId);
            fn.tId = setTimeout(function() {
                fn.call(context);
            }, 100)
        },

        // 检索
        getSearchResult: function() {
            var _this = this;
            this.triggleShow(false);
            var value = _this.$currentInput.val();
            if (value) {
                var url = search_api_url + value;
                $.ajax({
                    url: url,
                    type: 'get',
                    dataType: 'jsonp'
                }).done(function (re) {
                    _this.createResult(re,value);
                })
            } else {
                this.triggleShow(true);
            }
        },

        // 列表，结果，整体 显示切换
        triggleShow: function(open) {
            if (open) {
                this.citybox.show();
                this.result.hide();
            } else {
                this.citybox.hide();
                this.result.show();
            }
        },

        // 搜索结果dom结构
        createResult: function(re,value) {
            var result = re.result,
                len = result.length,
                str = '';
            if (!!len) {
                for (var i = 0; i < len; i++) {
                    str += '<li><span class="name">' + result[i].name + '</span><span class="letter">' + result[i].cityCode + '</span></li>';
                }
                this.result.html('').html(str);
                this.resultLiNum = 0;
                this.chooseResultLi();
            } else {
                this.result.html('<li>没有找到<span class="noresult">' + value + '</span>相关信息</li>');
                this.resultLiNum = -1;
            }
        },

        // 搜索列表点击事件
        bindResultClick: function(){
            var _this = this;
            this.result.on('click', 'li', function() {
                _this.selectResultLi(this);
            })
        },

        // 搜索列表键盘事件
        bindResultKeyboard: function(){
            var _this = this;
            console.log(_this);
            console.log(_this,"jjjjj");
            this.$input.on('keydown', function(event) {
                var keycode = event.keyCode;
                if(keycode === 13){event.preventDefault()}
                if(_this.result.is(":hidden") || _this.resultLiNum === -1) return;
                var $Li = $("li",_this.result);
                console.log($Li)
                var len = $Li.length;
                switch(keycode){
                    case 40: //向下箭头↓
                        _this.resultLiNum++;
                        if(_this.resultLiNum > len - 1) _this.resultLiNum = 0;
                        _this.chooseResultLi();
                        break;
                    case 38: //向上箭头↑
                        _this.resultLiNum--;
                        if(_this.resultLiNum < 0) _this.resultLiNum = len - 1;
                        _this.chooseResultLi();
                        break;
                    case 13: // enter键
                        _this.selectResultLi($Li.eq(_this.resultLiNum));
                        break;
                    default:
                        break;
                }
            })
        },

        chooseResultLi: function(){
            var num = this.resultLiNum;
            var $Li = $("li",this.result);
            $Li.eq(num).addClass("active").siblings().removeClass("active");
        },

        selectResultLi: function(li){
            var name = $(li).find('.name').text();
            var code = $(li).find(".letter").text();
            this.selectHandler(name,code);
            this.kucity.hide();
        },

        // 点击文档隐藏kucity
        bindHideClick: function(){
            var _this = this;
            $(document).click(function(event){
                if(event.target === _this.$input.get(0) || isChildOrSelf(event.target,_this.kucity)) return;
                _this.kucity.hide();
            })

            function isChildOrSelf(child,$parent){
                return child === $parent.get(0) || $(child).closest($parent).length > 0;
            }
        },

        // 默认回调函数
        defaultHandler: function(name,code){
            this.$currentInput.val(name);
        }

        /**************************** 历史城市记录功能 ****************************/
        //TODO

    };

    // 在jquery对象上注册插件
    $.fn.citySelect = function(options) {
        var instance = new CitySelect(options);
        instance.init(this);
    };

})(jQuery);
