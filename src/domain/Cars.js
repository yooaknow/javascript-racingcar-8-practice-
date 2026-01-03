/* Cars.js에 들어가야하는 내용
- 컨트롤러에서 입력 문자열 받기 / 컨드톨러 (split → ["pobi","woni","jun"])
- 나눠서 Car에 넣기 (name이랑 position) 

- 그리고 input에서 몇번 돌릴 지를 정해주는데, 
해당 내용을 컨트롤러에서 받아서 그 수만큼
생성한 객체로  num이 5보다 크면 전진할 수 있도록 보내줘야함.
- 매회 출력을 위한 값 필요

- Car의 객체들을 받아와서, Car의 Position중 어떤게 가장 큰 지를 비교함. (우승자는 여러명 가능)
- 최종 출력을 위한 값 필요
*/

import Car from "./Car.js";

class Cars {
  constructor(names) {
    this.cars = names.map((name) => new Car(name));
  }

  race(random) {
    this.cars.forEach((car) => {
      const num = random();
      car.run(num);
    });
  }

  findWinners() {
    const max = Math.max(...this.cars.map((c) => c.position));

    return this.cars
      .filter((c) => c.position === max)
      .map((c) => c.name);
  }
}

export default Cars;
