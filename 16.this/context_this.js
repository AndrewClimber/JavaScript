function hello() {
  console.log("Hello ", this);
}

//hello(); // Hello  Object [global] { ...

const person = {
  name: "Vlad",
  age: 25,
  sayHello: hello,
  sayHelloHello: hello.bind(hello), // теперь эта ф-я  привязана к контексту ф-и hello, а не объекта person
  sayHelloThis: hello.bind(this),
  logInfo: function(job, phone) {
    console.group(`${this.name} info:`);
    console.log(`Name is ${this.name}`);
    console.log(`age is ${this.age}`);
    console.log(`job is ${job}`);
    console.log(`phone is ${phone}`);
    console.groupEnd();
  }
};

const lena = {
  name: "Elena",
  age: 23
  //logInfoLena: person.logInfo
};

//console.log(person); //{ name: 'Vlad', age: 25, sayHello: [Function: hello] }
//person.sayHello(); // Hello  { name: 'Vlad', age: 25, sayHello: [Function: hello] }
//person.sayHelloHello(); // Hello  function hello() {console.log("Hello ", this);
//person.sayHelloThis();
//person.logInfo("IT-specialist");

//person.logInfo.bind(lena)("WEB-designer");
//person.logInfo.bind(lena, "WEB-designer", "123-123-1232345")();

//const fnLenaInfoLog = person.logInfo.bind(lena);
//fnLenaInfoLog("Frontend", "8-234-2343567-456");

//logInfoLena = person.logInfoLena.bind(lena);
//lena.logInfoLena("WEB-designer", "123-123-1232345");

//person.logInfo.call(lena, "WEB-designer", "123-123-1232345"); // call в отличие от bind вызывает ф-ю сразу.

//person.logInfo.apply(lena, ["WEB-designer", "123-123-1232345"]);

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const array = [1, 2, 3, 4, 5];

Array.prototype.multBy = function(n) {
  console.log("multBy ", this);
};

array.multBy(3);
