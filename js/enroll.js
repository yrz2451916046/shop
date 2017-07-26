var immer=document.getElementById('immer');
var inp=document.getElementsByClassName('inp_val');
var chev=document.getElementById('chev');
immer.onclick=function(){
	$.ajax({
		type:"post",
		url:"http://lc.shudong.wang/api_user.php",
		async:true,
		data:{status:'register',username:inp[0].value,password:inp[1].value},
		success:function(data){
			var data=JSON.parse(data);
//			console.log(data.code);
			if(inp[0].value=='' || inp[1].value=='' || inp[2].value==''){
				alert('不能为空');
				return
			}else if(data.code==0 && (inp[1].value==inp[2].value)&&(chev.checked==true)){				
				alert('注册成功');
				window.location.href='login.html';
			}else{
				alert('注册失败');
			}
		}
	});	
}
