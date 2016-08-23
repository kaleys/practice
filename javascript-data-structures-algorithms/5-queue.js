//队列 先进先出
function Queue(){
    this.dataStore = [];
}
Queue.prototype = {
    constructor: Queue,
    enqueue: function(ele){
        this.dataStore.push(ele)
    },
    dequeue: function(ele) {
        return this.dataStore.shift();
    },
    front: function(){
        return this.dataStore[0];
    },
    end: function(){
        return this.dataStore[this.dataStore.length-1];
    },
    empty: function(){
        return this.dataStore.length==0;
    }
};


//第一题
function Dueue(){
    this.dataStore = [];
}
