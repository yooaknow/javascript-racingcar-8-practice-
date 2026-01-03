/* Inputview.js에 들어가야하는 내용
- 자동차 이름들 (문자열)
- 시도 횟수 (숫자)
*/
import { Console } from "@woowacourse/mission-utils";

const InputView = {
  readCarNames(callback) {
    Console.readLineAsync(
      "경주할 자동차 이름을 입력하세요(이름은 쉼표(,) 기준으로 구분)\n"
    ).then(callback);
  },

  readTryCount(callback) {
    Console.readLineAsync(
      "시도할 횟수는 몇 회인가요?\n"
    ).then(callback);
  },
};

export default InputView;
