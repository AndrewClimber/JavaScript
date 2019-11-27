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
# 1. Default binding
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
# 2. Implicit binding. Скрытое связывание.
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
/*
! fu3 - определена вне объекта
! свойству fu3 объекта obj присвоили внешнюю ф-ю fu3
! и вызвали fu3 сохраненную в obj
*/
/*
! При вложенности объектов один в другой, берется контекст последнего объекта.
*/
var obj3 = {
  a3: 42,
  fu3: fu3
};

var obj2 = {
  a3: 2,
  obj3: obj3
};

//obj2.obj3.fu3(); // Implicit binding:  { a3: 42, fu3: [Function: fu3] } 42

/*
! Потеря связывания с объектом
*/
/*
https://youtu.be/3btM1eujf9s?t=2114
*/
function fu5() {
  console.log("fu5: ", this.a5);
}

// тут fu5 связали с объектом obj5
var obj5 = {
  a5: 2,
  fu5: fu5
};

// а тут с помощью bar отвязалс от объекта.
var bar = obj5.fu5; // создаем псевдоним на функцию
var a5 = "opss, global"; // a5 - глобальная переменная

// ! ф-я bar вызвалась с default binding. и идет ссылка не на obj5, а на глобальный объект
//bar(); // в браузере выведет : fu5:  opss, global

// тоже потеря связывания с объектом. Почему ?
//setTimeout(obj5.fu5, 100); // в браузере выведет : fu5:  opss, global
/*
* заглянем внутрь функции setTimeout
! function setTimeout(fn, delay) // fn - наша функция. delay - задержка.
   !  задержка в миллисекундах delay
   !  fn(); - вызов нашей функции. Это нашей функции call-site - и он default binding - ссылается на глобальный объект
*/

/*
# 3. Explicit binding - явное связывание.
# при помощи call или apply
*/
fu5.call(obj5); // fu5:  2
fu5.apply(obj5); // fu5:  2

function fu6(s) {
  console.log(s, this.a6);
}

a6 = "Global";

var obj6 = {
  a6: 2,
  fu6: fu6
};

fu6.call(obj6, "call"); // call:  2
fu6.apply(obj6, ["applay"]); // apply:  2

/*
# Трюк при Explicit binding
# его еще называют Hard binding
*/

function fu7(s) {
  console.log(s, this.a7);
}

a7 = "GLOBAL";

var obj7 = {
  a7: 2
};

var bar1 = function() {
  fu7.call(obj7, "Hard: ");
};

//вызов идет через default binding
// контекст меняется для ф-и bar1, А не для ф-и fu7
//bar1(); // Hard:  2
//setTimeout(bar1, 100); // Hard:  2

/*
# Hard binding. Ещё пример.
*/
function fu8(someting) {
  return this.a7 + someting;
}

var obj7 = {
  a7: 22
};

var bar7 = function() {
  return fu8.apply(obj7, arguments);
};

var bb = bar7(3);
console.log(bb);

/*
# Hard binding с хелпером
*/
function bind1(fn, obj) {
  // Хелпер
  return function() {
    // Функция создает замыкание
    return fn.apply(obj, arguments);
  };
}

var bbb = bind1(fu8, obj7);

console.log(bbb(5));
/*

# Function.prototype.bind
*/
function fuu(someting) {
  return this.f + someting;
}

var objj = {
  f: 2
};

var brr = fuu.bind(objj);
var d = brr(12);

console.log(d);

/*
# 4. New binding
*/

/*
! Что такое конструктор в JS ?
! Конструктор в JS - это обычная функция.
! Которая должна быть вызвана с оператором new
! перед ней. Это называется вызов конструктора.
! После вызова конструктора автоматически происходит следующее:
! 1. на лету создается новый объект
! 2. Прототип функции конструктора становится прототипом нового объекта
! 3. Этот-же элемент становится 
# this 
! для вызова данного конструктора
! 4. Функция вызванная с оператором new автоматически вернет
!вновь созданный объект 
*/

function fuuu(aaa) {
  this.bbb = aaa;
}

var fee = new fuuu(2);

//console.log(fee.bbb);

/*
Несколько правил в одном Call site
1. Default binding - Самый низкий приоритет
2. У Explicit binding (call, apply) приоритет выше чем у implicit obj.foo()
3. new binding - выше чем implicit obj.foo()
4. Explicit binding (call, apply) и new binding не могут существовать вместе.
 */

console.log("----------------------------------------------");
function someFunction() {
  console.log(this.attrib);
}

var someObj1 = {
  attrib: 2,
  someFunction: someFunction
};

var someObj2 = {
  attrib: 3,
  someFunction: someFunction
};

someObj1.someFunction(); // 2
someObj2.someFunction(); // 3

someObj1.someFunction.call(someObj2); // 3
someObj2.someFunction.call(someObj1); // 2

/*
! lexical this в стрелочных функциях.
*/
console.log("----------------------------------------------");

function testFunction() {
  return () => {
    console.log(this.attr);
  };
}

var testObj1 = {
  attr: 2
};

var testObj2 = {
  attr: 3
};

var testVar = testFunction.call(testObj1);
// принудительно задали контекст из testObj2, но стрелочная функция
// берет контекст только из родительской функции.
testVar(testObj2); // 2 , а не 3!
