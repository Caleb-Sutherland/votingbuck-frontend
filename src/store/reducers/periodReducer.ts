import { initialState } from "../initialState";
import * as actionTypes from "../actions/actionTypes";

const periodReducer = (
  state: DataState = initialState,
  action: PeriodAction
): DataState => {
  switch (action.type) {
    case actionTypes.ADD_PERIOD:
      let periodsCopy = state.periods;
      periodsCopy[action.period.id] = action.period;
      return {
        ...state,
        periods: periodsCopy,
      };
  }

  return { ...state };
};

export default periodReducer;
