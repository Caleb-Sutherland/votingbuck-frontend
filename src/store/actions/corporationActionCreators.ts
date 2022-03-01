import * as actionTypes from "./actionTypes";
import { corpData } from "../../components/TempData";

/* Period action creators */
// Add a period to the store
export function addCorporationPeriod(
  corporation_id: number,
  period_id: string
) {
  // Must retrieve the organization/period data from the database
  return getCorporationPeriod(corporation_id, period_id);
}

// Helper function to retrieve organization/period data from the backend
export function getCorporationPeriod(
  corporation_id: number,
  period_id: string
) {
  return async (dispatch: DispatchType) => {
    // Get real data from database here

    // Using the temp data for now, construct an organization
    const corporation: ICorporation = { ...corpData.orgInfo, periods: {} };
    corporation.periods = {
      period_id: {
        id: period_id,
        donationsByMonth: corpData.donationsByMonth,
        topDonators: corpData.topDonators,
        donationsByParty: corpData.donationsByParty,
        topRecipients: corpData.topRecipients
      },
    };

    // Construct the action
    const action: CorporationAction = {
      type: actionTypes.ADD_CORPORATION_PERIOD,
      corporation: corporation,
      period: corporation.periods.period_id,
    };
    dispatch(action);
  };
}
