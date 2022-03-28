import { produce } from "immer";
import { Action } from "./../actions/index";
import { ActionType } from "./../action-types/index";

interface BundlesState {
  [key: string]: {
    loading: boolean;
    code: string;
    err: string;
  };
}

const initialState: BundlesState = {};

const reducer = produce(
  (state: BundlesState = initialState, action: Action) => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        state[action.payload.cellId] = {
          loading: true,
          code: "",
          err: "",
        };
        break;
      case ActionType.BUNDLE_COMPLETE:
        state[action.payload.cellId] = {
          loading: false,
          code: action.payload.bundle.code,
          err: action.payload.bundle.err,
        };
        break;
      default:
        return state;
    }
  },
  initialState
);

export default reducer;
