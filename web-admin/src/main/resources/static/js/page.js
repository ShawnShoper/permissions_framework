var digitsReg = /^\d+$/; // 正整数

/**
 * 生成分页标签方法
 * @param {$tag} $pages 分页标签的容器
 * @param {number} peach 每页显示多少条
 * @param {number} allcount 总条数
 * @param {number} page 当前页
 * @param {String} onclickofpage 点击事件的方法名
 */
function setOfpage($pages, peach, allcount, page, onclickofpage) {
  if (digitsReg && !digitsReg.test(page)) {
    alert("请输入正确的页数");
  } else {
    page = parseInt(page);
  }
  if (allcount > 0) {
    var allpage = 0;
    if (allcount % peach > 0) {
      allpage = Math.floor(allcount / peach) + 1;
    } else {
      allpage = Math.floor(allcount / peach);
    }
    var allofthspage = allpage; //总页数
    var thispage = page;
    $pages.empty();
    var upofpageno = 1;
    if ((page - 1) > 1) {
      upofpageno = page - 1;
    }
    if (page == 1) {
      $pages.append('<a class="currfirst">首页</a><a class="prepage">上一页</a>');
    } else {
      $pages.append('<a class="currfirst" onclick="' + onclickofpage + '(1)">首页</a><a class="prepage" onclick="' + onclickofpage + '(' + upofpageno + ')">上一页</a>');
    }

    if (allofthspage > 5) {
      var ib = 1;
      ik = allofthspage;
      if ((thispage - 2) > 1) {
        ib = thispage - 2;
        $pages.append('<a>•••</a>');
      }
      if ((thispage + 2) < allofthspage) {
        ik = thispage + 2;
      }
      for (var i = ib; i < (ik + 1); i++) {
        if (page == i) {
          $pages.append('<a  _obj="' + i + '">' + i + '</a>');
          continue;
        }
        $pages.append('<a  _obj="' + i + '" onclick="' + onclickofpage + '(' + i + ')">' + i + '</a>');
      }
      if ((allofthspage - 2) > thispage) {
        $pages.append('<a>•••</a>');
      }
    } else {
      for (var i = 1; i < (allofthspage+1); i++) {
        if (page == i) {
          $pages.append('<a  _obj="' + i + '">' + i + '</a>');
          continue;
        }
        $pages.append('<a  _obj="' + i + '" onclick="' + onclickofpage + '(' + i + ')">' + i + '</a>');
      }
    }
    var nextpageno = allofthspage;
    if ((page + 1) <= allofthspage) {
      nextpageno = page + 1;
    }
    if (page == allofthspage) {
      $pages.append('<a class="nextpage">下一页</a><a class="currlast">末页</a>');
    } else {
      $pages.append('<a class="nextpage" onclick="' + onclickofpage + '(' + nextpageno + ')">下一页</a><a class="currlast" onclick="' + onclickofpage + '(' + allofthspage + ')">末页</a>');
    }
    $pages.find('a[_obj=' + page + ']').addClass('curr');
  } else {
    $pages.empty();
    if ($('#load')) {
      $('#load').empty();
    }
    $pages.html('<div style="color:red;width:100%;text-align:center;padding:33px 0px 33px 0px; font-size:12px;">暂无相关数据...</div>');
  }
}

/**
 * 生成带总页数和总条数的分页标签集
 * @param {$tag} $pages 分页标签的容器
 * @param {number} peach 每页显示多少条
 * @param {number} allcount 总条数
 * @param {number} page 当前页
 * @param {String} onclickofpage 点击事件的方法名
 * @param {fn} func 回调函数
 */
