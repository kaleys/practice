

	var initNum = 0;

	function count() {
		console.log('count方法先出',initNum,'=============');
		initNum++;
		postMessage(initNum);
		setTimeout(count,1000);
	}

	

	onmessage = function(e){
		//console.log(e.data);
		console.log('别人向我传值',e.data);
		initNum = e.data;
	}



	count();
