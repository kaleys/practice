/**
 * 冒泡排序，从一个数开始循环，依次比较两个相邻的数
 * 如果前一数大于后一个数，则交换位置。
 * 每一次排序都可以将最小的数放到最前面的位置
 * @param {Array} array 需要排序的数组
 */
function bubble(array){
  const len = array.length;
  let i = 0, j;
  for(;i < len - 1; i++) {
    for(j= i+1; j< len; j++) {
      if (array[j] < array[i]) {
        [array[i], array[j]] = [array[j], array[i]];
        console.log(j, '===inner===>', array);
      }
    }
    console.log(i,'===outer===>', array);
  }
  return array;
}
let result = bubble([789, 20, 35, 5, 78,3,2,45,7,9,8]);
console.log(result);
