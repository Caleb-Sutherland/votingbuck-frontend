/* Corporate types*/

// Donations made by an organization
export interface Donation {
  month_start_date: string;
  amount_donated: number;
}

// A donator from the organization
export interface EmployeeDonation {
  contributor: string;
  total_amount: number;
}

// Donations from organization to political party
export interface DonationToParty {
  party: string;
  total_amount: number;
}

// Top recipients that a corporation donates to in dollars
export interface TopRecipientDollar {
  id: number;
  name: string;
  party: string;
  amount_received: number;
}

// Top recipients that a corporation donates to
export interface TopRecipientDonation {
  id: number;
  name: string;
  party: string;
  donations_received: number;
}

// Ideology score based on who a company donated to
export interface IdeologyScore {
  ideology: number;
  dollars_donated: number;
}

// Total contributions a corporation donates in dollars
export interface TotalContributionsDollar {
  dollars_donated: number;
  date: string;
}

// Registered voters on board of directors at a company
export interface RegisteredVoters {
  [key: string]: number;
  democratic: number;
  republican: number;
}

// Stores on period's worth of data for an organization
export interface ICorporationPeriod {
  id: string;
  donationsByMonth: Donation[];
  topDonators: EmployeeDonation[];
  donationsByParty: DonationToParty[];
  topRecipientsDollar: TopRecipientDollar[];
  topRecipientsDonation: TopRecipientDonation[];
  ideologyDistribution: IdeologyScore[];
  totalContributionsDollar: TotalContributionsDollar[];
  registeredVoters: RegisteredVoters[];
}

// Organization that stores a set of Records (key: period, value: period_data)
export interface Corporation {
  id: number;
  name: string;
  industry: string;
  location: string;
  periods: Record<string, ICorporationPeriod>;
}

// Format to follow when performing an action on an organization period
export interface CorporationAction {
  type: string;
  corporation: Corporation;
  period: ICorporationPeriod;
}
