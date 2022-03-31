import { initialState } from "../initialState";
import * as actionTypes from "../actions/actionTypes";
import { Politician, PoliticianAction } from "../../interfaces/politician.interface";

const politicianReducer = (
  state: Record<number, Politician> = initialState.politicians,
  action: PoliticianAction
): Record<number, Politician> => {
  switch (action.type) {
    case actionTypes.ADD_POLITICIAN_PERIOD:
      // If the politician already exists, just add the period
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
      // Otherwise add the whole politician
      else {
        return {
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