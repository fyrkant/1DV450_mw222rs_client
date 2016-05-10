import {Reducer, Action} from "@ngrx/store";
import C from "../constants";

export const counter: Reducer<number> = (state: number = 0, action: Action) => {
  switch (action.type) {
    case C.INCREMENT:
      return state + 1;

    case C.DECREMENT:
      return state - 1;

    case C.RESET:
      return 0;

    default:
      return state;
  }
};
