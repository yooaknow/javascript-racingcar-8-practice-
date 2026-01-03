/* outputview.js에 들어가야하는 내용
- 매 회차 결과 출력
- 최종 우승자 출력)
*/
import { Console } from "@woowacourse/mission-utils";

const OutputView = {
  printRoundResult(cars) {
    cars.forEach((car) => {
      Console.print(`${car.name} : ${"-".repeat(car.position)}`);
    });
    Console.print("");
  },

  printWinners(winners) {
    Console.print(`최종 우승자 : ${winners.join(", ")}`);
  },

  printError(message) {
    Console.print(message);
  },
};

export default OutputView;
