
(function(){
	/*变量定义部分*/
	var type = document.getElementsByClassName('lang-panel')[0].children;
	var result = document.getElementsByClassName('result')[0];
	var input = document.getElementsByClassName('input')[0],
		output = document.getElementsByClassName('output')[0];
	var transBtn = document.getElementsByClassName('transbtn')[0],
		clear = document.getElementsByClassName('clear')[0];
	var lang = "en",
		timer = null,
		len = type.length;
	function createScript(src){
		
		var script = document.createElement('script');
		
		script.id = 'urlData';
		script.src = src;
		
		document.body.appendChild(script);
	}
	function changeType(){
		
		lang = this.getAttribute('data-type');
		
		result.innerHTML = this.innerHTML;
	}
	function translate(){
		
		var value = 'http://api.fanyi.baidu.com/api/trans/vip/translate?';
		
		var date = Date.now();
		
		var str = '20220208001077065' + input.value + date + 'CchUDZnRgjptX25sM8zP';
		
		var md5 = MD5(str);
		
		var data = 'q=' + input.value + '&from=auto&to=' + lang + '&appid=20220208001077065' + '&salt=' + date + '&sign=' + md5 + "&callback=callbackName";
		//引入src路径
		var src = value + data;
		
		createScript(src);
	}
	function init(){
		//循环添加点击事件
		for(var i = 0;i < len;i++){
			//点击时间就是改变语言类型
			type[i].onclick = changeType;
		}
		//清除按钮点击事件
		clear.onclick = function(){
			input.value = "";
		}
		//点击翻译
		
		transBtn.onclick = function(){
			//如果输入内容为空则返回
			if(input.value == ""){
				return;
			}
			//获取创建的script标签
			var s = document.getElementById('urlData');
			//如果script标签已经存在删除了重新创建
			if(s){
				s.parentNode.removeChild(s);
				translate();
			}else{
				translate();
			}
		}
		//键盘按下事件
		output.onkeydown = function(){
			
			clearInterval(timer);
			timer = setInterval(function(){
				if(input.value == ""){
					return;
				}
				
				var s = document.getElementById('urlData');
				if(s){
					s.parentNode.removeChild(s);
					translate();
				}else{
					translate();
				}
			},500);
			clearTimeout(timer);
		}
	}
	init();
})();

function callbackName(str){
	console.log(str);
	
	var output = document.getElementsByClassName('output')[0];
	output.innerHTML = str.trans_result[0].dst;
}