import { initialState } from "../initialState";
import * as actionTypes from "../actions/actionTypes";
import { University, UniversityAction } from "../../interfaces/university.interface";

const universityReducer = (
  state: Record<number, University> = initialState.universities,
  action: UniversityAction
): Record<number, University> => {
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
      // Otherwise add the whole university and remove any other universities
      else {
        return {
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