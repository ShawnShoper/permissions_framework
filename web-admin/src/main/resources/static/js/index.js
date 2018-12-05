// JavaScript Document
$(function(){
	changeWH();/*根据窗口更改内容高度*/
	$(".menu").nanoScroller();/*初始化滚动条*/
	$(".menu_one").bind("click",function(){
		var img_url = $(this).children("img").attr("src");
		var imghov_url = $(this).children("img").attr("data-img");
		$(".menu_child").slideUp(200);
		
		/*将上个选中状态的图标还原*/
		var i=$(".menu_fir>li.curr").index();
		if(i>=0){
			var imghov = $(".menu_fir>li").eq(i).children(".menu_one").children("img").attr("data-img");
			var imgold = $(".menu_fir>li").eq(i).children(".menu_one").children("img").attr("src");
			$(".menu_fir>li").eq(i).children(".menu_one").children("img").attr("src",imghov);
			$(".menu_fir>li").eq(i).children(".menu_one").children("img").attr("data-img",imgold);
			}
		
		if($(this).parent("li").hasClass("curr")){
				$(this).parent("li").removeClass("curr");
				
			}else{
				$(this).parent("li").addClass("curr").siblings("li").removeClass("curr");
				}
		$(this).children("img").attr("src",imghov_url);
		$(this).children("img").attr("data-img",img_url);
		
		
		/*判断是否有二级*/
		if($(this).next(".menu_child").length!=0){
			if($(this).next(".menu_child").css("display")=="none"){
				$(this).next(".menu_child").slideDown(200);
				}else{
					$(this).parent("li").removeClass("curr");
					$(this).next(".menu_child").slideUp(200);
					}
			}
		})	
		
		
		
		$(".sec_one").bind("click",function(){
			$(".sec_one").removeClass("curr");
			$(this).addClass("curr");
			})
	})
$(window).resize(function(e) {
    changeWH();
});
function changeWH(){
	var ww = $(window).width();
	var hh = $(window).height();
	$(".content").height(hh - $(".header").height());
	$(".main_iframe").width(ww - $(".menu").width());
	}
	
function linkFrame(surl){
	if(surl!=null){
		$("#main_iframe").attr("src",surl);
		}else{
			$("#main_iframe").attr("src","");
			}
	
	}