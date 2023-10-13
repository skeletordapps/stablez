"use client";
import Image from "next/image";
import Link from "next/link";
import { Roboto_Condensed } from "next/font/google";
import { useState } from "react";
import { usdc, fusdt, piggy } from "@/public/svg";

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
  const [filterSelected, setFilterSelected] = useState(0);
  const [page, setPage] = useState(1);

  const options = {
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
    plugins: {
      legend: {
        position: "bottom",
        align: "start",
        labels: {
          boxWidth: 17,
          // boxHeight: 0,
          usePointStyle: true,
          pointStyle: "circle",
        },
        // title: {
        //   text: "Sales Report",
        //   display: true,
        //   color: "#000",
        //   font: {
        //     size: 18,
        //   },
        // },
      },
    },
    scales: {
      // xAxis: {
      //   display: true,
      // },
      // yAxis: {
      //   max: 1,
      // },
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

  const filters = ["Chart 1", "Chart 2"];

  return (
    <main className="flex flex-col w-full max-w-[1600px] px-[120px] text-center mb-24">
      {/* TOP SECTION */}
      <section className="flex items-center justify-between w-full mt-[87px] mb-[38px]">
        {/* FARMS RESUME */}
        <div className="w-full flex flex-col justify-between text-white">
          <h3
            className={`font-medium text-[28px] text-bluex ${roboto.className}`}
          >
            Dashboard
          </h3>
          <span className="font-light text-[14px] text-[#3E3E3E]">
            A super fancy text describing this page
          </span>
          <div className="flex justify-center items-center gap-20 font-medium text-[13px] pt-[60px]">
            <div className="flex flex-col text-bluex w-[300px]">
              <span className="font-medium text-[28px]">TOTAL STAKED</span>
              <span className="font-black text-[42px]">12000.50k</span>
            </div>
            <div className="flex flex-col text-bluex w-[300px]">
              <span className="font-medium text-[28px]">REWARDS PAID</span>
              <span className="font-black text-[42px]">12000.50k</span>
            </div>
            <div className="flex flex-col text-bluex w-[300px]">
              <span className="font-medium text-[28px]">SOME OTHER STUFF</span>
              <span className="font-black text-[42px]">12000.50k</span>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-row justify-between items-center w-full px-4 pr-10 py-6  bg-bluex rounded-[8px] shadow-lg">
          <div className="flex items-center gap-3">
            <Image src="/logo-white.svg" width={20} height={20} alt="logo" />
            <span className="font-bold text-white">Charts</span>
          </div>

          <div className="flex flex-row items-center justify-between text-[16px] font-medium gap-10">
            {filters.map((item, index) => (
              <button
                key={index}
                onClick={() => setFilterSelected(index)}
                className={`flex flex-row items-center justify-between h-6 transition-all
                  ${
                    index === filterSelected
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
        {filterSelected === 0 && (
          <Line
            data={data}
            width={100}
            height={60}
            options={options}
            className="bg-white/50 w-full p-3 rounded-[8px] mt-3 shadow-xl"
          />
        )}

        {filterSelected === 1 && (
          <Bar
            data={barData}
            width={100}
            height={60}
            options={barOptions as any}
            className="bg-white/50 w-full p-3 rounded-[8px] mt-3 shadow-xl"
          />
        )}
      </section>
    </main>
  );
}
