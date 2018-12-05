//checkbox 事件 + 全选
function checkBox(){
    $(".table_con").on('click','.checkbox_wrap', function(){
        var tagBtn = $(".checkbox_wrap"),itemBtn = $(".select_item .checkbox"),itemInput = $(".checkbox_wrap .check_init");
        var allNum = itemBtn.length,allBtn = $(".select_all");
        if($(this).hasClass("select_all")){   //如果是全选按钮
            if($(this).children(".checkbox").hasClass("active")){//当前是被选中状态
                tagBtn.children(".checkbox").removeClass("active");
                tagBtn.children(".check_init").removeAttr("checked");
            }else {
                tagBtn.children(".checkbox").addClass("active");
                tagBtn.children(".check_init").attr('checked','checked');
            }
        }else {    //非全选按钮
            if($(this).children(".checkbox").hasClass("active")){ //当前是被选中状态
                $(this).children(".checkbox").removeClass("active");
                $(this).children(".check_init").removeAttr("checked");
                allBtn.children(".checkbox").removeClass("active");
                allBtn.children(".check_init").removeAttr("checked");
            }else {
                $(this).children(".checkbox").addClass("active");
                $(this).children(".check_init").attr('checked','checked');
                if($(".checkbox_wrap .checkbox.active").length >= allNum && allNum>1){
                    tagBtn.children(".checkbox").addClass("active");
                    tagBtn.children(".check_init").attr('checked','checked');
                }
            }
        }
    })
}