var sub=document.getElementById('sub');
var che=document.getElementById('che');

$("#sub").click(function(){
	var inp_user=document.getElementById('username');
	var inp_pass=document.getElementById('password');
	$.ajax({
		type:"post",
		url:"http://lc.shudong.wang/api_user.php",
		dataType:'json',
		data:{status:'login',username:inp_user.value,password:inp_pass.value},
		success:function(data){
			var token=data.data.token;
			localStorage.token=token;
			if(data.code==0){
				var str_username=$('#username').val();
				var str_password=$('#password').val();
				$.cookie('rmbUser','true',{expires:7,path:'/'});
				$.cookie('cookieusername',str_username,{expires:7,path:'/'});
				$.cookie('cookiepassword',str_password,{expires:7,path:'/'});
				window.location.href='index.html';
			}else{
				alert('用户名密码不正确');
			}
		}
	});
});

