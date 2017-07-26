//轮播
$('#banner .img li').eq(0).show().siblings().hide();
var autoPlay=function(){
	_index++;
	if(_index<10){
		if(_index==9){_index=-1}
		$('#banner .img li').eq(_index).fadeIn(1000).siblings().fadeOut(1000);
		setTimeout(function(){
			$('#banner .arrow li').eq(_index).addClass('change').siblings().removeClass('change');
		},300);		
	}	
}
$('#banner .arrow li').mouseenter(function(){
	_index=$(this).index();
	$('#banner .img li').eq(_index).fadeIn().siblings().fadeOut();
	$('#banner .arrow li').eq(_index).addClass('change').siblings('li').removeClass('change');
})
var timer=setInterval(autoPlay,2000);
banner.onmouseover=function(){
	clearInterval(timer);
}
banner.onmouseout=function(){
	timer=setInterval(autoPlay,2000);
}
$('.left').click(function(){	
	_index-=1;
	if(_index<0){
		_index=9;
	}
	$('#banner .img li').eq(_index).fadeIn().siblings().fadeOut();
	$('#banner .arrow li').eq(_index).addClass('change').siblings().removeClass('change');	
})
$('.right').click(function(){
	_index+=1;
	if(_index>9){
		_index=0;
	}
	$('#banner .img li').eq(_index).fadeIn().siblings().fadeOut();
	$('#banner .arrow li').eq(_index).addClass('change').siblings().removeClass('change');
})