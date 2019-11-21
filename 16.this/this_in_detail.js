/*
!Понимание this в JavaScript и того, что имеется ввиду при его упоминании, может быть немного затруднительным. 
*Но к счастью, есть пять главных правил, которые вы можете использовать для определения того, к чему привязан this. 
!Есть несколько кейсов, которые эти правила не затрагивают, НО они должны помочь вам с подавляющим большинством 
*рабочих ситуаций.
https://medium.com/@stasonmars/%D0%BF%D0%BE%D0%B4%D1%80%D0%BE%D0%B1%D0%BD%D0%BE-%D0%BE-%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%B0%D1%85-apply-call-%D0%B8-bind-%D0%BD%D0%B5%D0%BE%D0%B1%D1%85%D0%BE%D0%B4%D0%B8%D0%BC%D1%8B%D1%85-%D0%BA%D0%B0%D0%B6%D0%B4%D0%BE%D0%BC%D1%83-javascript-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA%D1%83-ddd5f9b06290
*/
var person = {
  first: "John",
  last: "Smith",
  full: function() {
    console.log(this.first + " " + this.last);
  }
};

//person.full(); // logs => 'John Smith'

var person2 = {
  first: "John",
  last: "Smith",
  full: function() {
    console.log(this.first + " " + this.last);
  },
  personTwo: {
    first: "Allison",
    last: "Jones",
    full: function() {
      console.log(this.first + " " + this.last);
    }
  }
};

//person2.full(); // logs => 'John Smith'
//person2.personTwo.full(); // logs => 'Allison Jones'

// С использованием new
function Car(make, model) {
  this.make = make;
  this.model = model;
}

//При использовании new, значение this выставляется пустому объекту, как в этом случае, myCar.
var myCar = new Car("Ford", "Escape");
//console.log(myCar); // logs => Car {make: "Ford", model: "Escape"}

/*
!Bind() позволяет нам выставить значение this для метода
*/
// Переменная data является глобальной
var data = [
  { name: "Samantha", age: 12 },
  { name: "Alexis", age: 14 }
];

var user = {
  //  а это уже локальная data
  data: [
    { name: "T. Woods", age: 37 },
    { name: "P. Mickelson", age: 43 }
  ],
  showData: function(event) {
    var randomNum = ((Math.random() * 2) | 0) + 1 - 1; // Любое число с 0 до 1

    console.log(this.data[randomNum].name + " " + this.data[randomNum].age);
  }
};

//  Назначаем метод showData от объекта переменной
//var showDataVar = user.showData;

//showDataVar(); // Samantha 12 (Данные взялись из глобального массива данных, а не из локального в объекте)

//  Привязываем метод showData к объекту user
var showDataVar = user.showData.bind(user);

// Теперь мы получаем значение из объекта user, так как this привязано к объекту
showDataVar(); // P. Mickelson 43

/*
!С помощью bind() мы можем заимствовать методы
*/

//  Тут у нас объект с данными о машинах, у которого нет метода для вывода своих данных в консоль
var cars = {
  data: [
    { name: "Honda Accord", age: 14 },
    { name: "Tesla Model S", age: 2 }
  ]
};

//  Мы можем взять метод showData() из объекта user, который мы сделали в предыдущем примере
//  Ниже мы свяжем метод user.showData с объектом cars
cars.showData = user.showData.bind(cars);
cars.showData(); // Honda Accord 14

/*
!С помощью bind() мы можем каррировать функцию
*/
function greet(gender, age, name) {
  // Если мужчина, то используем Mr., если нет то Ms..
  var salutation = gender === "male" ? "Mr. " : "Ms. ";

  if (age > 25) {
    return "Hello, " + salutation + name + ".";
  } else {
    return "Hey, " + name + ".";
  }
}

//  В общем, мы передаем null, так как мы не используем this в функции
var greetAnAdultMale = greet.bind(null, "male", 45);

console.log(greetAnAdultMale("John Hartlove")); // "Hello, Mr. John Hartlove."

var greetAYoungster = greet.bind(null, "", 16);
console.log(greetAYoungster("Alex")); // "Hey, Alex."
console.log(greetAYoungster("Emma Waterloo")); // "Hey, Emma Waterloo."

/*
!Методы Apply и Call
*/

//  Создаём объект со свойствами и методами
//  Далее мы передадим метод, как колбэк другой функции
var clientData = {
  id: 094545,
  fullName: "Not Set",
  //  Метод на объекте clientData
  setUserName: function(firstName, lastName) {
    //  тут мы выставляем fullName свойство в данном объекте
    this.fullName = firstName + " " + lastName;
  }
};

function getUserInput(firstName, lastName, callback, callbackObj) {
  //  Использование метода apply ниже, выставит this для callbackObj
  callback.apply(callbackObj, [firstName, lastName]);
}

// Объект clientData будет использоваться методом Apply, чтобы выставить значение this.
getUserInput("Barack", "Obama", clientData.setUserName, clientData);
// Получаем в консоль
console.log(clientData.fullName); // Barack Obama

/*
 *Объект arguments который является свойством всех функций в JavaScript — является массивоподобным объектом и
 *по этой причине, одним из самых популярных применений call() и apply() методов это извлечение параметров
 *переданных функции из этого объекта.
 */
function transitionTo() {
  //  Так как объект arguments это массивоподобный объект
  //  Мы можем использовать на нём slice ()
  //  Число один в параметре говорит о том, нужно отдать копию массива от параметра с индексом 1 и до конца.
  // Или простым языком, просто пропустить первый элемент.

  var args = Array.prototype.slice.call(arguments, 1);

  //  Я добавил этот кусочек кода, чтобы мы могли видеть то, что получится в args.

  //  Я закомментировал последнюю строку, потому что она не в тему этого примера.
  // doTransition(this, name, this.updateURL, args);
  return args;
}

//  Так как метод slice() скопировал все элементы начиная от индекса 1 до конечного,
// первый элемент “contact” не был отдан.
console.log(transitionTo("contact", "Today", "20")); // ["Today", "20"]

/*
!Заимствование чужих методов и функций
*/

var gameController = {
  scores: [20, 34, 55, 46, 77],
  avgScore: null,
  players: [
    { name: "Tommy", playerID: 987, age: 23 },
    { name: "Pau", playerID: 87, age: 33 }
  ]
};

var appController = {
  scores: [900, 845, 809, 950],
  avgScore: null,
  avg: function() {
    var sumOfScores = this.scores.reduce(function(prev, cur, index, array) {
      return prev + cur;
    });

    this.avgScore = sumOfScores / this.scores.length;
  }
};

//  Обратите внимание, что тут мы используем apply(), так что вторым аргументом должен быть массив
appController.avg.apply(gameController);
console.log(gameController.avgScore); // 46.4

//  appController.avgScore до сих пор null; он не изменился, только gameController.avgScore
console.log(appController.avgScore); // null

/*
Вы возможно хотите знать, что случится если метод, который мы заимствуем изменится.
*/
appController.maxNum = function() {
  this.avgScore = Math.max.apply(null, this.scores);
};

appController.maxNum.apply(gameController, gameController.scores);
console.log(gameController.avgScore); // 77
