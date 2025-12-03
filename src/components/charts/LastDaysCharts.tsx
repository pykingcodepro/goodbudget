import { LastDaysChartData } from "@/typeDefiniton/LastDaysChartData";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import React, { useEffect, useState } from "react";

export default function LastDaysCharts({
  noOfDays1,
  dataList,
}: {
  noOfDays1: number;
  dataList: LastDaysChartData[] | null;
}) {
  const [filledDataList, setFilledDataList] = useState<
    LastDaysChartData[] | null
  >(null);

  const fillMissingDates = (dataList: LastDaysChartData[], noOfDays1: number) => {
    const curr_date = new Date();
    curr_date.setDate(curr_date.getDate() - noOfDays1);
    console.log("Data from server: ");
    console.log(dataList);
    let ptr = 0;
    let filledDataList: LastDaysChartData[] = [];
    for (let i = 0; i <= noOfDays1; i++) {
      const curr_date_substring = curr_date.toISOString().substring(0, 10);
      console.log(curr_date_substring + " " + dataList[ptr]?.date);
      let item = dataList[ptr];
      if (item && curr_date_substring === item.date) {
        // filledDataList.push(item);
        // ptr++;
        // continue;
        const temp = { date: item.date, t_amt: 0 };
        while (item && curr_date_substring === item.date) {
          temp.t_amt += item.t_amt;
          ptr++;
          item = dataList[ptr];
        }
        filledDataList.push(temp);
      } else {
        filledDataList.push({
          date: curr_date_substring,
          t_amt: 0,
        });
      }
      curr_date.setDate(curr_date.getDate() + 1);
    }
    return filledDataList;
  };

  useEffect(() => {
    console.log(filledDataList);
    if (!dataList || dataList.length == 0) return;
    setFilledDataList(fillMissingDates(dataList, noOfDays1));
  }, [dataList]);

  return (
    <>
      <BarChart
        style={{
          width: "100%",
          maxWidth: "700px",
          maxHeight: "70vh",
          aspectRatio: 1.618,
        }}
        responsive
        data={filledDataList ? filledDataList : []}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis width="auto" dataKey="t_amt" />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="t_amt"
          fill="#82ca9d"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
    </>
  );
}
