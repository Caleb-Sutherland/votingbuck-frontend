import { initialState } from "../initialState";
import * as actionTypes from "../actions/actionTypes";
import { Corporation, CorporationAction } from "../../interfaces/corporation.interface";

const corporationReducer = (
  state: Record<string, Corporation> = initialState.corporations,
  action: CorporationAction
): Record<string, Corporation> => {
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
