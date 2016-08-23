(function(){
    function Node(name) {
        this.name = name;
        this.next = null;
    }
    function LinkList(){
        this.head = new Node('head');
        this.head.next = this.head;
    }
    LinkList.prototype = {
        constructor: LinkList,
        add :function(node){
            var lastNode = this._last || this.head;
            node.next =  lastNode.next;
            lastNode.next = node;
            this._last = node;
        },
        findPrev: function(node) {
            var curNode = this.head;
            while(curNode.next!=this.head){
                if(curNode.next == node){
                    return curNode;
                }else {
                    curNode = curNode.next;
                }
            }
            return false;
        },
        remove: function(node){
            var prevNode = this.findPrev(node);
            if(prevNode) {
                prevNode.next = node.next;
            }
        },
        show: function(){
            var curNode = this.head.next,arr=[];
            while(curNode!=this.head) {
                arr.push(curNode.name);
                curNode = curNode.next;
            }
            console.log(arr.toString());
        }
    };


    /**
     * 有n个人，数到m个人的时候这个人被杀
     * @param n 总人数
     * @param m 基数
     *
     * 思路：从1-n循环，当index%m==0时，说明要移除这个数，并且n--，
     * 直到m>n就停止
     */
    function kill(n,m){
        var test = new LinkList(),i=1;
        for(;i<=n;i++) {
            var curNode = new Node(i);
            test.add(curNode);
        }
        test.show();

        var node = test.head;
        i=1;
        while(n>=m){
            if(node==test.head) {
                node = node.next;
            }
            if(i % m==0) {
                test.remove(node);
                n--;
            }
            node = node.next;
            i++;
        }
        test.show();
    }
    kill(41,3);
})();