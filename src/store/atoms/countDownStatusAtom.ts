import { declareAtom } from "@reatom/core"
import { setPauseAction, setStartAction, setStopAction } from "../actions/countdownStatusActions"

export enum TIMER_STATUS {
    STOPPED, PAUSED, STARTED
}

export const couuntDownStatusAtom = declareAtom(TIMER_STATUS.STOPPED, on => [
    on(setStartAction, () => TIMER_STATUS.STARTED),
    on(setPauseAction, () => TIMER_STATUS.PAUSED),
    on(setStopAction, () => TIMER_STATUS.STOPPED),
])