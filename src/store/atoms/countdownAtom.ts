import { declareAction, declareAtom } from "@reatom/core";

export const decrementSecondsLeftAction = declareAction();
export const setSecondsLeftAction = declareAction<number>();
export const setTimerIntervalAction = declareAction<ReturnType<typeof setInterval>>();
export const pauseTimerIntervalAction = declareAction();
export const clearTimerIntervalAction = declareAction();
export const setTimerOnBreak = declareAction();
export const unsetTimerOnBreak = declareAction();
export const incrementPomodoroCount = declareAction();
export const clearPomodoroCount = declareAction();

const countdownAtom = declareAtom<{secondsLeft: number, pomodoroCount: number, onBreak: boolean, interval: ReturnType<typeof setInterval> | null}>({
    secondsLeft: 0,
    pomodoroCount: 0,
    onBreak: false,
    interval: null,
}, on => [
    on(decrementSecondsLeftAction, state => {
        return { ...state, secondsLeft: state.secondsLeft - 1 };
    }),
    on(setSecondsLeftAction, (state, payload: number) => {
        return { ...state, secondsLeft: payload };
    }),
    on(setTimerIntervalAction, (state, payload?: any) =>  { 
        return { ...state, interval: payload }
    }),
    on(pauseTimerIntervalAction, state => {
        return { ...state, interval: null };
    }),
    on(clearTimerIntervalAction, () => {
        return { secondsLeft: 0, pomodoroCount: 0, onBreak: false, interval: null }
    }),
    on(setTimerOnBreak, state => {
        return { ...state, onBreak: true }
    }),
    on(unsetTimerOnBreak, state => {
        return { ...state, onBreak: false }
    }),
    on(incrementPomodoroCount, state => {
        return { ...state, pomodoroCount: state.pomodoroCount + 1 };
    }),
    on(clearPomodoroCount, state => {
        return { ...state, pomodoroCount: 0 }
    }),
])

export default countdownAtom;

