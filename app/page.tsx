"use client";
import Image from "next/image";
import { Roboto_Condensed } from "next/font/google";
import { useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Bar, Line, Scatter, Bubble } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const roboto = Roboto_Condensed({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export default function Dashboard() {
  const [filter, setFilter] = useState(0);
  const [period, setPeriod] = useState(1);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0,
        borderWidth: 2,
        borderColor: "rgba(0, 68, 255, 1)",
        fill: "start",
        backgroundColor: "rgba(0, 68, 255, 0.3)",
      },
      point: {
        radius: 0,
        hitRadius: 0,
      },
    },
    scales: {
      xAxis: {
        display: false,
      },
      yAxis: {
        display: false,
      },
    },
  };

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
    ],
    datasets: [{ data: [0.1, 0.4, 0.2, 0.3, 0.7, 0.4, 0.2, 0.6] }],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        align: "start",
        labels: {
          boxWidth: 17,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
    elements: {
      bar: {
        barPercentage: 0.3,
        categoryPercentage: 1,
      },
    },
  };

  const barData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
    ],
    datasets: [
      {
        label: "Label 1",
        borderRadius: 30,
        data: [0.1, 0.4, 0.2, 0.3, 0.7, 0.4, 0.2, 0.6],
        backgroundColor: "rgba(0, 68, 255, 1)",
        barThickness: 10,
      },
      {
        label: "Label 2",
        borderRadius: 30,
        data: [0.1, 0.4, 0.2, 0.3, 0.7, 0.4, 0.2, 0.6].reverse(),
        backgroundColor: "rgba(0, 68, 255, 0.3)",
        barThickness: 10,
      },
    ],
  };

  const filters = ["Line Chart", "Column Chart"];
  const periods = ["Day", "Week", "15 days", "30 days"];

  return (
    <main className="flex flex-col w-full max-w-[1600px] px-4 xl:px-[120px] text-center mb-24">
      {/* TOP SECTION */}
      <section className="flex items-center justify-between w-full mt-10 md:mt-[87px] mb-[38px]">
        {/* FARMS RESUME */}
        <div className="w-full flex flex-col justify-between text-white">
          <h3
            className={`font-medium text-[28px] text-bluez dark:text-aquaz ${roboto.className}`}
          >
            Dashboard
          </h3>
          <span className="font-light text-[14px] text-[#3E3E3E] dark:text-white">
            Current and Historical data of StableZ's TVL, and Rewards paid to
            date.
          </span>
          <div className="flex justify-center items-center gap-2 xl:gap-20 font-medium text-[13px] pt-[60px]">
            <div className="flex flex-col text-bluez dark:text-white/80 w-[300px]">
              <span className="font-medium text-[12px] lg:text-[28px]">
                TOTAL STAKED
              </span>
              <span className="font-black text-[16px] md:text-[32px] dark:text-white">
                12000.50k
              </span>
            </div>
            <div className="flex flex-col text-bluez dark:text-white/80 w-[300px]">
              <span className="font-medium text-[12px] lg:text-[28px]">
                REWARDS PAID
              </span>
              <span className="font-black text-[16px] md:text-[32px] dark:text-white">
                12000.50k
              </span>
            </div>
            <div className="flex flex-col text-bluez dark:text-white/80 w-[300px]">
              <span className="font-medium text-[12px] lg:text-[28px]">
                OTHER STUFF
              </span>
              <span className="font-black text-[16px] md:text-[32px] dark:text-white">
                12000.50k
              </span>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-row justify-between items-center w-full px-4 pr-10 py-6  bg-bluez dark:bg-bluez/40 rounded-[8px] shadow-lg">
          <div className="hidden md:flex w-full items-center gap-3">
            <Image src="/logo-white.svg" width={20} height={20} alt="logo" />
            <span className="font-bold text-white">Charts</span>
          </div>

          <div className="flex flex-col md:flex-row w-full justify-between md:justify-end items-center gap-5 md:gap-10">
            <div className="flex flex-row items-center justify-between text-[12px] xl:text-[14px] font-medium gap-4">
              {periods.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setPeriod(index)}
                  className={`flex flex-row items-center justify-between h-6 transition-all
                  ${
                    index === period
                      ? " text-white border-b  hover:opacity-90"
                      : " text-blue-400  hover:text-white"
                  }
                  `}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="w-full md:w-[1px] bg-white/20 md:bg-transparent md:border-r border-white/40 h-[1px] md:h-4" />
            <div className="flex flex-row items-center justify-between text-[12px] xl:text-[14px] font-medium gap-2 xl:gap-4">
              {filters.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setFilter(index)}
                  className={`flex flex-row items-center justify-between h-6 transition-all
                  ${
                    index === filter
                      ? " text-white border-b  hover:opacity-90"
                      : " text-blue-400  hover:text-white"
                  }
                  `}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
        {filter === 0 && (
          <Line
            // height={400}
            data={data}
            options={options}
            className="bg-white/50 dark:bg-bluez/10 w-full p-3 rounded-[8px] mt-3 shadow-xl"
          />
        )}

        {filter === 1 && (
          <Bar
            data={barData}
            options={barOptions as any}
            className="bg-white/50 dark:bg-bluez/10 w-full p-3 rounded-[8px] mt-3 shadow-xl"
          />
        )}
      </section>
    </main>
  );
}
