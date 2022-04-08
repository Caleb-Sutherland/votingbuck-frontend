/* University Types */

export interface Donation {
  month_start_date: string;
  amount_donated: number;
}

export interface EmployeeDonation {
  contributor: string;
  total_amount: number;
}

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
export type RegisteredVoters = {
    [key: string]: number;
    democratic: number;
    republican: number;
}

export interface UniversityPeriod {
  id: string;
  donationsByMonth: Donation[];
  topDonators: EmployeeDonation[];
  donationsByParty: DonationToParty[];
  topRecipientsDollar: TopRecipientDollar[];
  topRecipientsDonation: TopRecipientDonation[];
  ideologyDistribution: IdeologyScore[];
  registeredVoters: RegisteredVoters[];
}

export interface University{
  id: string;
  name: string;
  industry: string;
  uni_acronym: string;
  uni_enrollment_high: string;
  uni_enrollment_low: string;
  uni_founded: string;
  uni_public: boolean;
  uni_rank: string;
  location: string;
  website: string;
  description: string;
  totalContributionsDollar: TotalContributionsDollar[];
  periods: Record<string, UniversityPeriod>;
}

export interface UniversityAction {
  type: string;
  university: University;
  period: UniversityPeriod;
}
