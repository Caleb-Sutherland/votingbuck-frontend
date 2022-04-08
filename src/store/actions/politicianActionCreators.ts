import { DispatchType } from "../../interfaces/global.interface";
import { Politician, PoliticianAction } from "../../interfaces/politician.interface";
import * as actionTypes from "./actionTypes";

/* Period action creators */
// Add a period to the store
export function addPoliticianPeriod(politician_id: string, period_id: string) {
  // Must retrieve the organization/period data from the database
  return getPoliticianPeriod(politician_id, period_id);
}

// Helper function to retrieve organization/period data from the backend
export function getPoliticianPeriod(politician_id: string, period_id: string) {
  return async (dispatch: DispatchType) => {
    // Get the correct range of years from the period_id
    const period_dates: string[] = period_id.split("-");
    period_dates[0] = (parseInt(period_dates[0]) - 1).toString() + "-11-10";
    period_dates[1] = period_dates[1] + "-11-10";

    // Fetch data from the backend
    const res = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/recipients/${politician_id}?start_date=${period_dates[0]}&end_date=${period_dates[1]}`
    );
    const data = await res.json();

    // Using the temp data for now, construct an organization
    const politician: Politician = {
      ...data.recInfo,
      timeInCongress: data.timeInCongress,
      leadership: data.leadership,
      committee: data.committee,
      schoolInfo: data.schoolInfo,
      periods: {},
    };
    politician.periods = {
      period_id: {
        id: period_id,
        donationsByMonth: data.donationsByMonth,
        topDonators: data.topDonators,
        ideologyDistribution: data.ideologyDistribution,
        topDonationsDollarsByIndustry: data.topDonationsDollarsByIndustry,
        topDonationsDollarsByCorporation: data.topDonationsDollarsByCorporation,
        topDonationsDollarsByUniversity: data.topDonationsDollarsByUniversity,
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
