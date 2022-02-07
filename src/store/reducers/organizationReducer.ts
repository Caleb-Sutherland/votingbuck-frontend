import { initialState } from "../initialState";
import * as actionTypes from "../actions/actionTypes";

const organizationReducer = (
  state: Record<number, IOrganization> = initialState.organizations,
  action: OrganizationAction
): Record<number, IOrganization> => {
  switch (action.type) {
    case actionTypes.ADD_ORGANIZATION_PERIOD:
      // If the organization already exists, just add the period
      if (state[action.organization.id]) {
        return {
          ...state,
          [action.organization.id]: {
            ...state[action.organization.id],
            periods: {
              ...state[action.organization.id].periods,
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
          [action.organization.id]: {
            ...action.organization,
            periods: {
              [action.period.id]: action.period,
            },
          },
        };
      }
  }

  return { ...state };
};

export default organizationReducer;
