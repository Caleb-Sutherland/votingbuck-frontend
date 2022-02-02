import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

export default function TestPieChart(props: any) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );
  const labels = props.data?.map((item: any) => {
    return item.contributor;
  });

  const datasets = {
    labels,
    datasets: [
      {
        label: "Donations (USD)",
        data: props.data?.map((item: any) => {
          return item.total_amount;
        }),
        backgroundColor: ["#c79ee6", "#bc48d9", "#74208a", "#c36cd9", "#9c25ba", "#ad1bd1", "#a24bb8"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
      title: {
        display: true,
        text: "Top Donators",
      },
    },
  };

  return <div className="max-h-full max-w-full"><Pie options={options} data={datasets}/></div>;
}
