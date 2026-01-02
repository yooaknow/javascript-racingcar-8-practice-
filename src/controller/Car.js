class Car {
  constructor(name, position = 0) {
    this.name = name;
    this.position = position;
  }
}

const car = new Car("pobi");

console.log(car);     
console.log(car.name);     
console.log(car.position);

//클래스로 객체 생성 