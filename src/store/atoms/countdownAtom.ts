import { declareAction, declareAtom } from "@reatom/core";
import countdownSettingsAtom from "./countDownSettingsAtom";

// import { 
//     clearPomodoroCount, 
//     clearTimerIntervalAction, 
//     decrementTimerAction, 
//     incrementPomodoroCount, 
//     pauseTimerIntervalAction, 
//     setTimerAction, 
//     setTimerIntervalAction, 
//     setTimerOnBreak, 
//     unsetTimerOnBreak 
// } from "../actions/countdownActions";

const INTERVAL_LENGTH = 10;

export const decrementTimerAction = declareAction();
export const setTimerAction = declareAction<number>();
export const setTimerIntervalAction = declareAction<ReturnType<typeof setInterval>>();
export const pauseTimerIntervalAction = declareAction();
export const clearTimerIntervalAction = declareAction();
export const setTimerOnBreak = declareAction();
export const unsetTimerOnBreak = declareAction();
export const incrementPomodoroCount = declareAction();
export const clearPomodoroCount = declareAction();

export const setPomodoroLength = declareAction<number>((payload, store) => {
    if (payload > 0) {
        store.dispatch(setTimerAction(payload));
    } else {
        store.dispatch(setTimerAction(0));
    }
});

export const decreaseTimer = declareAction((payload, store) => {
    const {secondsLeft, pomodoroCount, onBreak} = store.getState(countdownTimerAtom);
    const {pomodoroLength, pomodorosBeforeLongBreak} = store.getState(countdownSettingsAtom);

    if (secondsLeft <= 0) {
        if (!onBreak) {
            if (pomodoroCount < pomodorosBeforeLongBreak) {
                store.dispatch(initShortBreak());
            } else if (pomodoroCount === pomodorosBeforeLongBreak) {
                store.dispatch(initLongBreak());
            } else {
                store.dispatch(pauseTimerAction())
            }

            store.dispatch(setTimerOnBreak());
        } else {
            store.dispatch(unsetTimerOnBreak());
            store.dispatch(setPomodoroLength(pomodoroLength))
        }
    } else {
        store.dispatch(decrementTimerAction());
    }
})

export const initShortBreak = declareAction((payload, store) => {
    const {shortBreakLength} = store.getState(countdownSettingsAtom);

    store.dispatch(incrementPomodoroCount());
    store.dispatch(setPomodoroLength(shortBreakLength));
});

export const initLongBreak = declareAction((payload, store) => {
    const {longBreakLength} = store.getState(countdownSettingsAtom);

    store.dispatch(clearPomodoroCount());
    store.dispatch(setPomodoroLength(longBreakLength));
});

export const startIntervalAction = declareAction((payload, store) => {
    const {interval} = store.getState(countdownTimerAtom);

    if (!interval) {
        store.dispatch(setTimerIntervalAction(setInterval(() => {
            store.dispatch(decreaseTimer());
        }, INTERVAL_LENGTH)))
    }

    store.dispatch(incrementPomodoroCount());
})

export const initTimerAction = declareAction((payload, store) => {
    const {pomodoroLength} = store.getState(countdownSettingsAtom);

    store.dispatch(setPomodoroLength(pomodoroLength));
})

export const pauseTimerAction = declareAction((payload, store) => {
    const {interval} = store.getState(countdownTimerAtom);

    if (interval) {
        clearInterval(interval);
        store.dispatch(pauseTimerIntervalAction());
    }
})

export const resumeIntervalAction = declareAction((payload, store) => {
    const {interval} = store.getState(countdownTimerAtom);

    if (!interval) {
        store.dispatch(setTimerIntervalAction(setInterval(() => {
            store.dispatch(decreaseTimer());
        }, INTERVAL_LENGTH)))
    }
})

export const clearTimerAction = declareAction((payload, store) => {
    const {interval} = store.getState(countdownTimerAtom);

    if (interval) {
        clearInterval(interval);
    }

    store.dispatch(clearTimerIntervalAction());
})

const countdownTimerAtom = declareAtom<{secondsLeft: number, pomodoroCount: number, onBreak: boolean, interval: ReturnType<typeof setInterval> | null}>({
    secondsLeft: 0,
    pomodoroCount: 0,
    onBreak: false,
    interval: null,
}, on => [
    on(decrementTimerAction, state => ({ ...state, secondsLeft: state.secondsLeft - 1 })),
    on(setTimerAction, (state, payload: number) => ({ ...state, secondsLeft: payload })),
    on(setTimerIntervalAction, (state, payload?: any) =>  ({ ...state, interval: payload })),
    on(pauseTimerIntervalAction, state => ({ ...state, interval: null })),
    on(clearTimerIntervalAction, state => ({ secondsLeft: 0, pomodoroCount: 0, onBreak: false, interval: null })),
    on(setTimerOnBreak, state => ({ ...state, onBreak: true })),
    on(unsetTimerOnBreak, state => ({ ...state, onBreak: false })),
    on(incrementPomodoroCount, state => ({ ...state, pomodoroCount: state.pomodoroCount + 1 })),
    on(clearPomodoroCount, state => ({ ...state, pomodoroCount: 0 })),
])

export default countdownTimerAtom;

