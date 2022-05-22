import { declareAtom } from "@reatom/core";
import { setLongBreakLength, setPomodoroLength, setPomodorosBeforeLongBreak, setShortBreakLength } from "../actions/countdownSettingsActions";

const countdownSettingsAtom = declareAtom({
    pomodoroLength: 1500,
    shortBreakLength: 300,
    longBreakLength: 900,
    pomodorosBeforeLongBreak: 4
}, on => [
    on(setPomodoroLength, (state, payload) => ({...state, pomodoroLength: payload})),
    on(setShortBreakLength, (state, payload) => ({...state, shortBreakLength: payload})),
    on(setLongBreakLength, (state, payload) => ({...state, longBreakLength: payload})),
    on(setPomodorosBeforeLongBreak, (state, payload) => ({...state, pomodorosBeforeLongBreak: payload})),
]);

export default countdownSettingsAtom;