function getPrice2(currency = "$") {
  console.log(currency + this.price);
  return this;
}

function getPrice1(currency = "$") {
  //return this.price;
  return currency + this.price;
}

function getPrice() {
  //return this.price;
  return this;
}

function getName() {
  //return this.name;
  return this;
}

const prod1 = {
  name: "Intel",
  price: 100,
  getPrice: function() {
    return this.price;
  },
  info: {
    information: ["2.3Ghz"],
    getInfo: function() {
      return this.information;
    }
  }
};

const prod2 = {
  name: "AMD",
  price: 50,
  getPrice,
  getName() {
    return this.name;
  }
};

console.log(prod1.getPrice());
console.log(prod1.info.getInfo());

console.log(prod2.getPrice());
console.log(prod2.getName());

prod1.getName = prod2.getName;
console.log(prod1.getName());

// Call chain
let str = "Hello world";
const reverseStr = str
  .split("")
  .reverse()
  .join("");
console.log(reverseStr);

const prod3 = {
  name: "VIA",
  price: 200,
  getName,
  getPrice
};

console.log(prod3.getName().getPrice());

const prod4 = {
  name: "NVIDIA",
  price: 10,
  getPrice2
};

console.log(getPrice.call(prod4));

console.log(getPrice1.call(prod4, "%"));
console.log(getPrice1.apply(prod4, ["*"]));

const getPriceBind = prod4.getPrice2.bind(prod4, "#");
setTimeout(getPriceBind, 1000);
