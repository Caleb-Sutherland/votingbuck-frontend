import { initialState } from "../initialState";
import * as actionTypes from "../actions/actionTypes";

const politicianReducer = (
  state: Record<number, IPolitician> = initialState.politicians,
  action: PoliticianAction
): Record<number, IPolitician> => {
  switch (action.type) {
    case actionTypes.ADD_POLITICIAN_PERIOD:
      // If the organization already exists, just add the period
      if (state[action.politician.id]) {
        return {
          ...state,
          [action.politician.id]: {
            ...state[action.politician.id],
            periods: {
              ...state[action.politician.id].periods,
              [action.period.id]: {
                ...action.period,
              },
            },
          },
        };
      }
      // Otherwise add the whole organization
      else {
        return {
          ...state,
          [action.politician.id]: {
            ...action.politician,
            periods: {
              [action.period.id]: action.period,
            },
          },
        };
      }
  }
  return { ...state };
};

export default politicianReducer;