import { initialState } from "../initialState";
import * as actionTypes from "../actions/actionTypes";

const corporationReducer = (
  state: Record<number, ICorporation> = initialState.corporations,
  action: CorporationAction
): Record<number, ICorporation> => {
  switch (action.type) {
    case actionTypes.ADD_CORPORATION_PERIOD:
      // If the organization already exists, just add the period
      if (state[action.corporation.id]) {
        return {
          ...state,
          [action.corporation.id]: {
            ...state[action.corporation.id],
            periods: {
              ...state[action.corporation.id].periods,
              [action.period.id]: {
                ...action.period,
              },
            },
          },
        };
      }
      // Otherwise add the whole organization (also remove any other organizations so that the store does not get cluttered)
      else {
        return {
          [action.corporation.id]: {
            ...action.corporation,
            periods: {
              [action.period.id]: action.period,
            },
          },
        };
      }
  }

  return { ...state };
};

export default corporationReducer;
