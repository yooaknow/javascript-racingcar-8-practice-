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
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";
import Cars from "../domain/Cars.js";
import { generateRandom } from "../domain/RandomGenerator.js";
import { Console } from "@woowacourse/mission-utils";

class GameController {
  run() {
    return new Promise((resolve, reject) => {
      InputView.readCarNames((input) => {
        try {
          const names = this.parseNames(input);
          this.cars = new Cars(names);

          this.askTryCount(resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  parseNames(input) {
    const names = input.split(",").map((n) => n.trim());

    if (names.some((n) => n.length === 0)) {
      throw new Error("[ERROR] 이름은 비어 있을 수 없습니다.");
    }

    return names;
  }

  askTryCount(resolve, reject) {
    InputView.readTryCount((input) => {
      try {
        const count = this.parseTryCount(input);
        this.startRacing(count);
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
