
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
//				console.log(value);
				goods += tempStr1(value);
//				goods += tempStr1(obj[0]);			
			})
			$('.add_shop').append(goods);
		}
	});
	$("#shopping_sum").html($(".shopping_change dl").length);
	var shop_length=$(".shopping_change dl").length;
//	console.log(shop_length)
	if(shop_length==0){
		$('#shopping').css('display','block');	
	}else{		
		$('#shopping').css('display','none');
		$('#shopping_change').css('display','block');
	}      
