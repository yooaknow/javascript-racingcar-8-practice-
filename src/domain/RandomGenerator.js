/* random.js에 들어가야하는 내용
- 0~9까지의 랜덤 값 생성
*/

import { Random } from "@woowacourse/mission-utils";

export function generateRandom() {
  return Random.pickNumberInRange(0, 9);
}
