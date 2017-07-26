//二级导航
var store=document.querySelector('#store');
//登录跳转到主页面并添加用户名
var pre=document.getElementById('pre');//获取回到顶部按钮
var iG=document.getElementById('imG');
var uu_name=document.getElementById('uu_name');
var _index=0;
var banner=document.getElementById('banner');
//点击退出之后登录注册的样式
var exit=document.getElementById('exit');
exit.onclick=function(){
	$('#portrait').css('display','none');
	$('#login_enroll').css('display','block');
	$('#shopping').css('display','block');
	$('#shopping_change').css('display','none');
}
//搜索效果
var search=document.getElementById('search');
var aa=search.getElementsByTagName('a')[0];
var search_txt=document.getElementById('search_txt');
var borDer=search.getElementsByTagName('span')[0];
//原声JS方法有bug
/*aa.onclick=function(){
	if(search_txt.style.display=='none'){
		var left=270;		
		search_txt.style.display='block';
		borDer.style.display='block';
		aa.style.zIndex=1;
		search_txt.style.zIndex=2;
		setInterval(function(){
			left-=10;
			if(left<=0){
				left=0;
			}
			search_txt.style.left=left+'px';
			borDer.style.left=left+'px';
		},5)
	}else if(search_txt.style.display=='block'){
		search_txt.style.display='none';
		borDer.style.display='none';
		aa.style.zIndex=2;
		search_txt.style.zIndex=1;
		var left=0;
		setInterval(function(){
			left+=10;
			if(left>=270){
				left=270;
			}
			search_txt.style.left=left+'px';
			borDer.style.left=left+'px';
		},5)
	}
}*/
//jquery方法实现
var istrue = true;
   	$("#search>a").click(function(){
   		if (istrue) {
   			$("#search span").animate({width:"266px",left:"0px"},"fast",function(){  			
   				istrue = false;
	 		})
	 		$("#search input").animate({width:"200px",left:"0px"},"fast",function(){
	 			istrue = false;
	 			$("#search input").focus();
	 		})
   		}else{
   			$("#search span").animate({width:"0px",left:"270px"},"fast",function(){
   				istrue = true;
	 		})
	 		$("#search input").animate({width:"0px",left:"270px"},"fast",function(){
	 			istrue = true;
	 		})
   		}
});
//检测是否搜索成功

$('#search_txt').focus(function(){
	$(this).attr('placeholder','');
	var page=1;
	var pagesize=10;
	$.ajax({
		type:"get",
		url:"http://lc.shudong.wang/api_goods.php",
		async:true,
		dataType:'json',
		data:{search_text:$('#search_txt').val(),page:page,pagesize:pagesize},
		success:function(data){
			console.log(data);
			if(search_txt.value==''){
				
			}
		}
	});
})
$('#search_txt').blur(function(){
	$(this).attr('placeholder','search...');
})

//header效果
var header=document.getElementsByTagName('header')[0];
var nav=document.getElementsByTagName('nav')[0];
$(window).scroll(function(event){
//	console.log($(window).scrollTop())
	if($(window).scrollTop()>56){
//		header.style.display='none';
		nav.style.top=0+'px';
		pre.style.display='block';
	}else{
//		header.style.display='block';
		nav.style.top=60+'px';
		pre.style.display='none';
	}
})
//回到顶部按钮
pre.onclick=function(){
//	document.body.scrollTop = document.documentElement.scrollTop = 0;
	scrollTo(0,0);
}
//商品展示
var page=1;
var pagesize=9;
window.onload=function(){
	var templeteStr = $("#templete").html();
	var tempStr = _.template(templeteStr);
	function add(page){
		$.ajax({
			type:"get",
			dataType:"json",
			data:{page:page,pagesize:pagesize},
//			data:"page="+page+"&pagesize="+pagesize,
			url:"http://lc.shudong.wang/api_goods.php",
			async:true,	
			success:function(data){
//				console.log(data)
				var obj=data.data;
				$.each(obj, function(index,value) {
					var goods=tempStr(value);
					var $domObj = $(goods);	
					$oo=$domObj[0].children[1].children[1];
					$shop_car=$domObj[0].children[0];
//					console.log($shop_car)
					if(index%3==0){
						$domObj.css('margin-left',0)
					}
					$('#goods').append($domObj);
					//红心
					var heart_change=true;
					var localNumber=0;
					$oo.onclick=function(){
						if(heart_change){
							$(this).css('background','url(img/heart_red20_18.png) no-repeat right center');
//							$(this).html(parseInt(localStorage.number+1));
							localNumber=parseInt($(this).html());
							localStorage.number=localNumber+1;
							$(this).html(localStorage.number);
							heart_change=false;
						}
						else{
							$(this).css('background','url(img/heart_gray20_18.png) no-repeat right center');
							//localStorage.number=$(this).html(parseInt($(this).html())-1);
							localNumber=parseInt($(this).html());
							localStorage.number=localNumber-1;
							$(this).html(localStorage.number);
							heart_change=true;
						}
					}
					//购物车
					$shop_car.onclick=function(){
						var goods_name=$(this).attr("goods_name");
						$.ajax({
							type:"get",
							url:"http://lc.shudong.wang/api_goods.php",
							async:true,
							dataType:'json',
							data:{},
							success:function(data){
								var data=data.data;
								
								var goods_id=value.goods_id;
								console.log(value.goods_id)
								var goods_thumb=value.goods_thumb;
								window.location.href='shop_car.html?goods_name='+goods_name+'='+goods_id+'='+goods_thumb;
							}
						});						
					}
				});				
			}
		});
	}
	add(page);
	$('#more').click(function(){
		page++;
		add(page);
	})
}

//底部小手效果
$('#service p').mouseenter(function(){
	if($(this).is(':animated')){
		return;
	}
	$(this).animate({left:'-20px'},'normal');
	$(this).animate({left:'0px'},'normal');
	$(this).animate({left:'-20px'},'normal');
	$(this).animate({left:'0px'},'normal');
})