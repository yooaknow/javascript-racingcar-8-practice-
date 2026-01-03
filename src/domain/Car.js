/* Car.js에 들어가야하는 내용
- 입력된 값이 5보다 크지 않으면 예외 처리 
- 이름과 거리가 들어간 객체 생성
- 만약 들어온 랜덤 값이 4보나 크거나 같은 경우에 더함
- 이름이 비어 있으면 에러
*/

class Car {
  constructor(name, position = 0) {
    const trimmed = (name ?? "").trim();

    if (trimmed.length === 0 || trimmed.length > 5) {
      throw new Error("[ERROR] 이름은 1~5자여야 합니다.");
    }

    this.name = trimmed;
    this.position = position;
  }

  run(num) {
    if (num >= 4) {
      this.position += 1;
    }
  }
}

export default Car;
