/* Interfaces that are part of a Period*/
interface IOrganization {
  id: number;
  name: string;
  industry: string;
}

interface IDonation {
  month_start_date: string;
  amount_donated: number;
}

interface IDonator {
  contributor: string;
  total_amount: number;
}

// All data in the store will be indexed by a Period
interface IPeriod {
  id: string;
  orgInfo: IOrganization;
  donationsByMonth: IDonation[];
  topDonators: IDonator[];
}

// State type to use in the redux store, stores a hashmap (indexed by a period id and points to a Period)
type DataState = {
  periods: Record<string, IPeriod>;
};

// Format to follow when performing an action on a Period
interface PeriodAction {
  type: string;
  period: Period | null;
}

// Type alias declared so that the store can accept any type of action defined here (PeriodAction | ActionB | ActionC...)
type Action = PeriodAction;

type DispatchType = (args: Action) => Action;
