// import { declareAction } from "@reatom/core";
// import countdownSettingsAtom from "../atoms/countDownSettingsAtom";

// export const decrementTimerAction = declareAction();
// export const setTimerAction = declareAction<number>();
// export const setTimerIntervalAction = declareAction<any>();
// export const pauseTimerIntervalAction = declareAction();
// export const clearTimerIntervalAction = declareAction();
// export const setTimerOnBreak = declareAction();
// export const unsetTimerOnBreak = declareAction();
// export const incrementPomodoroCount = declareAction();
// export const clearPomodoroCount = declareAction();

// export const setPomodoroLength = declareAction<number>((payload, store) => {
//     if (payload > 0) {
//         store.dispatch(setTimerAction(payload));
//     } else {
//         store.dispatch(setTimerAction(0));
//     }
// });

// export const decreaseTimer = declareAction((payload, store) => {
//     const {secondsLeft, pomodoroCount, onBreak} = store.getState(countdownTimerAtom);
//     const {pomodoroLength, pomodorosBeforeLongBreak} = store.getState(countdownSettingsAtom);

//     if (secondsLeft <= 0) {
//         if (pomodoroCount < pomodorosBeforeLongBreak) {
//             store.dispatch(initShortBreak());
//         } else if (pomodoroCount === pomodorosBeforeLongBreak) {
//             store.dispatch(initLongBreak());
//         } else {
//             store.dispatch(pauseTimerAction())
//         }

//         if (onBreak) {
//             store.dispatch(unsetTimerOnBreak());
//             store.dispatch(setPomodoroLength(pomodoroLength))
//         } else {
//             store.dispatch(setTimerOnBreak());
//         }
//     } else {
//         store.dispatch(decrementTimerAction());
//     }
// })

// export const initShortBreak = declareAction((payload, store) => {
//     const {shortBreakLength} = store.getState(countdownSettingsAtom);

//     store.dispatch(incrementPomodoroCount());
//     store.dispatch(setPomodoroLength(shortBreakLength));
// });

// export const initLongBreak = declareAction((payload, store) => {
//     const {longBreakLength} = store.getState(countdownSettingsAtom);

//     store.dispatch(clearPomodoroCount());
//     store.dispatch(setPomodoroLength(longBreakLength));
// });

// export const startIntervalAction = declareAction((payload, store) => {
//     const {interval} = store.getState(countdownTimerAtom);

//     if (!interval) {
//         store.dispatch(setTimerIntervalAction(setInterval(() => {
//             store.dispatch(decreaseTimer());
//         }, 10)))
//     }
// })

// export const initTimerAction = declareAction((payload, store) => {
//     const {pomodoroLength} = store.getState(countdownSettingsAtom);

//     store.dispatch(setPomodoroLength(pomodoroLength));
// })

// export const pauseTimerAction = declareAction((payload, store) => {
//     const {interval} = store.getState(countdownTimerAtom);

//     if (interval) {
//         clearInterval(interval);
//         store.dispatch(pauseTimerIntervalAction());
//     }
// })

// export const clearTimerAction = declareAction((payload, store) => {
//     const {interval} = store.getState(countdownTimerAtom);

//     if (interval) {
//         clearInterval(interval);
//         store.dispatch(clearTimerIntervalAction());
//     }
// })

export default "asdf";