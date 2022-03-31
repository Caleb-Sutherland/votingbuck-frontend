import { Action } from "redux";
import { CorporationAction, Corporation } from "./corporation.interface";
import { Politician, PoliticianAction } from "./politician.interface";
import { University, UniversityAction } from "./university.interface";
/* Shared types */
// Type alias declared so that the store can accept any type of action defined here
export type actionTypes = CorporationAction | PoliticianAction | UniversityAction;

// State type to use in the redux store, stores a hashmap (indexed by a period id and points to a Period)
export type DataState = {
  corporations: Record<number, Corporation>;
  politicians: Record<string, Politician>;
  universities: Record<string, University>;
};

export type DispatchType = (args: Action) => Action;