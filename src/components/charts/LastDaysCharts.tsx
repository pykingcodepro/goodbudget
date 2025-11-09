"use client";
import { LastDaysChartData } from "@/typeDefiniton/LastDaysChartData";
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
  // console.log({ date: date, dateObj: dateObj });
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

function fillMissingDays(data: dateBal[], noOfDays: number): dateBal[] {
  // --- 1. Handle Edge Cases ---
  // If there's no data or no days requested, there's nothing to do.
  if (data.length === 0 || noOfDays <= 0) {
    return [];
  }

  // --- 2. Prepare Data ---
  // Create a copy and sort it by date to ensure the logic works correctly.
  const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  // Create a Map for efficient lookups of existing dates and their balances.
  const balanceMap = new Map(sortedData.map(item => [item.date, item.bal]));

  // --- 3. Determine Date Range ---
  // The last day is the date of the last item in our sorted data.
  const endDate = new Date(sortedData[sortedData.length - 1].date);
  // The first day is `noOfDays - 1` days before the end date.
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - (noOfDays - 1));

  const result: dateBal[] = [];
  const currentDate = new Date(startDate);

  // --- 4. Find the Initial Balance ---
  // Find the last known balance *before* our start date.
  // We search backwards from the end of the sorted data.
  let lastKnownBalance = 0; // Default to 0 as per the requirement.
  const lastEntryBeforeStartDate = sortedData.findLast(
    (entry) => new Date(entry.date) < startDate
  );
  if (lastEntryBeforeStartDate) {
    lastKnownBalance = lastEntryBeforeStartDate.bal;
  }

  // --- 5. Iterate and Fill Data ---
  // Loop from the calculated start date to the end date.
  while (currentDate <= endDate) {
    // Format the current date into 'YYYY-MM-DD' string format.
    const dateString = currentDate.toISOString().split('T')[0];

    // If a balance exists for this specific day in our original data, use it.
    // This also becomes the new "last known balance" for subsequent missing days.
    if (balanceMap.has(dateString)) {
      lastKnownBalance = balanceMap.get(dateString)!;
    }

    // Add the entry for the current day to our result array.
    result.push({ date: dateString, bal: lastKnownBalance });

    // Move to the next day.
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return result;
}

const formatBal = (bal: number) => `Rs. ${bal}`;

export default function LastDaysCharts(
  { noOfDays, dataList } : { noOfDays: number, dataList: LastDaysChartData[]|null},
) {
  console.log("Input dataList:", dataList);
  console.log("Number of days:", noOfDays);

  // Since the data is already in the correct format, just pass it directly
  const filledData = fillMissingDays(dataList || [], noOfDays);
  console.log("After fillMissingDays:", filledData);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart width={650} height={300} data={filledData}>
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
