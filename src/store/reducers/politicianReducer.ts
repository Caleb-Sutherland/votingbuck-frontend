import { initialState } from "../initialState";
import * as actionTypes from "../actions/actionTypes";

const politicianReducer = (
  state: Record<number, IPolitician> = initialState.politicians,
  action: PoliticianAction
): Record<number, IPolitician> => {
  return { ...state };
};

export default politicianReducer;