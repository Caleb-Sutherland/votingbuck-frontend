/* Organization types*/

// Donations made by an organization
interface IDonation {
  month_start_date: string;
  amount_donated: number;
}

// A donator from the organization
interface IDonator {
  contributor: string;
  total_amount: number;
}

// Donations from organization to political party
interface IPartyDonation {
  party: string
  total_amount: number
}

// Stores on period's worth of data for an organization
interface IOrganizationPeriod {
  id: string;
  donationsByMonth: IDonation[];
  topDonators: IDonator[];
  donationsByParty: IPartyDonation[];
}

// Organization that stores a set of Records (key: period, value: period_data)
interface IOrganization {
  id: number;
  name: string;
  industry: string;
  periods: Record<string, IOrganizationPeriod>;
}

// Format to follow when performing an action on an organization period
interface OrganizationAction {
  type: string;
  organization: IOrganization;
  period: IOrganizationPeriod;
}

/* Politician types */
// Period for politicians
interface IPoliticianPeriod {
  id: string;
}

// Politician that stores set of Records (key: period, value: period_data)
interface IPolitician {
  id: number;
  name: string;
  party: string;
  periods: Record<string, IPoliticianPeriod>;
}

// Format to follow when performing an action on a Period
interface PoliticianAction {
  type: string;
  politician: IPolitician;
  period: IPoliticianPeriod
}


/* Shared types */
// Type alias declared so that the store can accept any type of action defined here
type actionTypes = OrganizationAction | PoliticianAction;

// State type to use in the redux store, stores a hashmap (indexed by a period id and points to a Period)
type DataState = {
  organizations: Record<number, IOrganization>;
  politicians: Record<string, IPolitician>;
};

type DispatchType = (args: Action) => Action;
