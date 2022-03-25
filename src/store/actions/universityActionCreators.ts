import * as actionTypes from "./actionTypes";
import { uniData } from "../../components/TempData";

/* Period action creators */
// Add a period to the store
export function addUniversityPeriod(
  university_id: number,
  period_id: string
) {
  // Must retrieve the organization/period data from the database
  return getUniversityPeriod(university_id, period_id);
}

// Helper function to retrieve organization/period data from the backend
export function getUniversityPeriod(
  university_period: number,
  period_id: string
) {
  return async (dispatch: DispatchType) => {
    // Get real data from database here

    // Using the temp data for now, construct an organization
    const university: IUniversity = { ...uniData.orgInfo, periods: {} };
    university.periods = {
      period_id: {
        id: period_id,
        donationsByMonth: uniData.donationsByMonth,
        topDonators: uniData.topDonators,
        donationsByParty: uniData.donationsByParty,
      },
    };

    // Construct the action
    const action: UniversityAction = {
      type: actionTypes.ADD_UNIVERSITY_PERIOD,
      university: university,
      period: university.periods.period_id,
    };
    dispatch(action);
  };
}