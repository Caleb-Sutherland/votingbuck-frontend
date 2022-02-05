import * as actionTypes from "./actionTypes";
import { data } from "../../components/TempData";

/* Period action creators */
// Add a period to the store
export function addPeriod(period_id: string) {
  return getPeriod(period_id);
}

export function removeAllPeriods() {
  const action: PeriodAction = {
    type: actionTypes.REMOVE_ALL_PERIODS,
    period: null,
  };

  return (dispatch: DispatchType) => {
    dispatch(action);
  };
}

// Helper function to retreive a periods worth of data from the backend
export function getPeriod(period_id: string) {
  return async (dispatch: DispatchType) => {
    // Get real data from database here
    // Using temp data for now
    const temp: IPeriod = { id: period_id, ...data };
    const action: PeriodAction = {
      type: actionTypes.ADD_PERIOD,
      period: temp,
    };
    console.log("here");
    dispatch(action);
  };
}
