/**
 * 插入排序
 * 思路：取一个数【A】，依次与它前面的数值【B】倒序进行比较
 * 如果【B】 > 【A】,那就将【B】的位置往后面移一位，即当前【A】的位置
 * 直到【B】 <= 【A】为止，当前的循环停止，将【A】插到当前【B】的后面即可
 * 
 */
function insert(array) {
  const len = array.length;
  for(let i = 1; i< len; i++) {
    const compare = array[i];
    let j = i -1;
    while(array[j] > compare && j>=0) {
      array[j + 1] = array[j]
      j--;
    }
    array[j + 1] = compare;
    console.log(i, '===outer===>', array);
  }
  return array;
}
let result = insert([789, 20, 35, 5, 78, 3, 2, 45, 7, 9, 8]);
console.log(result);