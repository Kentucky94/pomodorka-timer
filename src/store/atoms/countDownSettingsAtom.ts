import { declareAtom } from "@reatom/core";
import { setPomodoroLength } from "../actions/countdownSettingsActions";

const countdownSettingsAtom = declareAtom({
    pomodoroLength: 1500,
    shortBreakLength: 320,
    longBreakLength: 900,
    pomodorosBeforeLongBreak: 4
}, on => [
    on(setPomodoroLength, (state, payload) => ({...state, pomodoroLength: payload}))
]);

export default countdownSettingsAtom;