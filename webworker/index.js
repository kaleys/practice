(function(){
	
	if(typeof(Worker)=='undefined') {
		alert('不支持web Worker')
		return false;
	}
	var divEle = document.getElementById('test'),
		startBtn = document.getElementById('btn1'),
		stopBtn = document.getElementById('btn2'),
		worker,num=0;


	
	
	startBtn.onclick = function(){
		if(worker) {
			worker.terminate();
		}
		worker = new Worker('count.js');
		
		
		worker.onmessage = function(e){
			num = e.data
			console.log('看谁先出来');
			divEle.textContent = e.data;
		}
	}
	stopBtn.onclick = function(){
		console.log('传值了吗？');
		worker.postMessage(num); 
		worker.terminate();
	}

})()