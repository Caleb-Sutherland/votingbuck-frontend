export const initialState: DataState = {
  periods: {
    "2018-2020": {
      id: "2018-2020",
      orgInfo: { id: 1, name: "Test Organization", industry: "school" },
      donationsByMonth: [
        {
          month_start_date: "2010-01-01T00:00:00.000Z",
          amount_donated: 266902.09,
        },
        {
          month_start_date: "2010-02-01T00:00:00.000Z",
          amount_donated: 355456.8,
        },
      ],
      topDonators: [
        { contributor: "William Mendoza", total_amount: 162192.21 },
        { contributor: "Walter Hernandez", total_amount: 138196.64 },
      ],
    },
  },
};
