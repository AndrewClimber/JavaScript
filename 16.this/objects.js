/*
https://www.youtube.com/watch?v=xltVJZbTl4Y&feature=youtu.be&list=PLX2w39aiY5NJFkTMw0XaJ5yW_95lkjVNP
Два способа создать объект
*/

// literal syntax
// пары ключ:значение
var myObj1 = {
  key: 1
};

var myObj2 = new Object(); // constructed syntax
myObj2.key = 1;

/*
Примитив (значение примитивного типа, примитивный тип данных) это данные, которые 
не являются объектом и не имеют методов. В JavaScript 6 простых типов данных: string, number, boolean, 
null, undefined, symbol (новое в ECMAScript 2015).
*/
var strPrimitive = "sdfsdf";
console.log(typeof strPrimitive); // string
console.log(strPrimitive instanceof String); // false
// strPimitive - это примитив. Не является объектом. и он immutable
// чтобы с ним что-то сделать его надо привестик объекту String
// JS автоматически это делает. В случае каких-либо операций над strPimitive

var strObject = new String("sdfsdfds");
console.log(typeof strObject); // object
console.log(strObject instanceof String); // true

// Inspect the object sub-type
console.log(Object.prototype.toString.call(strObject)); // [object String]

console.log("---------------------------------------");

/*
function , array - объекты.

String,Number,Boolean,Object,Function,Array,Date,RegExp,Error - встроенные объекты.
А точнее это функции-конструкторы.

*/

s = new String("sdfsdf");
a = new Array(1, 2, 3);
b = new Boolean(true);
console.log(s);
console.log(s[1]);
console.log(a);
console.log(a[0]);
console.log(b);

/*
Примитивы null , undefined - не имеют своих объектов
Date - не имеет примитивов. Можно создать только с помощью объекта.s
*/

myObj1 = {
  a: 2
};
console.log(myObj1.a); // 2
console.log(myObj1["a"]); // 2

console.log("---------------------------------------");
// Все ключи в объектах - это строки
mObject = {};
mObject[3] = "sdfsdfm";
mObject[true] = "sdfdsfsdfsdfsdf";
mObject[mObject] = "dkfhgu9999999999999999999999999999999999";

console.log(mObject["3"]);
console.log(mObject["true"]);
console.log(mObject["[object Object]"]);

/*Исчисляемые имена свойств объектов*/
console.log("---------------------------------------");
var prefix = "foo";

var prefObj = {
  [prefix + "baz"]: "hello",
  [prefix + "bar"]: "world"
};

console.log(prefObj["foobaz"]);
console.log(prefObj["foobar"]);

/*Массивы - это объекты, которые имеют доп.структуру для хранения индексов.
Не стоит использовать arr['v'] или arr.v для записи значений в массив.
Вместо записи данных произойдет добавление нового свойства в объекте массива.
Для добавления элемента массива надо использовать push
*/
console.log("---------------------------------------");
var a = [1, "erer", true];
a["2"] = "www"; // заменили одно значение ячейки на другое.
console.log(a); // [ 1, 'erer', 'www' ]

a["-8"] = "negative"; // добавили новое свойство в объект
console.log(a); // [ 1, 'erer', 'www', '-8': 'negative' ]

/** Копирование объектов */
console.log("---------------------------------------");
function aFunc() {
  a = 1;
}
var aObj = { c: true };
var aArray = [];

var mObj = {
  a: 2,
  b: aFunc,
  c: aArray,
  d: aObj
};

aArray.push(aObj, mObj); // копирование
console.log(aArray);

/** Копирование объектов через ES6 Object.assign
 * первый параметр "приемник"
 * остальные "источники"
 * Свойства объектов копирует
 * при помощт присвоения "="
 * Если объекты - то копируются по ссылкам.
 * Скаляры - просто как значения.
 */
console.log("---------------------------------------");
var nObj = Object.assign({}, mObj);

console.log(nObj.a);
console.log(nObj.b);
console.log(nObj.c);
console.log(nObj.d);

var nObj1 = {
  a: 1,
  b: "bbbbbbbbbbbbbbb",
  c: true,
  d: [1, 2, 3]
};

var nObj2 = {
  b: "ddddddddddddddd",
  c: true,
  d: [5, 7, 8],
  e: { g: 3, h: "gggg" }
};

console.log("---------------------------------------");
/**
 * При копировании если есть одинаковые поля - то значения заменяются
 * Если нет каких-то полей - то они добавляются к объекту в который копируют.
 */
var nObj3 = Object.assign(nObj1, nObj2);
console.log(nObj3);

console.log("---------------------------------------");
var nObj5 = Object.assign(nObj1, nObj2, [5, 6, 7], "ttttttt");
console.log(nObj5);

/**
 * Prpperty Descriptors
 * Позволяет изменять свойства объектов и их поведение
 * Можно сделать так, чтобы свойство "не было видно" в циклах
 * Или сделать свойство read only
 */

