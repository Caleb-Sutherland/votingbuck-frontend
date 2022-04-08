import { DispatchType } from "../../interfaces/global.interface";
import { University, UniversityAction } from "../../interfaces/university.interface";
import * as actionTypes from "./actionTypes";

/* Period action creators */
// Add a period to the store
export function addUniversityPeriod(
  university_id: string,
  period_id: string
) {
  // Must retrieve the organization/period data from the database
  return getUniversityPeriod(university_id, period_id);
}

// Helper function to retrieve organization/period data from the backend
export function getUniversityPeriod(
  university_id: string,
  period_id: string
) {
  return async (dispatch: DispatchType) => {
    // Get the correct range of years from the period_id
    const period_dates: string[] = period_id.split("-");
    period_dates[0] = (parseInt(period_dates[0]) - 1).toString() + "-11-10";
    period_dates[1] = period_dates[1] + "-11-10";

    // Fetch data from the backend
    const res = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/universities/${university_id}?start_date=${period_dates[0]}&end_date=${period_dates[1]}`
    );
    const data = await res.json();

    // Using the temp data for now, construct an organization
    const university: University = { ...data.uniInfo, totalContributionsDollar: data.totalContributionsDollar, periods: {} };
    university.periods = {
      period_id: {
        id: period_id,
        donationsByMonth: data.donationsByMonth,
        topDonators: data.topDonators,
        donationsByParty: data.donationsByParty,
        topRecipientsDollar: data.topRecipientsDollar,
        topRecipientsDonation: data.topRecipientsDonation,
        ideologyDistribution: data.ideologyDistribution,
        registeredVoters: data.registeredVoters
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