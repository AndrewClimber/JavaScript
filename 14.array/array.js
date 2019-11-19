// arrays methods
const numArr = [1, 43, 345, 2234, 56, 9];

let value;

value = numArr.length;

//numArr.length = 0;
//numArr.length = 100;

value = Array.isArray(numArr);
value = numArr[2];
value = numArr.indexOf(56);
value = numArr.push(111);
value = numArr.pop();
value = numArr.unshift(222233);
value = numArr.shift();
value = numArr.slice(0, 3);
value = numArr.splice(1, 2);
value = numArr.splice(1, 2, "one", "two");
value = numArr.reverse();
value = numArr.concat(numArr);
value = [].concat(1, 2, 3);
value = numArr.join("#");
value = value.split("#");
console.log(value, numArr);
