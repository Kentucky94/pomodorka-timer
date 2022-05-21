import { declareAtom } from "@reatom/core"
import { decrementTimerAction } from "../actions/countdownActions"

const countdownTimerAtom = declareAtom(1000, on => [
    on(decrementTimerAction, state => state - 1 )
])

export default countdownTimerAtom;

