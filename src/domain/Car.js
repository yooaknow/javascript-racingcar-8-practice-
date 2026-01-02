/* Car.js에 들어가야하는 내용
- 입력된 값이 5보다 크지 않으면 예외 처리 
- 이름과 거리가 들어간 객체 생성
- 만약 들어온 랜덤 값이 4보나 크거나 같은 경우에 더함


- (추가해야함) 이름이 비어 있으면 에러
*/



class Car {
  constructor(name, position = 0) {

    if (name.length>=5)
    {
      throw new Error("[Error] 입력된 값이 5보다 큽니다.");
    }else{
      this.name = name;
      this.position = position;
    }
  }

  run (num){
    if (num>=4)
    this.position += 1;
  }
}


const car = new Car("pobi");

console.log(car);     
console.log(car.name);     
console.log(car.position);

car.run(5);
console.log(car.position);


//클래스로 객체 생성 

// 만약, 입력된 값이 5보다 크다면 에러 던지기
const car2 = new Car("pobiiii");
console.log(car2); 