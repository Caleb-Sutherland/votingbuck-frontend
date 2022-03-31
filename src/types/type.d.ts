
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

interface IUniversityDonation {
  month_start_date: string;
  amount_donated: number;
}

interface IUniversityEmployeeDonation {
  contributor: string;
  total_amount: number;
}

interface IUniversityDonationToParty {
  party: string;
  total_amount: number;
}

// Top recipients that a corporation donates to in dollars
interface IUniversityTopRecipientDollar {
  id: number;
  name: string;
  party: string;
  amount_received: number;
}

// Top recipients that a corporation donates to
interface IUniversityTopRecipientDonation {
  id: number;
  name: string;
  party: string;
  donations_received: number;
}

// Ideology score based on who a company donated to
interface IUniversityIdeologyScore {
  ideology: number;
  dollars_donated: number;
}

// Total contributions a corporation donates in dollars
interface IUniversityTotalContributionsDollar {
  dollars_donated: number;
  date: string;
}

// Registered voters on board of directors at a company
interface IUniversityRegisteredVoters {
  [democratic: string]: number;
  [republican: string]: number;
}

interface IUniversityPeriod {
  id: string;
  donationsByMonth: IUniversityDonation[];
  topDonators: IUniversityEmployeeDonation[];
  donationsByParty: IUniversityDonationToParty[];
  topRecipientsDollar: IUniversityTopRecipientDollar[];
  topRecipientsDonation: IUniversityTopRecipientDonation[];
  ideologyDistribution: IUniversityIdeologyScore[];
  totalContributionsDollar: IUniversityTotalContributionsDollar[];
  registeredVoters: IUniversityRegisteredVoters[];
}

interface IUniversity {
  id: number;
  name: string;
  industry: string = "School";
  periods: Record<string, IUniversityPeriod>;
}

interface UniversityAction {
  type: string;
  university: IUniversity;
  period: IUniversityPeriod;
}

/* Shared types */
// Type alias declared so that the store can accept any type of action defined here
type actionTypes = CorporationAction | PoliticianAction | UniversityAction;

// State type to use in the redux store, stores a hashmap (indexed by a period id and points to a Period)
type DataState = {
  corporations: Record<number, ICorporation>;
  politicians: Record<string, IPolitician>;
  universities: Record<string, IUniversity>;
};

type DispatchType = (args: Action) => Action;
