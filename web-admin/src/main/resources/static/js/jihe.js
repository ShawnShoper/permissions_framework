$(function(){
	/* 状态选择 */
	$('.default').dropDqDefault({
		change: function (value, text) {
		}
	});

	/* 联系人姓名 */
	$('.people').dropDqDefault({
		riInput : "请输入联系人姓名",
		change: function (value, text) {
		}
	});



	/* 日历 */
	laydate({
	   elem: '#sTime'
	});
	laydate({
	   elem: '#eTime'
	});
	
	laydate({
	   elem: '#sTime1'
	});
	laydate({
	   elem: '#eTime1'
	});
	
	
	// address
	// 注意要先引入map.js
	$('.address').addressSelect({
		// 是否开启搜素
		search : true,
		// 事件回调   {0 : {id: "120000",sName: "天津市"}, 1 : {id: "120200",sName: "市辖县"}, 2 : {id: "120223",sName: "静海县"}}
		// 0 代表省   1 代表 市  2 代表 县
		change : function(v){
			console.log(v)
		},
		// 当编辑时，需要默认选中省，市，区时，传入相关值
		defaultAddr : {
			provinceId : 510000,
			cityId : 510100,
			countyId : 510104
		}
	});

	// checkbox 事件
	$('.checkbox_wrap').on('click', function(){
		if($(this).find('.checkbox').hasClass('active')){
		    $(this).find('.checkbox').removeClass('active');
		    $(this).find('.checkbox').siblings("input[type='checkbox']").removeAttr('checked')
		}
		else{
		    $(this).find('.checkbox').addClass('active');
		    $(this).find('.checkbox').siblings("input[type='checkbox']").attr('checked','checked')
		}
	})
	



	$('body').on('click', '.radio_wrap', function(e){
		radio($(this));
	})




	$('body').on('click', '.tytk_radio', function(e){
		if($(this).hasClass('no_tytk_radio')){
			$('#txtarea_tytk').show();
		}else{
			$('#txtarea_tytk').hide();
		}
		
	})


	 
	// page_select
	$('.page_select').dropDqDefault({
		riInput : "",
		change: function (value, text) {
		}
	});
	$('.page_select1').dropDqDefault({
		riInput : "",
		change: function (value, text) {
		}
	});
	// pay
	$('.payoff').click(function(){
		$(this).addClass('active').siblings('.payoff').removeClass('active');
		radio( $(this).find('.radio_wrap'));
	});
	
    // placeholder IE兼容写法
	(function(){
		if( !('placeholder' in document.createElement('input')) ){  
	      $('input[placeholder],textarea[placeholder]').each(function(){   
	      var that = $(this),   
	      text= that.attr('placeholder');   
	      if(that.val()===""){   
	        that.val(text).addClass('placeholder');   
	      }   
	      that.focus(function(){   
	        if(that.val()===text){   
	          that.val("").removeClass('placeholder');   
	        }   
	      })   
	      .blur(function(){   
	        if(that.val()===""){   
	          that.val(text).addClass('placeholder');   
	        }   
	      })   
	      .closest('form').submit(function(){   
	        if(that.val() === text){   
	          that.val('');   
	        }   
	      });   
	    });   
	  }  
	})();
	


})
