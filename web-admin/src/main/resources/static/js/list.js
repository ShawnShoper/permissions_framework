// JavaScript Document
$(function(){
	changeTbl();/*根据窗口更改内容高度*/
	
	$(".table_con>tbody> tr:odd").addClass("even"); 	 
	$(".table_con>tbody> tr:even").addClass("odd"); 	 
	$(".table_con tr").mouseover(function () { 
		$(this).toggleClass(".hover"); 
	}); 
	$(".table_con tr").mouseout(function () { 
		$(this).toggleClass(".hover"); 
	}); 
	
	/*输入框默认样式*/
	fobl('.s_input_fb');
	
	//切换排序样式
	$(".desc_arr").on("click",function(){
		if( !$(this).hasClass("desc_up") ){
			$(this).addClass("desc_up");
		}else{
			$(this).removeClass("desc_up");
		}
	});


	
})
$(window).resize(function(e) {
    changeTbl();
});
function changeTbl(){
	var ww = $(window).width();
	var hh = $(window).height();
	var tblH = hh - $(".posi_box").outerHeight() - $(".topd_box").outerHeight() - $(".page_box").outerHeight();
	$(".page_box").width(ww - 54);
	$(".tbl_out").height(tblH);
	}

function placeHolder(that){
	var $this = $(that);
	var defaultVal = $this.val();    
	$this.focus(function(){
		if($(this).val() == defaultVal){
			$(this).addClass('active').val('');
		}
	});
	$this.blur(function(){
		if($(this).val() == ''){
			$(this).val(defaultVal).removeClass('active');
		}
	});
}

function fobl(that){
	var $this = $(that);
	$this.focus(function(){
		$(this).addClass('active');
	});
	$this.blur(function(){
		$(this).removeClass('active');
	});

}