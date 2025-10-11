"use client";
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { date: "2025-09-16", bal: 200 },
  { date: "2025-09-17", bal: 400 },
  { date: "2025-09-18", bal: 300 },
  { date: "2025-09-19", bal: 100 },
  { date: "2025-09-20", bal: 300 },
  { date: "2025-09-21", bal: 400 },
  { date: "2025-09-22", bal: 300 },
];

interface dateBal {
  date: string;
  bal: number;
}

const monthConverterList = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const sliceDate = (date: string) => {
  if (date.length != 10) {
    console.log("Invalid Date formate. Expected YYYY-MM-DD.");
    return -1;
  }

  const year = parseInt(date.slice(0, 4));
  if (year < 1000) {
    console.log("Invalid Date formate. Expected YYYY-MM-DD.(Year)");
    return -1;
  }
  const month = parseInt(date.slice(5, 7));
  const day = parseInt(date.slice(8));

  return {
    year: year,
    month: month,
    day: day,
  };
};

const formatDate = (date: string) => {
  const dateObj = sliceDate(date);
  console.log({ date: date, dateObj: dateObj });
  if (dateObj != -1) {
    const { year, month, day } = dateObj as {
      year: number;
      month: number;
      day: number;
    };
    return (
      day.toString() +
      " " +
      monthConverterList[month - 1] +
      ", " +
      year.toString()
    );
  }
  return "-";
};

function fillLastWeek(data: dateBal[]): dateBal[] {
  // Sort input by date
  const sorted = [...data].sort((a, b) => a.date.localeCompare(b.date));

  // Store the *latest* balance for each date (if duplicates)
  const dateMap = new Map<string, number>();
  for (const { date, bal } of sorted) dateMap.set(date, bal);

  // Define today and start date (7-day window)
  const today = new Date();
  console.log(today);
  today.setHours(0, 0, 0, 0);
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 6);

  const result: dateBal[] = [];
  let currentDate = new Date(startDate);

  // Start with the *first known* balance in the data
  let lastBal = sorted.length > 0 ? sorted[0].bal : 0;

  while (currentDate <= today) {
    const dateStr = currentDate.toISOString().split("T")[0];

    // Update balance if a record exists for this date
    if (dateMap.has(dateStr)) {
      lastBal = dateMap.get(dateStr)!;
    }

    result.push({ date: dateStr, bal: lastBal });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return result;
}

const formatBal = (bal: number) => `Rs. ${bal}`;

export default function LastDaysCharts() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart width={650} height={300} data={data}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1c8eff" />
            <stop offset="30%" stopColor="#1c8effee" />
            <stop offset="100%" stopColor="#ffffff00" />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
        <XAxis dataKey="date" tickFormatter={formatDate} />
        <YAxis tickFormatter={formatBal} />
        <Tooltip formatter={formatBal} />
        <Area
          dataKey="bal"
          type="monotone"
          dot={false}
          fill="url(#lineGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
