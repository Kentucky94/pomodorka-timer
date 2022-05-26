import { declareAtom } from "@reatom/core";
import { closeModalAction, openModalAction } from "../actions/countdownModalActions";

export const countdownModalAtom = declareAtom<boolean>(false, on => [
    on(openModalAction, () => true),
    on(closeModalAction, () => false),
])