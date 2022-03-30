/* Corporate types*/

// Donations made by an organization
interface ICorporateDonation {
  month_start_date: string;
  amount_donated: number;
}

// A donator from the organization
interface ICorporateEmployeeDonation {
  contributor: string;
  total_amount: number;
}

// Donations from organization to political party
interface ICorporateDonationToParty {
  party: string;
  total_amount: number;
}

// Top recipients that a corporation donates to in dollars
interface ICorporateTopRecipientDollar {
  id: number;
  name: string;
  party: string;
  amount_received: number;
}

// Top recipients that a corporation donates to
interface ICorporateTopRecipientDonation {
  id: number;
  name: string;
  party: string;
  donations_received: number;
}

// Ideology score based on who a company donated to
interface ICorporateIdeologyScore {
  ideology: number;
  dollars_donated: number;
}

// Total contributions a corporation donates in dollars
interface ICorporateTotalContributionsDollar {
  dollars_donated: number;
  date: string;
}

// Registered voters on board of directors at a company
interface ICorporateRegisteredVoters {
  [democratic: string]: number;
  [republican: string]: number;
}

// Stores on period's worth of data for an organization
interface ICorporationPeriod {
  id: string;
  donationsByMonth: ICorporateDonation[];
  topDonators: ICorporateEmployeeDonation[];
  donationsByParty: ICorporateDonationToParty[];
  topRecipientsDollar: ICorporateTopRecipientDollar[];
  topRecipientsDonation: ICorporateTopRecipientDonation[];
  ideologyDistribution: ICorporateIdeologyScore[];
  totalContributionsDollar: ICorporateTotalContributionsDollar[];
  registeredVoters: ICorporateRegisteredVoters[];
}

// Organization that stores a set of Records (key: period, value: period_data)
interface ICorporation {
  id: number;
  name: string;
  industry: string;
  location: string;
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

interface IPoliticianIdeologyCount {
  ideology: number;
  count: number;
}

interface IPoliticianIndustryDonation {
  industry: string;
  dollars_donated: number;
}

interface IPoliticianCorporationDonation {
  corporation: string;
  dollars_donated: number;
}

interface IPoliticianUniversityDonation {
  university: string;
  dollars_donated: number;
}

interface IPoliticianPeriod {
  id: string;
  donationsByMonth: IDonation[];
  topDonators: IDonationFromOrganization[];
  ideologyDistribution: IPoliticianIdeologyCount[];
  topDonationsDollarsByIndustry: IPoliticianIndustryDonation[];
  topDonationsDollarsByCorporation: IPoliticianCorporationDonation[];
  topDonationsDollarsByUniversity: IPoliticianUniversityDonation[];
}

interface IDonationFromOrganization {
  name: string;
  total_amount: number;
}

interface ITimeInCongress {
  startDate: string;
  endDate: string;
  position: string;
}

interface ILeadership {
  title: string;
  startDate: string;
  endDate: string;
}

interface ICommittee {
  name: string;
  rank: number;
}

// Politician that stores set of Records (key: period, value: period_data)
interface IPolitician {
  id: number;
  name: string;
  ideology: number;
  party: string;
  dob: string;
  state: string;
  timeInCongress: ITimeInCongress[];
  leadership: ILeadership[];
  committee: ICommittee[];
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
  uni_acronym: string;
  uni_enrollment_high: string;
  uni_enrollment_low: string;
  uni_founded: string;
  uni_public: boolean;
  uni_rank: string;
  location: string;
  website: string;
  description: string;
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
