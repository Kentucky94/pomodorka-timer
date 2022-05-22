import { declareAction } from "@reatom/core";

export const setPomodoroLength = declareAction<number>();
export const setShortBreakLength = declareAction<number>();
export const setLongBreakLength = declareAction<number>();
export const setPomodorosBeforeLongBreak = declareAction<number>();