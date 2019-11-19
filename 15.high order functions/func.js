// function is object
function foo() {
  console.log("Hello world!");
}

foo();

foo.field = "Den";
console.log(foo.field); // add field to function foo

// High order functions
const arr = ["Andrey", "Boris", "Oleg", "Max"];

// Get array's elements lengths  arr - [6,5,5,3]
function mapArray(arr, fn) {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    res.push(fn(arr[i]));
  }
  return res;
}

function getLength(el) {
  return el.length;
}

function setUppercase(el) {
  return el.toUpperCase();
}

console.log(mapArray(arr, getLength));
console.log(mapArray(arr, setUppercase));

///
function greeting(firstName) {
  return function(lastName) {
    return `Hello ${firstName} ${lastName} !`;
  };
}

s = greeting("Vasia")("Ivanov");
console.log(s);
