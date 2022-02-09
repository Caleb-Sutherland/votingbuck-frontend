import * as actionTypes from "./actionTypes";
import { data } from "../../components/TempData";

/* Period action creators */
// Add a period to the store
export function addOrganizationPeriod(
  organization_id: number,
  period_id: string
) {
  // Must retrieve the organization/period data from the database
  return getOrganizationPeriod(organization_id, period_id);
}

// export function removeAllOrganizationPeriods() {
//   const action: PeriodAction = {
//     type: actionTypes.REMOVE_ALL_ORGANIZATION_PERIODS,
//     period: null,
//   };

//   return (dispatch: DispatchType) => {
//     dispatch(action);
//   };
// }

// Helper function to retrieve organization/period data from the backend
export function getOrganizationPeriod(
  organization_id: number,
  period_id: string
) {
  return async (dispatch: DispatchType) => {
    // Get real data from database here

    // Using the temp data for now, construct an organization
    const organization: IOrganization = { ...data.orgInfo, periods: {} };
    organization.periods = {
      period_id: {
        id: period_id,
        donationsByMonth: data.donationsByMonth,
        topDonators: data.topDonators,
        donationsByParty: data.donationsByParty
      },
    };

    // Construct the action
    const action: OrganizationAction = {
      type: actionTypes.ADD_ORGANIZATION_PERIOD,
      organization: organization,
      period: organization.periods.period_id,
    };
    dispatch(action);
  };
}
