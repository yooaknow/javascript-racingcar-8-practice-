/* CarController.js에 들어가야하는 내용
1. Inputview에서 입력값 받기 (이름 목록)
(- 에러 던진 거 받아서 try catch 다시 입력 받기)

2. 입력값을 split으로 나눠주기 
(- 시도 횟수 숫자 아니면 에러난거 받아서 try catch 다시 입력 받기)

3. 나눠서 배열로 바꾼 다음, Cars.js에 전달하기

4. ramdom.js의 함수를 Cars로 전달하기
-> 매회 출력에 필요한 값 받아서, Outputview에 넘겨주기 

5. Cars에서 최종 우승자 받아서 Outputview에 넘겨주기 

*/

import InputView from "../view/Inputview.js";
import OutputView from "../view/OutputView.js";
import Cars from "../domain/Cars.js";
import { generateRandom } from "../domain/RandomGenerator.js";
import { Console } from "@woowacourse/mission-utils";

class GameController {
  run() {
    const self = this;

    return new Promise(function (resolve, reject) {
      InputView.readCarNames(function (input) {
        try {
          const names = self.parseNames(input);
          self.cars = new Cars(names);

          self.askTryCount(resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  /*
  게임을 시작하고, 입력을 다 받아서 문제가 없으면 계속 -> 중간에 잘못되면 에러로 종료
  이걸 Promise로 감싸서 await run()으로 기다릴 수 있게 함.

  const self = this; -> 여기서 this는 GameController의 인스턴스임. 
  this.cars, this.parseNames, this.askTryCount 등등을 사용 할 수 있음.
  그러나, 뒤에서 function()을 쓰면 this가 바뀌기 때문에 self에 미리 담아둠.

  return new Promise(function (resolve, reject) { ... })
  -> 이 함수는 당장 끝나지 않음, 나중에 입력을 다 받았을 때 알려준다는 의미
  성공시 resolve () / 실패시 reject (e) 호출

  InputView.readCarNames(function (input) 
  -> Inputview 에게 자동차 이름을 입력받도록 요청함. 사용자가 값을 입력하면, 그 값이 function(input)로 전달됨.

  try {
  -> 입력 검증 중 문제가 생기면 잡기 위함.
  
  const names = self.parseNames(input);
  -> 여기서 호출되는 함수 -> parseNames(input) 
  -> 공백 제거, 빈 이름이 있으면 에러
  
  self.cars = new Cars(names);
  -> Cars 클래스가 호출됨. 내부에서 각 이름으로 Car 인스턴스 생성
  
  self.askTryCount(resolve, reject);
  -> 이제 다음 입력을 받으러 이동함. 여기서도 resolve, reject를 넘겨줌. , 왜냐면, askTryCount에도 비동기 입력이 있음
  거기서도 성공 -> resolve(), 실패 -> reject(e) 호출해야 하기 때문임.
  
  catch (e) {
    reject(e);
  }
  -> 입력 중에 오류가 나면, catch로 넘어와서 reject(e)를 호출함. Primise 실패 -> await expect(...).rejects.toThrow("[ERROR]")
  */

  parseNames(input) {
    const names = input.split(",").map(function (n) {
      return n.trim();
    });

    if (names.some(function (n) { return n.length === 0; })) {
      throw new Error("[ERROR] 이름은 비어 있을 수 없습니다.");
    }

    return names;
  }

  askTryCount(resolve, reject) {
    const self = this;

    InputView.readTryCount(function (input) {
      try {
        const count = self.parseTryCount(input);
        self.startRacing(count);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  parseTryCount(input) {
    const value = Number(input);

    if (Number.isNaN(value) || value <= 0) {
      throw new Error("[ERROR] 시도 횟수는 숫자여야 합니다.");
    }

    return value;
  }

  startRacing(count) {
    Console.print("\n실행 결과");

    for (let i = 0; i < count; i++) {
      this.cars.race(generateRandom);
      OutputView.printRoundResult(this.cars.cars);
    }

    const winners = this.cars.findWinners();
    OutputView.printWinners(winners);
  }
}

export default GameController;
