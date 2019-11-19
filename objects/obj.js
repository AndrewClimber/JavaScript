const user = {
  firstName: "Denis",
  age: 30,
  isAdmin: true,
  email: "test@test.com",
  "user-address": {
    city: "Tomsk"
  },
  skills: ["phyton", "html", "css"]
};

let value;
let prop = "email";

// Чтение объекта
value = user.firstName;
value = user["isAdmin"];
value = user["user-address"];
value = user["user-address"].city;
value = user["user-address"]["city"];
value = user[prop];

let prop1 = "skills";
value = user[prop1];
value = user[prop1][0];

console.log(value);

// Запись в объект
user.firstName = "Tom";
value = user.firstName;

// добавить поле в объект . Надо просто обратится к еще несуществующему полю.
user.info = "Some info";
value = user.info;

user["user-address"].city = "Novosibirsk";

value = user["user-address"];

user["user-address"].country = "Sibir";
value = user["user-address"];
console.log(value);
