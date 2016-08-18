/**
 * Created by Administrator on 2016-08-17.
 */
//栈，只在push和pop方法，也就是先进后出

//2-9进制转换
function changeBase(num,base){
    var arr = [];
    do {
        arr.push(num%base);
        num = Math.floor(num/base);
    }while(num>0);
    return arr.reverse().join('');
}
console.log('进制转换',changeBase(10,2),changeBase(123,8));

//用栈判断某个表达式(号错误索引
function checkExpression(expr){
    var arr = [];
    for(var i=0,len=expr.length;i<len;i++) {
        if(expr[i]=='('){
            arr.push(i);
        }else if(expr[i]==')'){
            arr.pop();
        }
    }
    return arr;
}
console.log('习题一：',checkExpression('2.3(+23(/12+(3.233*23)'));