var zObj = {};

Object.defineProperty(zObj, "a", {
  value: 2,
  writable: true, // создает неизменяемой свойство . в strict mode будет ошибка , если - false
  configurable: true, // если false, то не сможем изменить свойство с помощью defineProperty или удалить его
  enumerable: true // если false, то позволяет убрать свойство из перечисления в циклах
});

console.log("---------------------------------------");
console.log(zObj);

/**
 * Immutability
 * Установив writable: false, мы сделаем ынеизменяемым только само
 * свойство объекта. Но не ссылки в нем.
 */
var dObj = {};

Object.defineProperty(dObj, "imun", {
  value: {},
  writable: false,
  configurable: false
});
dObj.imun.c = "changed!";
console.log("---------------------------------------");
console.log(dObj.imun);

/**
 * Prevent Extentions
 * При использовании Object.preventExtention -
 * мы запретим добавление новых свойств в объект
 */

var sObj = {
  a: 2
};

Object.preventExtensions(sObj);
sObj.b = 3;

console.log("---------------------------------------");
console.log(sObj.b); // undefined. В strict mode будет TypeError

/**
 * Seal - запечатать
 * При использовании Object.seal(..) - совмещаются
 * Immutability и Prevent Extentions
 * Это тоже самое - как вызвать  Object.preventExtensions
 * и поставить configurable: false
 */

/**
 * Freez
 * Object.freez(..)
 * Это сочетание Object.seal(..) и writable: false
 * Заморозка не глубокая. Рекурсивно вглубь не идет.
 * Если надо рекурсивно замораживать внутренние объекты, то
 * придется писать самому
 */

/**
 * Доступ к свойству объекта.
 * [[Get]] [[Put]]
 * Как получаем значение свойства объекта
 */

var gObj = {
  a: 2
};

/**
 * При таком обращении к свойству объекта
 * вызывается Геттер. У каждого свойства есть свой геттер
 *
 */

gObj.a; // 2

/**
 * Getters and Setters
 * Они получают и устанавливают свойства у объекта
 * в ES5 данное поведение можно переопределить
 * Функции получения и установки свойств задаются
 * для каждого свойства в объекте.
 * И задать свои обработчики
 */
// задали геттер для a
var xObj = {
  a: 3,
  get a() {
    return 2;
  } // getter для a
};
// а можно вот так
Object.defineProperty(xObj, "b", {
  get: function() {
    return this.a * 2;
  }, // getter для b
  enumerable: true
});

console.log("---------------------------------------");
console.log(xObj.a);
console.log(xObj.b);

var xObj1 = {
  // getter для 'a'
  get a() {
    return this._a_;
  },
  // seter для 'a'
  set a(val) {
    this._a_ = val * 2;
  }
};

xObj1.a = 2;
console.log("---------------------------------------");
console.log(xObj1.a);

/**
 * Как узнать о том, Что свойство существует ?
 */
var uObj = {
  a: 2
};
console.log("---------------------------------------");
// проверяет всю цепочку прототипов.
console.log("a" in uObj);
console.log("b" in uObj);

// проверяет только данный объект
console.log(uObj.hasOwnProperty("a"));
console.log(uObj.hasOwnProperty("b"));

/**
 * Existence применительно к массивам
 * особенность в том, Что ищет не по значению
 * а по индексу
 */
console.log("---------------------------------------");
console.log(4 in [2, 4, 6]); // вернет false. индекса 4 нет. Есть только 0,1,2
console.log(1 in [2, 4, 6]); // вернет true. индекс 1 есть. Т.к. 0,1,2

/**
 * Enumeration
 *
 */
var eObj = {};
Object.defineProperty(eObj, "a", {
  enumerable: true, // свойство перечисляемое
  value: 2
});

Object.defineProperty(eObj, "b", {
  enumerable: false, // свойство неперечисляемое
  value: 3
});
console.log("---------------------------------------");
console.log(eObj.b);
console.log("b" in eObj);
console.log(eObj.hasOwnProperty("b"));
for (var k in eObj) {
  console.log(k, eObj[k]);
}

/**
 * Цикл for..in по массиву
 * цикл проходит по всем перечисляемым свойствам.
 * А т.к. могут быть кастомные перечисляемные свойства. То
 * цикл пойдет и по ним.
 */

console.log("---------------------------------------");
var a = [1, 2, 3];
a.custom = function() {
  console.log("bebe");
};
a.ecust = [5, 4, 3, 1];

for (e in a) {
  console.log(e);
}

/**
 * Проверка на enumeration
 */
console.log("---------------------------------------");
console.log(eObj.propertyIsEnumerable("a"));
console.log(eObj.propertyIsEnumerable("b"));

console.log(Object.keys(eObj)); // показать все перечисляемые свойства
console.log(Object.getOwnPropertyNames(eObj)); // показать все свойства
