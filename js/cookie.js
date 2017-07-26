$(window).load(function(){
	$('#portrait').css('display','block');
	$('#login_enroll').css('display','none');
//	console.log($.cookie('cookieusername'))
	if($.cookie('rmbUser') == 'true'){
		$('#uu_name').html($.cookie('cookieusername'));
//		console.log($('#uu_name').html($.cookie('cookieusername')));
	}else{
		$('#login_enroll').css('display','block');
	}
})

	
