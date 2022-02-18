/* Corporate types*/

// Donations made by an organization
interface ICorporationDonation {
  month_start_date: string;
  amount_donated: number;
}

// A donator from the organization
interface ICorporationEmployeeDonation {
  contributor: string;
  total_amount: number;
}

// Donations from organization to political party
interface ICorporateDonationToParty {
  party: string;
  total_amount: number;
}

// Stores on period's worth of data for an organization
interface ICorporationPeriod {
  id: string;
  donationsByMonth: ICorporationDonation[];
  topDonators: ICorporationEmployeeDonation[];
  donationsByParty: ICorporateDonationToParty[];
}

// Organization that stores a set of Records (key: period, value: period_data)
interface ICorporation {
  id: number;
  name: string;
  industry: string;
  periods: Record<string, ICorporationPeriod>;
}

// Format to follow when performing an action on an organization period
interface CorporationAction {
  type: string;
  corporation: ICorporation;
  period: ICorporationPeriod;
}

/* Politician types */
// Period for politicians

interface IPoliticianDonation {
  month_start_date: string;
  amount_donated: number;
}

interface IPoliticianPeriod {
  id: string;
  donationsByMonth: IDonation[];
  topDonators: IDonationFromOrganization[];
}

interface IDonationFromOrganization {
  name: string;
  total_amount: number;
}

// Politician that stores set of Records (key: period, value: period_data)
interface IPolitician {
  id: number;
  name: string;
  ideology: number;
  party: string;
  periods: Record<string, IPoliticianPeriod>;
}

// Format to follow when performing an action on a Period
interface PoliticianAction {
  type: string;
  politician: IPolitician;
  period: IPoliticianPeriod;
}

/* University Types */

/* Shared types */
// Type alias declared so that the store can accept any type of action defined here
type actionTypes = CorporationAction | PoliticianAction;

// State type to use in the redux store, stores a hashmap (indexed by a period id and points to a Period)
type DataState = {
  corporations: Record<number, ICorporation>;
  politicians: Record<string, IPolitician>;
};

type DispatchType = (args: Action) => Action;
