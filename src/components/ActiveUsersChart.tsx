"use client";

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

type Props = {
  activeUsers: number;
};

export default function ActiveUsersChart({ activeUsers }: Props) {
  const [dataPoints, setDataPoints] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setDataPoints((prev) => [...prev.slice(-9), activeUsers]); 
    setLabels((prev) => [...prev.slice(-9), time]);
  }, [activeUsers]);

  const data = {
    labels,
    datasets: [
      {
        label: "Active Users",
        data: dataPoints,
        borderColor: "rgb(59 130 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl mb-4 font-semibold">Active Users</h2>
      <Line data={data} />
    </div>
  );
}
