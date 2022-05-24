import { declareAction } from "@reatom/core";
import { INTERVAL_LENGTH } from "../../constants";
import countdownSettingsAtom from "../atoms/countDownSettingsAtom";
import countdownAtom, {
    clearPomodoroCount,
    clearTimerIntervalAction,
    decrementTimerAction,
    incrementPomodoroCount,
    pauseTimerIntervalAction,
    setTimerAction,
    setTimerIntervalAction,
    setTimerOnBreak,
    unsetTimerOnBreak
} from "../atoms/countdownAtom";

export const decreaseTimer = declareAction((payload, store) => {
    const {secondsLeft, pomodoroCount, onBreak} = store.getState(countdownAtom);
    const {pomodoroLength, pomodorosBeforeLongBreak} = store.getState(countdownSettingsAtom);

    if (secondsLeft <= 0) {
        if (!onBreak) {
            if (pomodoroCount < pomodorosBeforeLongBreak) {
                store.dispatch(initShortBreak());
            } else if (pomodoroCount === pomodorosBeforeLongBreak) {
                store.dispatch(initLongBreak());
            } else {
                store.dispatch(pauseTimer())
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

export const setPomodoroLength = declareAction<number>((payload, store) => {
    if (payload > 0) {
        store.dispatch(setTimerAction(payload));
    } else {
        store.dispatch(setTimerAction(0));
    }
});

export const startTimer = declareAction((payload, store) => {
    const {interval} = store.getState(countdownAtom);
    const {pomodoroLength} = store.getState(countdownSettingsAtom);

    if (!interval) {
        store.dispatch(setPomodoroLength(pomodoroLength))
        store.dispatch(setTimerIntervalAction(setInterval(() => {
            store.dispatch(decreaseTimer());
        }, INTERVAL_LENGTH)))
    }

    store.dispatch(incrementPomodoroCount());
});

export const pauseTimer = declareAction((payload, store) => {
    const {interval} = store.getState(countdownAtom);

    if (interval) {
        clearInterval(interval);
        store.dispatch(pauseTimerIntervalAction());
    }
})

export const clearTimer = declareAction((payload, store) => {
    const {interval} = store.getState(countdownAtom);

    if (interval) {
        clearInterval(interval);
    }

    store.dispatch(clearTimerIntervalAction());
})

export const resumeTimer = declareAction((payload, store) => {
    const {interval} = store.getState(countdownAtom);

    if (!interval) {
        store.dispatch(setTimerIntervalAction(setInterval(() => {
            store.dispatch(decreaseTimer());
        }, INTERVAL_LENGTH)))
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