/* Politician types */
// Period for politicians

export interface Donation {
  month_start_date: string;
  amount_donated: number;
}

export interface IdeologyCount {
  ideology: number;
  count: number;
}

export interface IndustryDonation {
  industry: string;
  dollars_donated: number;
}

export interface CorporationDonation {
  corporation: string;
  dollars_donated: number;
}

export interface UniversityDonation {
  university: string;
  dollars_donated: number;
}

export interface PoliticianPeriod {
  id: string;
  donationsByMonth: Donation[];
  topDonators: IDonationFromOrganization[];
  ideologyDistribution: IdeologyCount[];
  topDonationsDollarsByIndustry: IndustryDonation[];
  topDonationsDollarsByCorporation: CorporationDonation[];
  topDonationsDollarsByUniversity: UniversityDonation[];
}

export interface IDonationFromOrganization {
  name: string;
  total_amount: number;
}

export interface ITimeInCongress {
  startdate: string;
  enddate: string;
  position: string;
}

export interface ILeadership {
  title: string;
  startDate: string;
  endDate: string;
}

export interface ICommittee {
  name: string;
  rank: number;
}

export interface SchoolInfo {
  name: string;
  rank: number;
}

// Politician that stores set of Records (key: period, value: period_data)
export interface Politician {
  id: number;
  name: string;
  ideology: string;
  party: string;
  dob: string;
  state: string;
  timeInCongress: ITimeInCongress[];
  leadership: ILeadership[];
  committee: ICommittee[];
  school: string;
  house_exit_reason: string;
  description: string;
  senate_exit_reason: string;
  schoolInfo: SchoolInfo[];
  periods: Record<string, PoliticianPeriod>;
}

// Format to follow when performing an action on a Period
export interface PoliticianAction {
  type: string;
  politician: Politician;
  period: PoliticianPeriod;
}
