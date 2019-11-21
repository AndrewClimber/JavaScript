/*
TODO: Создать объект, который описывает ширину и высоту прямоугольника, 
TODO: а также может посчитать площадь фигуры:
# const rectangle = {width:..., height:..., getSquare:...};
*/

const rectangle = {
  width: 10,
  height: 30,
  getSquare() {
    return this.width * this.height;
  }
};

//console.log(rectangle.getSquare());

/*
TODO:  Создать объект, у которого будет цена товара и его скидка, а также
TODO:  два метода: для получения цены и для расчета цены с учетом скидки:
# const price = {
#    price: 10,
#    discount: '15%',
# ... };
# price.getPrice(); // 10
# price.getPriceWithDiscount(); // 8.5
*/

const price = {
  price: 10,
  discount: "15%",
  getPrice() {
    return this.price;
  },
  getPriceWithDiscount() {
    return this.price - (this.price * parseInt(this.discount)) / 100;
  }
};

console.log(price.getPrice());
console.log(price.getPriceWithDiscount());

/*
TODO: Создать объект, у которого будет поле высота и метод “увеличить
TODO: высоту на один”. Метод должен возвращать новую высоту:
# object.height = 10;
# object.inc(); // придумать свое название для метода
# object.height; // 11;
*/

geomObject = {
  height: 10,
  heightInc() {
    this.height += 1;
  }
};

console.log(geomObject.height);
geomObject.heightInc();
console.log(geomObject.height);

/*
TODO: Создать объект “вычислитель”, у которого есть числовое свойство
TODO: “значение” и методы “удвоить”, “прибавить один”, “отнять один”.
TODO: Методы можно вызывать через точку, образуя цепочку методов:
# const numerator = {
#    value: 1,
#    double: function () {...},
#    plusOne: function () {...},
#    minusOne: function () {...},
# }
* numerator.double().plusOne().plusOne().minusOne();
* numerator.value // 3
*/

const numerator = {
  value: 1,
  double() {
    this.value *= 2;
    return this;
  },
  plusOne() {
    this.value += 1;
    return this;
  },
  minusOne() {
    this.value -= 1;
    return this;
  }
};

console.log(
  numerator
    .double()
    .plusOne()
    .minusOne().value
);

let user = {
  firstName: "Вася",
  sayHi() {
    console.log(`Привет, ${this.firstName}!`);
  }
};

setTimeout(user.sayHi, 1000); // Привет, undefined!

// замыкание
setTimeout(function() {
  user.sayHi(); // Привет, Вася!
}, 1000);

// замыкание
setTimeout(() => user.sayHi(), 1000); // Привет, Вася!

// более правильный вариант
let sayHi = user.sayHi.bind(user); // (*)

sayHi(); // Привет, Вася!

setTimeout(sayHi, 1000); // Привет, Вася!
