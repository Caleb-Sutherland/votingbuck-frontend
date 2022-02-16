import * as actionTypes from "./actionTypes";
import { poliData } from "../../components/TempData";

/* Period action creators */
// Add a period to the store
export function addPoliticianPeriod(politician_id: number, period_id: string) {
  // Must retrieve the organization/period data from the database
  return getPoliticianPeriod(politician_id, period_id);
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
export function getPoliticianPeriod(politician_id: number, period_id: string) {
  return async (dispatch: DispatchType) => {
    // Get real data from database here

    // Using the temp data for now, construct an organization
    const politician: IPolitician = { ...poliData.recInfo, periods: {} };
    politician.periods = {
      period_id: {
        id: period_id,
        donationsByMonth: poliData.donationsByMonth,
        topDonators: poliData.topDonators,
      },
    };

    // Construct the action
    const action: PoliticianAction = {
      type: actionTypes.ADD_POLITICIAN_PERIOD,
      politician: politician,
      period: politician.periods.period_id,
    };
    dispatch(action);
  };
}
