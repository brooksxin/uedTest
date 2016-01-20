(function(softphone) {

    var localCache = {
       UI_LOADING_HTML: $(".ui-loading").parent().html()
    };

    // 数据接口服务地址
    srvMap.add("productFilterOptions", "filterOptions.json", 'data/filterOptions.json'); // 产品检索条件
	srvMap.add("productList", 'productList.json','front/sh/prod!execute?uid=p007');// 终端机型列表
    srvMap.add("productFittings", "productFittings.json", 'productFittings.json'); // 配件列表
    srvMap.add("userFavorites", "userFavorites.json", "front/sh/contact!execute?uid=u012"); // 用户关注的产品
    srvMap.add("userAddFavorite", "userAddFavorite.json", "front/sh/contact!execute?uid=u011"); // 用户添加关注产品
    srvMap.add("userDelFavorite", "userDelFavorite.json", "front/sh/contact!execute?uid=attn012"); // 用户取消关注产品
    srvMap.add("productCompareList", "productCompareList.json", 'productCompareList.json'); // 产品比较数据接口
    srvMap.add("productDetail", "productDetail.json", 'front/sh/prod!execute?uid=p022'); // 产品详情
    // 基于cookie的cache simple api
    softphone.cache = {
          lget: function(key) {
              var val = Util.cookie.get(key);
              if (val && val != "") {
                  return val.split(/;/gm);
              } else {
                  return [];
              }
          },
          lexists : function(key, val) {
              var arr = this.lget(key);
              for (var i = 0 ; i < arr.length; i++) {
                  if (arr[i] == val)
                      return true;
              }
              return false;
          },
          lpush: function(key, val) {
              var arr = this.lget(key);
              if (!this.lexists(key, val)) {
                  arr.push(val);
                  Util.cookie.set(key, arr.join(';'));
              }
          },
          lrem: function(key, val) {
              var tmp = [];
              var arr = this.lget(key);
              for (var i = 0; i < arr.length; i++) {
                  if (arr[i] != val)
                      tmp.push(arr[i]);
              }
              Util.cookie.set(key, tmp.join(';'));
          }
    };

    var delay = function(_delay, fn) {
        setTimeout(function() {
            fn && fn();
        }, _delay);
    };

    // 页面搜索api
    softphone.search = {
        // 缓存当前变更的检索选项
        options: {
             "filter": {
                 "brand": "all",
                 "priceRange": "all",
                 "screenSize": "all",
                 "coopNm":"all"
             },
             "sort": {
                 "price": "",
                 "stock": "",
                 "sales": ""
             },
             "keyword": "",
             "limit": 12,
             "start": 0
        },
        reload: function() {
            this.searchProducts(this.options);
        },
        init: function() {
            var self = this;

            // 关键字
            $(".keyWord").on("keyup", function() {
            	if(event.keyCode == 13){
            		self.options.keyword = $(this).val();
            		self.reload();
            	}
            });

            // 排序条件事件处理
            $(".data-sortType a").click(function() {
                var _this = $(this),
                    type = _this.parent().attr("data-type");
                if (_this.hasClass("sortUp")) {
                    this.className = "sortDown";
                    self.options.sort[type] = "asc";
                } else if(_this.hasClass("noSort")){
                    this.className = "sortUp";
                    self.options.sort[type] = "desc";
                }else if(_this.hasClass("sortDown")){
                    this.className = "noSort";
                    self.options.sort[type] = "";
                }
                self.reload();
            });

            var initOptionEvents = function() {
                // 查询条件事件处理
                $(".searchType a").click(function() {
                    $(this).parent().parent().find("a.click").removeClass("click");
                    $(this).addClass("click");
                    var st = self._getSearchType(this);
                    if (st) {
                        self.options.filter[st] = $(this).text();
                    }
					          $(".keyWord").val('');
                    self.options.keyword = '';
					          self.options.start = 0;
                    // 使用当前选项查询产品
                    self.reload();
                });
            };

            Util.ajax.postJson(srvMap.get("productFilterOptions"), "", function(json, status) {
                if (status) {
                    Util.ajax.loadTemp("#J_filterMore", $("#T_filterMore"), json);
                    // 初始检索条件选项的点击事件
                    initOptionEvents();
                }
            });
            self.reload();
        },
        _getSearchType: function(t) {
            if (!t || t == document.body)
                return null;
            else if ($(t).hasClass("searchType"))
                return $(t).attr("data-type");
            else
                return this._getSearchType(t.parentNode);
        },
        searchProducts: function(opts) {
            $("#J_termList").html(localCache.UI_LOADING_HTML);
            
            //{limits=20, screenSize=, uid=p007, stock=asc, price=desc, priceRange=, page=1, sales=, keyword=, brand=null, brandSearch=null}
            var str = "coopNm="+opts.filter.coopNm+"&brand="+opts.filter.brand+"&priceRange="+opts.filter.priceRange+"&screenSize="+
            		opts.filter.screenSize+"&price="+opts.sort.price+"&stock="+opts.sort.stock+"&sales="+
            		opts.sort.sales+"&keyword="+opts.keyword+"&limit="+opts.limit+"&start="+opts.start*opts.limit;
            var G_params = {
    			    url : srvMap.get('productList'),
    			    items_per_page : 12,   		// 每页数     @param : limit
    			    page_index : 0 , 				//当前页  @param : start
    			    pagination : "Pagination" , 	//分页id
    			    searchformId : "J_formSearch",  //搜索表单的id
    			    tabletpl : "T_termList", 		//表格模板
    			    tablewrap : "J_termList" 		//表格容器
    			};
            delay(500, function() {
                // opts 将查询条件组合，获取当前的排序条件和查询关键字，作为请求数据，请求产品数据列表
                Util.ajax.postJson(srvMap.get("productList"),'formData=&'+str,function(json,status){
                    if (status) {
                        softphone.compare.checkOptext(json.beans);
                        // 缓存当前页的数据一份，POPUP弹出层时还有用！
                        localCache.PRODUCT_LIST = json.beans;
                        Util.ajax.loadTemp('#J_termList',$('#T_termList'),json);//加载模板
                        var $pagination = $("#Pagination");

                        if(json.bean.total<1){
                            $pagination.html('<p class="ui-tiptext ui-tiptext-warning">'+
                                  '<i class="ui-tiptext-icon" title="警告"></i>'+
                                  '没有查询到数据,请更换查询条件!'+
                                '</p>');
                            $pagination.next().hide();
                            $pagination.prev().hide();
                        }else{
                            $pagination.pagination(json.bean.total, {
                                'items_per_page': G_params.items_per_page,
                                'current_page': softphone.search.options.start,
                                'num_display_entries': 3,
                                'num_edge_entries' : 1,
                                'prev_text' : "上一页",
                                'next_text' : "下一页",
                                'call_callback_at_once' : false,
                                'callback' : function(page_index, jq) {
                                    softphone.search.options.start = page_index;
                                    softphone.search.reload();
                                }
                            });
                        }
                    } else {
                        alert(json.returnMessage||'查询失败，请重试！');
                    }
                });
            });
        }
    };

    // 页面上的操作api（关注，加入对比，取消对比，取消关注等）
    softphone.favorites = {
         init: function() {
             var num = top.CtiUtils.API.getCurPhoneMobile();
             // 初始化关注操作
             $("#favorites").click(function(){
                 softphone.favorites.showAll(num);
             });
             softphone.favorites.search(false,num);
         },
         search: function(ignoreResult,phoneNum) {
            var str = "";
            if(phoneNum){
              str = "telnum="+phoneNum;
            }else{
              str = "";
            }
             if (!ignoreResult)
                $("#J_termList").html(localCache.UI_LOADING_HTML);
             delay(1000, function() {
                Util.ajax.postJson(srvMap.get("userFavorites"), str, function(json, status) {
                      if (status) {
                          // 缓存当前页的数据一份，POPUP弹出层时还有用哦！
                          if (!ignoreResult) {
                            softphone.compare.checkOptext(json.beans, true);
                            localCache.PRODUCT_LIST = json.beans;
                            Util.ajax.loadTemp("#J_termList", $("#T_termList"), json);
                          }
                          top.$("#nFav").text(json.beans.length);
                      }
                });
             });
         },
         showAll: function(phoneNum) {
             $(".op-filters").hide();
             $(".op-goback").removeClass("fn-hide");
             // 检索关注列表
             softphone.favorites.search(false,phoneNum);
         },
         hide: function() {
             $(".op-filters").show();
             $(".op-goback").addClass("fn-hide");
             softphone.search.reload();
         },
         add: function(pid, that) {
             // 添加关注
            // var grams = "&attnMcdsId="+pid+"&telnum="+top.CtiUtils.API.getCurPhoneMobile();
             var grams = "&attnMcdsId="+pid+"&telnum="+top.CtiUtils.API.getCurPhoneMobile();
             Util.ajax.postJson(srvMap.get("userAddFavorite"), grams, function(json, status) {
                if (status) {
                    top.$("#nFav").text(parseInt(top.$("#nFav").text()) + 1);
                    Util.dialog.tips("关注成功！",top);
                }else{
                    Util.dialog.tips(json.returnMessage||"关注失败！",top);
                  }
             });
         },
         del: function(pid, that) {
        	 
        	 var delParam = "telnum="+top.CtiUtils.API.getCurPhoneMobile()+"&attnMcdsId="+pid;
             // 取消关注
             Util.ajax.postJson(srvMap.get("userDelFavorite"), delParam, function(json, status) {
                if (status) {
                	
                	var _options = {
                        gap: 3,
                        colorOn: "#08c",
                        colorOff: "#D7D9DA", //
                        container: "#J_termList", // 弹出层所在父级容器
                        //triggerRoot: document.body, // 触发mouseover事件对象
                        //triggerClass: "productsItem", // 触发hover事件响应区域
                        hotareaClass: "fn-clear", // 显示弹出层响应区域
                        popupWidth: 309, // 弹出层宽度
                        loadFittings: false // 是否加载周边
                    }
                	
                    //var el = softphone.search.getProductItem(that);
                    $(that).text("关注");
                    //if (el) $(el).remove();
                    top.$("#nFav").text(parseInt(top.$("#nFav").text()) - 1);
                    $(that).parent().parent().remove();
                    Util.dialog.tips("取消关注成功",top);
                }
             });
         }
    }

    // 弹出层实现
    $.fn.softphonePopup = function(opts) {
        var self = this;
        var _options = $.extend({
            gap: 3,
            colorOn: "#08c",
            colorOff: "#D7D9DA", //
            container: "#J_termList", // 弹出层所在父级容器
            triggerRoot: document.body, // 触发mouseover事件对象
            triggerClass: "productsItem", // 触发hover事件响应区域
            hotareaClass: "fn-clear", // 显示弹出层响应区域
            popupWidth: 309, // 弹出层宽度
            loadFittings: false // 是否加载周边
        }, opts);

        var defineProductHoverHandler = function(opts) {

            var current = null;
            var target  = null;
            // 缓存配件信息
            var fittingCache = {};

            // 隐藏弹出层，并恢复选中产品项的边框颜色
            self.hidePopup = function() {
                $(current).css("border-color", opts.colorOff);
                self.hide();
                return self;
            };

            // 在相对位置显示弹出层
            self.showPopup = function(rel) {
                var scrollTop   = $(opts.container)[0].scrollTop;
                var gap         = opts.gap;
                var offsetLeft  = rel.offsetLeft + rel.offsetWidth;
                var offsetTop   = rel.offsetTop - scrollTop;
                var fullWidth   = document.body.offsetWidth;
                var fullHeight  = document.body.clientHeight;
                var diffWidth   = fullWidth - offsetLeft;
                var diffHeight  = fullHeight - offsetTop;
                var width       = opts.popupWidth;
                var height      = this.offsetHeight;

                if (diffWidth <= width) {
                    offsetLeft = offsetLeft - width - rel.offsetWidth;
                    gap *= -1;
                }

                if (diffHeight < height) {
                    offsetTop  = offsetTop - height - rel.offsetHeight;
                }

                updatePopupView(findProduct($(rel).attr("data-id")));

                var _left = offsetLeft + gap;
                var _top  = offsetTop;
                //如果左侧显示不下则设置left为0
                if(_left <= 10){_left = 0}

                self.removeClass("fn-hide")
                    .css("left", _left + "px")
                    .css("top",  _top + "px")
                    .fadeIn();

                return self;
            };

            // 检测鼠标所在的位置状态
            self.checkPopupState = function() {
                 var item = getProductItem(target);
                 if (item != null) {
                    if (!insideHotarea(target)) {
                        self.hidePopup();
                        visible = false;
                    } else {
                        if (current != item) {
                            self.hidePopup();
                            visible = false;
                        }
                        if (!visible) {
                            self.showPopup(item);
                            visible = true;
                        }
                    }
                    current = item;
                    $(current).css("border-color", opts.colorOn);
                 } else {
                    if (!insidePopup(target)) {
                        self.hidePopup();
                        current = null;
                        visible = false;
                    }
                 }
                 return self;
            }

            function findProduct(itemId) {
              // 在缓存中termListCache获取产品信息
              // 请见：softphone_init.js 122行，每次加载后都会刷当前缓存
              if (!localCache.PRODUCT_LIST) return null;
              function doLookup(arr, n) {
                if (n >= arr.length) {
                    return null;
                } else {
                    if (arr[n].mcds_unit_id == itemId ||arr[n].MCDS_UNIT_ID == itemId)
                        return arr[n];
                    return doLookup(arr, n + 1);
                }
              }
              return doLookup(localCache.PRODUCT_LIST, 0);
            }

            // 更新弹出窗层视图，并加载配件信息
            function updatePopupView(product) {
                if (product != null) {
                    Util.ajax.loadTemp("#J_popup", $("#T_popup"), product);
                    if (opts.loadFittings)
                        loadFittings(product.mcds_unit_id);
                }
            }

            // 加载配件信息
            function loadFittings(productId) {
                $("#fittings").html("正在加载中..");
                if (fittingCache[productId]) {
                    Util.ajax.loadTemp('#J_fittings',$('#T_fittings'),fittingCache[productId]);
                    return;
                }
                Util.ajax.getJson(srvMap.get("productFittings"), "", function(json, status) {
                    if (!status) {
                        $("#fittings").html("加载失败");
                        return;
                    } else {
                        if (json.beans && json.beans.length) {
                            json.beans[0].classname = "popinforRight";
                        }
                        fittingCache[productId] = json;
                        Util.ajax.loadTemp('#J_fittings',$('#T_fittings'),fittingCache[productId]);
                    }
                });
            }

            // 判断鼠标是否在弹出层中
            function insidePopup(t) {
                if (!t || t == document.body)
                    return false;
                else if ($(t).hasClass("popInformationO"))
                    return true;
                return insidePopup(t.parentNode);
            }

            // 获取当前鼠标所在位置对应的产品信息元素对象
            function getProductItem(t) {
                if (!t || t == document.body)
                    return null;
                else if ($(t).hasClass(opts.triggerClass))
                    return t;
                return getProductItem(t.parentNode);
             }

             function insideHotarea(t) {
                if (!t || t == document.body || $(t).hasClass(opts.triggerClass))
                    return false;
                else if ($(t).hasClass(opts.hotareaClass))
                    return true;
                else return insideHotarea(t.parentNode);
             }

            var visible = false;

            var scrollDiff = 0;
            var initEvents = function(self, opts) {
                 $(opts.triggerRoot).on("mouseover", function(e) {
                     target = e.target;
                     setTimeout(self.checkPopupState, 200);
                 });

                 $(opts.container).on("scroll", function() {
                    var diff = this.scrollTop - scrollDiff;
                    var top = parseInt($(self).css("top"));
                    $(self).css("top", (top - diff) + "px");
                    scrollDiff = this.scrollTop;
                 });
             };

             initEvents(self, opts);

             return self;
        };

        return defineProductHoverHandler(_options);
    };

    // 产品对比
    softphone.compare = {
        CMP_MAX_COUNT: 4,
        CMP_CACHE_KEY: "softphone_cmplist",
        // 哪些列不显示？在这里添加吧！
        FILTER_OUT_NAMES : {"imgUrl": 1, "brand": 1, "model": 1, "MCDS_UNIT_ID": 1,"otherNature":1,"brandId":1,"pSensor":1,
        					"PIC_STO_URL_ADDR":1,"catgUnitName1":1,"catgUnitName2":1,"aperture":1,"SUPLER_PROD_CODE":1,"record":1,
        					"catgUnitId1":1,"catgUnitId2":1,"gravity":1,"PIC_NM":1,"CTRT_ID":1,"ftpUrl":1,"standbyTime":1,"productGroupName":1,
        					"productGroupId":1,"image60x108":1,"image150x270":1,"image100x180":1,"image300x540":1,"image90x162":1},
        DISPLAY_NAME_MAP : {},
        setDisplayNames: function(names) {
            $.extend(this.DISPLAY_NAME_MAP, names);
        },
        update: function() {
              var cmplist = softphone.cache.lget(this.CMP_CACHE_KEY);
              var pIframe = $(window.parent.document).find("#nCmp");//获取当前iframe父页面的dom元素
              pIframe.html(cmplist.length);
              if (cmplist.length > 0) {
                  pIframe.parent().removeClass("BGgray").addClass("BGblue");
              } else {
                  pIframe.parent().removeClass("BGblue").addClass("BGgray");
              }
        },
        remove: function(pid) {
          var keyExists = softphone.cache.lexists(this.CMP_CACHE_KEY, pid);
          softphone.cache.lrem(this.CMP_CACHE_KEY, pid);
          var cmplist = softphone.cache.lget(this.CMP_CACHE_KEY);
          var pIframe = $(window.parent.document).find("#nCmp");//获取当前iframe父页面的dom元素
          pIframe.html(cmplist.length);
          Util.dialog.tips("取消对比成功",top);
          setTimeout(function(){
            window.location.reload();
          },1000);
        },
        toggle : function(pid, that) {
             var keyExists = softphone.cache.lexists(this.CMP_CACHE_KEY, pid);
             // 取消或添加对比
             if (keyExists) {
                softphone.cache.lrem(this.CMP_CACHE_KEY, pid);
                 $(that).html("添加对比");
             } else {
                var arr = softphone.cache.lget(this.CMP_CACHE_KEY);
                if (arr.length >= this.CMP_MAX_COUNT) {
                     Util.dialog.tips("最多只能比较" + this.CMP_MAX_COUNT + "个",top);
                     return;
                }
                softphone.cache.lpush(this.CMP_CACHE_KEY, pid);
                $(that).html("取消对比");
             }
             Util.dialog.tips((keyExists ? "取消对比" : "添加对比") + "成功",top);
             this.update();
        },
        checkOptext : function(beans, fav) {
             for (var i = 0 ; beans && i < beans.length; i++) {
                 beans[i].optext = this.getActionText(beans[i].mcds_unit_id);
                 beans[i].favtext = fav ? "取消关注" : "关注";
                 beans[i].favop   = fav ? "del": "add";
             }
        },
        getActionText: function(pid) {
             return softphone.cache.lexists(this.CMP_CACHE_KEY, pid) ? "取消对比" : "添加对比";
        },
        checkedItems : function() {
             return softphone.cache.lget(this.CMP_CACHE_KEY);
        },
         // 自定义每个比较项字段值显示模板
        formatters : {
            "price": function(text) {
                return '<div class="fn-high ft-16">&yen;'+ text +'</div>';
            }
        },
        init: function() {
            var self = this;
            function observeCompareList() {
                var current = self.checkedItems();
                if (!sameList(current, productIds)) {
                    productIds = current;
                    self.init();
                }
            }
            function sameList(arr1, arr2) {
                if (arr1.length != arr2.length)
                    return false;
                for (var i = 0 ; i < arr1.length; i++)
                    if (arr2[i] != arr1[i])
                        return false;
                return true;
            }
            // 若该页面没有关闭，产品列表主页执行添加或取消对比，该页面的比较视图自动刷新
            function checkCompareList() {
                observeCompareList();
                setTimeout(checkCompareList, 1000);
            }

            var renderCompareObjects = function(json) {
                if (json.beans.length <= 0) {
                    $("#J_compareList").html('<div class="ui-tips-box tipsBox"><div class="ui-icon-noData"></div><div class="ui-tips-text">暂无对比产品！</div></div>');
                    return;
                }
                var data = {
                     compareIndex: {},
                     compareRows: [],
                     beans: json.beans
                 };
                 if (json.beans.length > 0) {
                     // 初始化比较行数，并映射字段显示名称
                     var bean = json.beans[0];
                     var i = 0;
                     for (var k in bean) {
                         if (!self.FILTER_OUT_NAMES[k]) {
                             data.compareIndex[k] = data.compareRows.length;
                             data.compareRows.push({
                                 values: [],
                                 // 显示名称，若未定义则显示字段名称，请自行在DISPLAY_NAME_MAP中设置
                                 name: self.DISPLAY_NAME_MAP[k] ? self.DISPLAY_NAME_MAP[k] : k,
                                 index: i++});
                         }
                     }
                 }

                 // 生成每行的列数据
                 $.each(json.beans, function() {
                      var bean = this;
                     for (var k in this) {
                         if (!self.FILTER_OUT_NAMES[k]) {
                             var index = data.compareIndex[k];
                             if (data.compareRows[index])
                               data.compareRows[index].values.push({
                                   // 如果某些字段有需要特殊显示处理的，请在templates定义自己的显示模板
                                   text: self.formatters[k] ? self.formatters[k](bean[k]) : bean[k]
                               });
                         }
                     }
                 });
                 // 将数据绑定到模板
                 Util.ajax.loadTemp('#J_compareList',$('#T_compareList'),data);
            };

            var loadCompareObjects = function(idList, result, n, fn) {
                if (n >= idList.length) {
                    fn(result);
                } else {
                    var prodId = idList[n];
                    Util.ajax.postJson(srvMap.get("productDetail"), "prodId=" + prodId, function(json, status) {
                    	result.beans.push(json.bean);
                        loadCompareObjects(idList, result, n + 1, fn);
                    });
                }
            };

            $("#J_compareList").html(localCache.UI_LOADING_HTML);
            loadCompareObjects(self.checkedItems(), {beans: []}, 0, renderCompareObjects);
        }
    };

})(window.softphone || (window.softphone = {}));