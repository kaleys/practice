/**
 * 选择排序
 * 每次循环找出队列中最小的数，将它放到队列的最前面
 * 然后再循环剩余的队列，同样取出最小的数值，放置到该队列的最前面
 * ......
 */

function select(array) {
  const len = array.length;
  for (let i = 0; i < len; i++) {
    let minIndex = i; //保存最小的索引值
    for (let j = i + 1; j < len; j++) {
      if (array[minIndex] > array[j]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      //交换当前索引与最小索引值，保存i索引对应的值是剩余队列中值最小的
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      console.log(i, '===outer===>', array);
    }
  }
  return array;
}
let result = select([789, 20, 35, 5, 78, 3, 2, 45, 7, 9, 8]);
console.log(result);