function setOfPageNumber($pages, peach, allcount, page, onclickofpage, func, pageNums) {
  if (digitsReg && !digitsReg.test(page)) {
    alert("请输入正确的页数");
  } else {
    page = parseInt(page);
  }

  if (allcount > 0) {
    var allpage = 0;
    if (allcount % peach > 0) {
      allpage = Math.floor(allcount / peach) + 1;
    } else {
      allpage = Math.floor(allcount / peach);
    }
    //清空分页标签集
    $pages.empty();
    $pages.append($("<a>", {
      "class": "totpage",
      "text": "共" + allcount + "条/" + allpage + "页"
    }));
    var allofthspage = allpage; //总页数
    var thispage = page;
    var upofpageno = 1;
    if ((page - 1) > 1) {
      upofpageno = page - 1;
    }
    if (page == 1) {
      $pages.append('<a class="currfirst"></a><a class="prepage"></a>');
    } else {
      $pages.append('<a class="currfirst" onclick="' + onclickofpage + '(1)"></a><a class="prepage" onclick="' + onclickofpage + '(' + upofpageno + ')"></a>');
    }

    if (allofthspage > 5) {
      var ib = 1;
      ik = allofthspage;
      if ((thispage - 2) > 1) {
        ib = thispage - 2;
        $pages.append('<a>•••</a>');
      }
      if ((thispage + 2) < allofthspage) {
        ik = thispage + 2;
      }
      for (var i = ib; i < (ik + 1); i++) {
        if (page == i) {
          $pages.append('<a  _obj="' + i + '">' + i + '</a>');
          continue;
        }
        $pages.append('<a  _obj="' + i + '" onclick="' + onclickofpage + '(' + i + ')">' + i + '</a>');
      }
      if ((allofthspage - 2) > thispage) {
        $pages.append('<a>•••</a>');
      }
    } else {
      for (var i = 1; i < (allofthspage+1); i++) {
        if (page == i) {
          $pages.append('<a  _obj="' + i + '">' + i + '</a>');
          continue;
        }
        $pages.append('<a  _obj="' + i + '" onclick="' + onclickofpage + '(' + i + ')">' + i + '</a>');
      }
    }
    var nextpageno = allofthspage;
    if ((page + 1) <= allofthspage) {
      nextpageno = page + 1;
    }
    if (page == allofthspage) {
      $pages.append('<a class="nextpage"></a><a class="currlast"></a>');
    } else {
      $pages.append('<a class="nextpage" onclick="' + onclickofpage + '(' + nextpageno + ')"></a><a class="currlast" onclick="' + onclickofpage + '(' + allofthspage + ')"></a>');
    }
    $pages.find('a[_obj=' + page + ']').addClass('curr');
  } else {
    $pages.empty();
    if ($('#load')) {
      $('#load').empty();
    }
    $pages.html('<div style="color:red;width:100%;text-align:center;font-size:15px;padding:33px 0px 33px 0px;">暂无数据</div>');
      $('#pidPage').css('display','none');
  }
}

function setOfpagemap(pageof_number, peach, allcount, page, onclickofpage, func, t) {
  if (digitsReg && !digitsReg.test(page)) {
    alert("请输入正确的页数");
  } else {
    page = parseInt(page);
  }
  if (allcount > 0) {
    var allpage = 0;
    if (allcount % peach > 0) {
      allpage = Math.floor(allcount / peach) + 1;
    } else {
      allpage = Math.floor(allcount / peach);
    }

    var allofthspage = allpage; //总页数
    var thispage = page;
    $(pageof_number).empty();
    var upofpageno = 1;
    if ((page - 1) > 1) {
      upofpageno = page - 1;
    }
    $(pageof_number).append('<a onclick="' + onclickofpage + '(' + upofpageno + ')">&lt;</a>');
    if (allofthspage > 5) {
      var ib = 1;
      ik = allofthspage;
      if ((thispage - 2) > 1) {
        ib = thispage - 2;
        $(pageof_number).append('<a>•••</a>');
      }
      if ((thispage + 2) < allofthspage) {
        ik = thispage + 2;
      }
      for (var i = ib; i < (ik + 1); i++) {
        $(pageof_number).append('<a href="javascript:void(0);" _obj="' + i + '" onclick="' + onclickofpage + '(' + i + ')">' + i + '</a>');
      }
      if ((allofthspage - 2) > thispage) {
        $(pageof_number).append('<a>•••</a>');
      }
    } else {
      for (var i = 0; i < allofthspage; i++) {
        $(pageof_number).append('<a href="javascript:void(0);" _obj="' + (i + 1) + '" onclick="' + onclickofpage + '(' + (i + 1) + ')">' + (i + 1) + '</a>');
      }
    }
    var nextpageno = allofthspage;
    if ((page + 1) <= allofthspage) {
      nextpageno = page + 1;
    }

    var searchofcontent = '<span style="margin-left:15px;">第</span><input id="s_go_page" type="text"/></b><b style="margin-right:20px;">页</b><a id="searchOfgo" style="border-right:1px solid #d8d8d8;">跳转</a>';
    var now_inpageis = '当前' + page + '/';
    if (t && t > 0) {
      searchofcontent = "";
      now_inpageis = '共';
    }
    $(pageof_number).append('<a onclick="' + onclickofpage + '(' + nextpageno + ')">&gt;</a>');
    $(pageof_number).find('a[_obj=' + page + ']').addClass('curr');
    if (t && t > 0) {} else {
      $('#searchOfgo').click(function() {
        var gopage = $('#s_go_page').val();
        if (gopage != '' && gopage <= allofthspage) {
          func(gopage);
        }
      });
    }
  } else {
    $(pageof_number).empty();
    if ($('#load')) {
      $('#load').empty();
    }
    $("#dl_lists").html('<div style="color:red;width:100%;text-align:center;padding:30px 0px 30px 0px;">暂无相关数据...</div>');
  }
}

