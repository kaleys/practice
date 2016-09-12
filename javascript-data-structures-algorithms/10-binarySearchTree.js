function Node(data,left,right){
	this.data = data;
	this.left = left;
	this.right = right;
}
Node.prototype.show = function(){
	return this.data;
}

function BST(){

}
BST.prototype = {
	constructor: BST,
	insert: function(data){
		var n = new Node(data,null,null);
		if(!this.root) {
			this.root = n;
			return;
		}
		var curNode = this.root,parent,nodeDir;
		while(true) {
			parent = curNode;
			nodeDir = data < curNode.data ? 'left' : 'right';
			curNode = curNode[nodeDir];
			if(!curNode) {
				parent[nodeDir] = n;
				break;
			}			
		}
	},
	inOrder: function(node){
		var ret = [];
		if(!(node == null)){
			this.inOrder(node.left);
			console.log(node.show());
			this.inOrder(node.right);
		}
	},
	getMin: function(){
		var node = this.root;
		while(node.left) {
			node = node.left;
		}
		return node.data;
	}
}

var random = function(min,max) {
	return min + Math.floor(Math.random()*(max-min));
}

var datas = [];
for(var i=0;i<20;i++) {
	datas.push(i);
}

var bst = new BST();
while(datas.length) {
	var c = datas.splice(random(0,datas.length-1),1);
	bst.insert(c);
}

bst.inOrder(bst.root);