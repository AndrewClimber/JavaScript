/*
! this - it is spetial keyword. 
* Which is automatically detected
* inside the function namespace every time it is called.
! Everytime ! At every call ! For each function !!!
https://www.youtube.com/watch?v=3btM1eujf9s
*/
/*
function identify() {
  return this.name.toUpperCase();
}

function speak() {
  var greeting = "Hello, I'm " + identify.call(this);
  console.log(greeting);
}

var me = { name: "Kyle" };
var you = { name: "Reader" };

console.log(identify.call(me)); // KYLE
console.log(identify.call(you)); // READER

speak.call(me); // Hello, I'm KYLE
speak.call(you); // Hello, I'm READER
*/
// Можно переписать

function identify(context) {
  console.log("Context1: ", context);
  return context.name.toUpperCase();
}

function speak(context) {
  console.log("Context2: ", context);
  var greeting = "Hello, I'm " + identify(context);
  console.log(greeting);
}

var me = { name: "Kyle" };
var you = { name: "Reader" };

console.log(identify(you)); // READER
speak(me); // Hello, I'm KYLE

function foo() {
  foo.cnt++;
}

function foo1() {
  data.cnt++;
}

var data = {
  cnt: 0
};

foo.cnt = 0;

for (var i = 0; i < 5; i++) {
  foo1();
  foo();
}

/*
console.log("foo.cnt= ", foo.cnt);
console.log("foo1.cnt= ", data.cnt);
*/

/*
# Default binding
*/

function fu1() {
  console.log("default binding: ", this.a); // при defualt binding this указывает на глобальный объект.
}

var a = 2;

fu1(); // default binding. тут важен call site . место вызова функции.

/*
* 1.в этом случае при запуске в браузере this = window
! 2.Но! при запуске в  "use strict" - this = undefined
*/

function fu2() {
  console.log("default binding2 : ", this.a2);
}

var a2 = 3;

/* 
% а вот это сработает. и в функции fu2 - this будет указывать на глобальный объект        this = window
% т.к.  несмотря на то, что fu2 запускается в "use strict" режиме, но определена она в нестрогом режиме
 */
(function() {
  "use strict";
  fu2();
})();

/*
# Implicit binding. Скрытое связывание.
# Это, когда объект связывается с функцией
*/

function fu3() {
  console.log("Implicit binding: ", this, this.a3);
}

var obj = {
  a3: 2,
  fu3: fu3
};

/*
! Важно где вызывается функция. В случае скрытого связывания 
! this указывает на объект, которые находится слева от точки , т.е. это obj
*/
obj.fu3(); //Implicit binding:  { a3: 2, fu3: [Function: fu3] } 2
