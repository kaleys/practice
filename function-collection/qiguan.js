//求0-num里所有质数这和
function sumPrimes(num) {
  var primes = [], e=[];
  for(var i=2;i<=num;i++){
    if(!e[i]) {
      primes.push(i);
      //这里每次将i的倍数标记出来
      for(var j=i<<1;j<=num;j+=i) {
        e[j] = true;
      }
    }
  }
  return primes.reduce(function(a,b){
    return a+b;
  });
}

//sumPrimes(10);

/**
 * 判断一个数是否为质数
 * 用的是穷举法，思路是将num的开平方以下的所有的数都被这个数来整除
 * 如果能被整除，那这个数就不是质数
 * @param  {[type]}  num [description]
 * @return {Boolean}     [description]
 */
function isPrime(num){
  if(num < 2) {
    return false;
  }
  var max = Math.floor(Math.sqrt(num));
  for(var i=2;i<=max;i++) {
    if(num%i===0) {
      return false;
    }
  }
  return true;
}

/**
 * 欧几里德算法,最大公约数 greatest common divisor
 * 两个数的最大公约数==其中较小的数与（较大值%较小值）的最大公约数
 * @param  {[type]} a [description]
 * @param  {[type]} b [description]
 * @return {[type]}   [description]
 */
function gcd(a,b){
  return !b ? a: gcd(b,a%b);
}
//最小公倍数=两个数的乘积/最大公约数 leastest common multiple
function lcm(a,b) {
  return a*b/gcd(a,b);
}

/**
 * 全排列,第一种不懂
 * 'abc'=>['abc','acb','bac','bca','cab','cba']
 * @param  {String} str [需要全排列的字符串]
 * @return {[type]}     [description]
 */
function permAlone(str) {
  var arr = str.split(''),
    permutations = [];

  function swap(index1, index2) {
      tmp = arr[index1];
      arr[index1] = arr[index2];
      arr[index2] = tmp;
  }

    // Generate arrays of permutations using the algorithm.
  function generate(int) {
      if (int === 1) {
        // Make sure to join the characters as we create  the permutation arrays
        permutations.push(arr.join(''));
      } else {
        for (var i = 0; i != int; ++i) {
          generate(int - 1);
          swap(int % 2 ? 0 : i, int - 1);
        }
      }
  }

  generate(arr.length);
}

/**
 * 第二种全排列，好理解一点
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
function permAlone2(str) {
  var arr = str.split(''),
      permutation = [],
      reg = /(.)\1+/g,
      insertCharToArr = function(arr,char){
        var ret = [],temp;
        for(var i=0,len = arr.length;i<=len;i++){
          temp = arr.slice(0);
          temp.splice(i,0,char);
          ret.push(temp);
        }
        return ret;
      };
  if(str.match(reg) !== null && str.match(reg)[0] === str) return 0;
  for(var i=0; i<arr.length; i++) {
    var char = arr[i], len = permutation.length;
    if(len===0) {
      permutation.push([char]);
      continue;
    }
    for(var j=0 ;j<len; j++) {
      permutation.push.apply(permutation,insertCharToArr(permutation.shift(),char));
    }
  }

  permutation = permutation.filter(function(v){
    return !v.join(v).match(reg);
  });
  
  return permutation.length;
}