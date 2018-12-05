
$(function(){
	/*输入框默认样式*/
	fobl('.s_input_fb');
	
})

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

function radio($cur){
	var radioName = $cur.find('.radio').attr('name');
	$('label[name="'+ radioName +'"]').removeClass('active').siblings('input[name="'+ radioName +'"]').removeAttr('checked','checked');
	$cur.find('.radio').addClass('active').siblings('input[name="'+ radioName +'"]').attr('checked', 'checked');
	$cur.parent().addClass('active').siblings().removeClass('active');
}