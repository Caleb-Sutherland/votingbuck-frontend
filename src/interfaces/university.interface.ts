/* University Types */

export interface IUniversityDonation {
  month_start_date: string;
  amount_donated: number;
}

export interface IUniversityEmployeeDonation {
  contributor: string;
  total_amount: number;
}

export interface IUniversityDonationToParty {
  party: string;
  total_amount: number;
}

// Top recipients that a corporation donates to in dollars
export interface IUniversityTopRecipientDollar {
  id: number;
  name: string;
  party: string;
  amount_received: number;
}

// Top recipients that a corporation donates to
export interface IUniversityTopRecipientDonation {
  id: number;
  name: string;
  party: string;
  donations_received: number;
}

// Ideology score based on who a company donated to
export interface IUniversityIdeologyScore {
  ideology: number;
  dollars_donated: number;
}

// Total contributions a corporation donates in dollars
export interface IUniversityTotalContributionsDollar {
  dollars_donated: number;
  date: string;
}

// Registered voters on board of directors at a company
export interface IUniversityRegisteredVoters {
  [key: string]: number;
  democratic: number;
  republican: number;
}

export interface IUniversityPeriod {
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

export interface IUniversity {
  id: number;
  name: string;
  industry: string;
  periods: Record<string, IUniversityPeriod>;
}

export interface UniversityAction {
  type: string;
  university: IUniversity;
  period: IUniversityPeriod;
}
