import { declareAction } from "@reatom/core";
import { INTERVAL_LENGTH } from "../../constants";
import countdownSettingsAtom from "../atoms/countDownSettingsAtom";
import countdownAtom, {
    clearPomodoroCount,
    clearTimerIntervalAction,
    decrementSecondsLeftAction,
    incrementPomodoroCount,
    pauseTimerIntervalAction,
    setSecondsLeftAction,
    setTimerIntervalAction,
    setTimerOnBreak,
    unsetTimerOnBreak
} from "../atoms/countdownAtom";
import { setPauseAction, setStartAction, setStopAction } from "../actions/countdownStatusActions";

export const countDownAction = declareAction((payload, store) => {
    const {secondsLeft, pomodoroCount, onBreak} = store.getState(countdownAtom);
    const {pomodorosBeforeLongBreak} = store.getState(countdownSettingsAtom);

    if (secondsLeft <= 0) {
        if (onBreak) {
            store.dispatch(unsetTimerOnBreak());
            store.dispatch(initPomodoro());
        } else {
            if (pomodoroCount < pomodorosBeforeLongBreak) {
                store.dispatch(initShortBreak());
            } else {
                store.dispatch(initLongBreak());
            }

            store.dispatch(setTimerOnBreak());
        }
    } else {
        store.dispatch(decrementSecondsLeftAction());
    }
})

export const setPomodoroLength = declareAction<number>((payload, store) => {
    if (payload > 0) {
        store.dispatch(setSecondsLeftAction(payload));
    } else {
        store.dispatch(setSecondsLeftAction(0));
    }
});

export const startTimer = declareAction((payload, store) => {
    const {interval} = store.getState(countdownAtom);

    if (!interval) {
        store.dispatch(initPomodoro());
        store.dispatch(setTimerIntervalAction(setInterval(() => {
            store.dispatch(countDownAction());
        }, INTERVAL_LENGTH)))
        store.dispatch(setStartAction());
    }
});

export const pauseTimer = declareAction((payload, store) => {
    const {interval} = store.getState(countdownAtom);

    if (interval) {
        clearInterval(interval);
        store.dispatch(pauseTimerIntervalAction());
        store.dispatch(setPauseAction());
    }
})

export const clearTimer = declareAction((payload, store) => {
    const {interval} = store.getState(countdownAtom);

    if (interval) {
        clearInterval(interval);
    }

    store.dispatch(clearTimerIntervalAction());
    store.dispatch(setStopAction());
})

export const resumeTimer = declareAction((payload, store) => {
    const {interval} = store.getState(countdownAtom);

    if (!interval) {
        store.dispatch(setTimerIntervalAction(setInterval(() => {
            store.dispatch(countDownAction());
        }, INTERVAL_LENGTH)));

        store.dispatch(setStartAction());
    }
})

export const initPomodoro = declareAction((payload, store) => {
    const {pomodoroLength} = store.getState(countdownSettingsAtom);

    store.dispatch(setPomodoroLength(pomodoroLength));
    store.dispatch(incrementPomodoroCount());
})

export const initShortBreak = declareAction((payload, store) => {
    const {shortBreakLength} = store.getState(countdownSettingsAtom);

    store.dispatch(setPomodoroLength(shortBreakLength));
});

export const initLongBreak = declareAction((payload, store) => {
    const {longBreakLength} = store.getState(countdownSettingsAtom);

    store.dispatch(clearPomodoroCount());
    store.dispatch(setPomodoroLength(longBreakLength));
});