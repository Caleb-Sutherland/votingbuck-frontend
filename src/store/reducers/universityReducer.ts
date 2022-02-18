import { initialState } from "../initialState";
import * as actionTypes from "../actions/actionTypes";

const universityReducer = (
  state: Record<number, IUniversity> = initialState.universities,
  action: UniversityAction
): Record<number, IUniversity> => {
  switch (action.type) {
    case actionTypes.ADD_UNIVERSITY_PERIOD:
      // If the organization already exists, just add the period
      if (state[action.university.id]) {
        return {
          ...state,
          [action.university.id]: {
            ...state[action.university.id],
            periods: {
              ...state[action.university.id].periods,
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
          [action.university.id]: {
            ...action.university,
            periods: {
              [action.period.id]: action.period,
            },
          },
        };
      }
  }

  return { ...state };
};

export default universityReducer;