function setOfpageguide(pageof_number, peach, allcount, page, onclickofpage, func, t) {
  if (digitsReg && !digitsReg.test(page)) {
    alert("请输入正确的页数");
  } else {
    page = parseInt(page);
  }
  if (allcount > 0) {
    var allpage = 0;
    if (allcount % peach > 0) {
      allpage = Math.floor(allcount / peach) + 1;
    } else {
      allpage = Math.floor(allcount / peach);
    }

    var allofthspage = allpage; //总页数
    var thispage = page;
    $(pageof_number).empty();
    var upofpageno = 1;
    if ((page - 1) > 1) {
      upofpageno = page - 1;
    }
    $(pageof_number).append('<a class="fir" onclick="' + onclickofpage + '(1)">首页</a><a onclick="' + onclickofpage + '(' + upofpageno + ')">&lt;</a>');
    if (allofthspage > 5) {
      var ib = 1;
      ik = allofthspage;
      if ((thispage - 2) > 1) {
        ib = thispage - 2;
        $(pageof_number).append('<a">•••</a>');
      }
      if ((thispage + 2) < allofthspage) {
        ik = thispage + 2;
      }
      for (var i = ib; i < (ik + 1); i++) {
        $(pageof_number).append('<a href="javascript:void(0);" _obj="' + i + '" onclick="' + onclickofpage + '(' + i + ')">' + i + '</a>');
      }
      if ((allofthspage - 2) > thispage) {
        $(pageof_number).append('<a>•••</a>');
      }
    } else {
      for (var i = 0; i < allofthspage; i++) {
        $(pageof_number).append('<a href="javascript:void(0);" _obj="' + (i + 1) + '" onclick="' + onclickofpage + '(' + (i + 1) + ')">' + (i + 1) + '</a>');
      }
    }
    var nextpageno = allofthspage;
    if ((page + 1) <= allofthspage) {
      nextpageno = page + 1;
    }

    var searchofcontent = '<span style="margin-left:15px;">第</span><input id="s_go_page" type="text"/></b><b style="margin-right:20px;">页</b><a id="searchOfgo" style="border-right:1px solid #d8d8d8;">跳转</a>';
    var now_inpageis = '当前' + page + '/';
    if (t && t > 0) {
      searchofcontent = "";
      now_inpageis = '共';
    }
    $(pageof_number).append('<a onclick="' + onclickofpage + '(' + nextpageno + ')">&gt;</a><a class="last" onclick="' + onclickofpage + '(' + allofthspage + ')">尾页</a>');
    $(pageof_number).find('a[_obj=' + page + ']').addClass('active');
    if (t && t > 0) {} else {
      $('#searchOfgo').click(function() {
        var gopage = $('#s_go_page').val();
        if (gopage != '' && gopage <= allofthspage) {
          func(gopage);
        }
      });
    }
  } else {
    $(pageof_number).empty();
    if ($('#load')) {
      $('#load').empty();
    }
    $(pageof_number).html('<div style="color:red;width:100%;text-align:center;padding:0px 0px 30px 0px;">暂无相关数据...</div>');
  }
}

//定义简单Map  
function getMap() { //初始化map_,给map_对象增加方法，使map_像Map    
  var map_ = new Object();
  map_.put = function(key, value) {
    map_[key + '_'] = value;
  };
  map_.get = function(key) {
    return map_[key + '_'];
  };
  map_.remove = function(key) {
    delete map_[key + '_'];
  };
  map_.keyset = function() {
    var ret = "";
    for (var p in map_) {
      if (typeof p == 'string' && p.substring(p.length - 1) == "_") {
        ret += ",";
        ret += p.substring(0, p.length - 1);
      }
    }
    if (ret == "") {
      return ret.split(",");
    } else {
      return ret.substring(1).split(",");
    }
  };
  return map_;
}

//判断后台文件是否存在
function setFilepath(filepath, wwwpath, defaultpath, divid) {
  var hrefsdo = "getFilePaths.do";
  $.post(hrefsdo, {
    "filepath": filepath,
    "wwwpath": wwwpath,
    "defaultpath": defaultpath
  }, function(result) {
    $('#' + divid).attr('src', result);
  }, 'text');
}