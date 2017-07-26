var transmit=decodeURI(document.URL);
var parameter=transmit.split('=');
var goods_id=parameter[2];
var goods_name=document.getElementById('goods_name');
var goods_img=document.getElementById('goods_img');
goods_name.innerHTML=parameter[1];
goods_img.setAttribute('src',parameter[3]);
$('#magnifier h1 img').attr('src',parameter[3]);
var goods_img=document.querySelector('section img');
//加入购物车
var add_car=document.getElementById('add_car');
$('#add').click(function(){
	//点击之后购物车里添加物品	
	$.ajax({
		type:"post",
		url:"http://lc.shudong.wang/api_cart.php",
		async:false,
		dataType:'json',
		data:"goods_id="+goods_id,
		beforeSend: function(request) {
			request.setRequestHeader("token",localStorage.token);
		},
		success:function(data){
			
		}
	});	
	//点击之后弹出悬浮窗口
	$('#add_car').css('display','block');
	setTimeout(function(){$('#add_car').css('display','none')},2000);
})
var templeteStr1 = $("#templete_shop").html();
var tempStr1 = _.template(templeteStr1);
	$.ajax({
		type:"get",
		url:"http://lc.shudong.wang/api_cart.php",
		async:false,
		dataType:'json',
		beforeSend: function(request) {
			request.setRequestHeader("token",localStorage.token);
		},
		success:function(data){
			var obj = data.data;
			var goods = "";
			$.each(obj,function(index,value){
				console.log(value);
				goods += tempStr1(value);			
			})
			if($(".shopping_change dl").length<=4){
				$('.add_shop').append(goods);
			}else{
				
			}
			
		}
	});
	$("#shopping_sum").html($(".shopping_change dl").length);
	var shop_length=$(".shopping_change dl").length;
	if(shop_length==0){
		$('#shopping').css('display','block');
		$('#shopping_change').css('display','none');
	}else{		
		$('#shopping').css('display','none');
		$('#shopping_change').css('display','block');
	} 
//放大镜
window.onmousemove=function(event){
	//大图的出现和消失
	$('#magnifier').mouseenter(function(){
		$('#magnifier h1').css('display','block');
		$('#dragBox').css('display','block');
	})
	$('#magnifier').mouseleave(function(){
		$('#magnifier h1').css('display','none');
		$('#dragBox').css('display','none');
	})
	var magnifier_img=document.getElementById('magnifier_img');
	var magnifier=document.getElementById('magnifier');
	var dragBox=document.getElementById('dragBox');
	var event=event||window.event;
	var getLeft=function(obj){
	    var offset=obj.offsetLeft;
	    if(obj.offsetParent!=null) offset +=getLeft(obj.offsetParent);
	    return offset;
	};
	function getTop(e){
	    var offset1=e.offsetTop;
	    if(e.offsetParent!=null) offset1+=getTop(e.offsetParent);
	    return offset1;
	}
	//小图块的移动
	var sTop = document.documentElement.scrollTop || document.body.scrollTop;
	var left=parseInt((event.clientX - getLeft(magnifier)-dragBox.offsetWidth/2 ));
	var top=parseInt((event.clientY + sTop - getTop(magnifier)  - dragBox.offsetHeight/2 ));
	if(left<=0){
		left=0;
	}
	if(top<=0){
		top=0;
	}
	if(left>=magnifier.offsetWidth-dragBox.offsetWidth){
		left=magnifier.offsetWidth-dragBox.offsetWidth;
	}
	if(top>=magnifier.offsetHeight-dragBox.offsetHeight){
		top=magnifier.offsetHeight-dragBox.offsetHeight;
	}
	dragBox.style.left=left + "px";
	dragBox.style.top=top + "px";
	//大图的移动
	var h1=document.getElementsByTagName('h1')[0];
	var w = left/(magnifier.offsetWidth-dragBox.offsetWidth);//计算移动的比例
    var h = top/(magnifier.offsetHeight-dragBox.offsetHeight);
    var b_bimg_top = (magnifier_img.offsetHeight-h1.offsetHeight)*h;//计算大图的位置
    var b_bimg_left = (magnifier_img.offsetWidth-h1.offsetWidth)*w;
	$('#magnifier h1 img').css('margin-left',-b_bimg_left);
	$('#magnifier h1 img').css('margin-top',-b_bimg_top);
}
