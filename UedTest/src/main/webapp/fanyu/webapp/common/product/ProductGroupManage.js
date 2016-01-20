define(['text!tpl/product/ProductGroupManage.tpl','swfupload'],function(tpl){
	var $el = null;

	var getTpl = function(){
		return $el;
	};
	var init = function(){
		$el = $(tpl);

		srvMap.add('queryProductGroupList', '', 'front/sh/prod!execute?uid=pg001');//查询服务
		srvMap.add('queryProductGroupById', '', 'front/sh/prod!execute?uid=pg002');//查询服务
		srvMap.add('saveProductGroup', '', 'front/sh/prod!execute?uid=pg003');//新增服务
		srvMap.add('editProductGroup', '', 'front/sh/prod!execute?uid=pg004');//编辑服务
		srvMap.add('upload','', 'front/sh/prod!uploadImg2?uid=up002');//上传商品组图片
		var G_params = {
			url : srvMap.get('queryProductGroupList'),
			items_per_page : 10, 			// 每页数     @param : limit
			page_index : 0, 				//当前页  @param : start
			pagination : "Pagination", 		//分页id
			searchformId : "J_formSearch", 	//搜索表单的id
			tabletpl : "T_tabletpl", 		//表格模板
			tablewrap : "J_tabletpl" 		//表格容器
		};
		var $name = $("#name",$el);
		var $id = $("#id",$el);
		var $form = $("#J_add_form",$el);
		var $elem = $("#T_importProd",$el);
		var $uploadImg = $("#J_upload_img",$el);
		var $fileurl = $("#fileurl",$el);
		var $filename = $("#filename",$el);
		var $J_search = $('#J_search',$el);

		var validate1 = $form.validate({
			rules : {
				"name" : {
					required : true
				}
			},
			messages : {
				"name" : {
					required : "请填写商品组名称"
				}
			},
			showErrors : function() {
				this.defaultShowErrors();
			},
			success : function(currentDom) {
				$(currentDom).html("<img src='../../css/images/validate-right.png' class='right-img'>");
			}
		});

		//上传空间参数
		var upload,settings = {
			flash_url : "../../lib/swfupload/1.0.0/2.5/swfupload.swf",
			upload_url: srvMap.get('upload'),
			post_params: {},
			use_query_string: false,
			file_size_limit : "5 MB",
			file_types : "*.jpg;*.png;*.gif;*.jpeg;*.bmp",
			file_types_description : "All Files",
			file_upload_limit : 0,
			file_queue_limit : 0,
			debug: false,
			// Button settings
			button_width: '150',
			button_height: "270",
			button_placeholder_id: 'uptrigger',
			button_text_left_padding: 12,
			button_text_top_padding: 3,
			button_cursor : SWFUpload.CURSOR.HAND,
			
			file_queued_handler : function(file){
				//$('#J_fileName',$el).text(file.name);
			},
			file_dialog_complete_handler : function(numFilesSelected, numFilesQueued){
				this.startUpload();
			},
			upload_start_handler : function(file){
				/*if (file.size > 5242880) {
					Util.dialog.tips('文件大小超过5M,请重新上传！');
					return false;
				};
				//createLoading('#J_front_wrap');*/
				return true;
			},
			upload_error_handler : function(file, errorCode, message){
				try {
				} catch (ex) {
			        this.debug(ex);
			    }
			    //unLoading('#J_front_wrap');
			},
			upload_success_handler : function uploadSuccess(file, serverData){
				serverData = JSON.parse(serverData);
				if (serverData.returnCode == '0') {
					Util.dialog.tips("成功！");
					console.log($fileurl.length);
					$fileurl.val(serverData.bean.filename);
					$uploadImg.attr('src',serverData.bean.src);
				}
			}
		};

		var dialogProperties = {
			id : 'A_importProd',
			content : $elem,
			width : 420,
			height : 420,
			modal : true,
			okVal : '确定',
			cancelVal : '取消',
			cancelCallback : function(){
				validate1.resetForm();
				$form[0].reset();
				$id.val("");
				$uploadImg.attr("src", "../../css/images/shangchuantupian.gif");
			},
			okCallback : function() {
				if (validate1.form()) {
					if ($id.val() == "" || $id.val() == null || $id.val() == "undefined") {
						var grams = {
							"name" : $name.val(),
							"filename" :$filename.val(),
							"fileurl" : $fileurl.val()
						};
						Util.ajax.postJson(srvMap.get('saveProductGroup'), grams, function(json, status) {
							if (status) {
								alert("新增成功");
								$J_search.trigger("click");
							} else {
								alert(json.returnMessage || "新增失败");
							}
							$filename.val('');
							$fileurl.val('');
							dialogProperties.cancelCallback();
						});
					} else {
						var grams = {
							"id" : $id.val(),
							"name" : $name.val(),
							"filename" :$filename.val(),
							"fileurl" : $fileurl.val()
						};
						Util.ajax.postJson(srvMap.get('editProductGroup'), grams, function(json, status) {
							if (status) {
								alert("编辑成功");
								$J_search.trigger("click");
							} else {
								alert(json.returnMessage || "编辑失败");
							}
							dialogProperties.cancelCallback();
						});
					}
				} else {
					return false;
				}
			}
		}

		$('#J_search',$el).on('click', function() {
			G_params.page_index = 0;
			var params = $(document.getElementById(G_params.searchformId)).serialize(); //把form序列化
			Util.pagination(G_params.page_index, true, G_params, params);
		}).trigger("click");

		$('#J_addProdGroup',$el).on('click',function(){
			Util.dialog.openDiv(dialogProperties);
			$('#J_img_wrap').html('<a href="javascript:;" id="uptrigger" class="ui-bjpicture"></a>');
			upload = new SWFUpload(settings);//初始化上传控件
		})

		$('#J_tabletpl',$el).on('click','.J_editProdGroup',function(){
			var id = $(this).data("id");
			Util.ajax.postJson(srvMap.get('queryProductGroupById'), {"id": id},function(json, status){
				if(status){
					$id.val(id);
					$name.val(json.bean.name);
					if(json.bean.IMAGE150x270 !== undefined){
						$uploadImg.attr("src", json.bean.ftpUrl + json.bean.IMAGE150x270);
					}
					Util.dialog.openDiv(dialogProperties);
					$('#J_img_wrap').html('<a href="javascript:;" id="uptrigger" class="ui-bjpicture"></a>');
					upload = new SWFUpload(settings);//初始化上传控件
				}
			});
		})
	}

	/*
	    点击弹出框中的确定按钮之后的回调事件
	 */
	
	return {init:init,getTpl:getTpl}
})
