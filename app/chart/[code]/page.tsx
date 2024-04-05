"use client";
import ChartComponent from "@/components/ChartComponent";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Select, SelectItem } from "@nextui-org/react";
import { CandleStick, CandleStickResponse } from "@/types";
export default function Chart({ params }: { params: { code: string } }) {
  const [list, setList] = useState<CandleStick[]>([]);
  const [timeVal, SettimeVal] = useState<string>("1day");
  const interval = [
    {
      label: "1m",
      value: "1m",
    },
    {
      label: "5m",
      value: "5m",
    },
    {
      label: "15m",
      value: "15m",
    },
    {
      label: "30m",
      value: "30m",
    },
    {
      label: "1h",
      value: "1hr",
    },
    {
      label: "1d",
      value: "1day",
    },
  ];

  useEffect(() => {
    const code = params.code;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const getCandleStickResponse = async () => {
      const res = await axios.get(`${baseUrl}/candles/${code}/${timeVal}`);
      if (res.status === 200) {
        let data: CandleStickResponse[] = res.data;
        const resultData = data
          .map(([time, open, high, low, close, volume]) => ({
            time,
            open,
            high,
            low,
            close,
            volume,
          }))
          .sort((a, b) => a.time - b.time);

        setList(resultData);
      }
    };
    getCandleStickResponse();
  }, [params.code, timeVal]);

  return (
    <>
      <Select
        items={interval}
        label="Interval"
        placeholder="Select Interval"
        className="max-w-xs"
        defaultSelectedKeys={["1day"]}
        onChange={(e) => SettimeVal(e.target.value)}
      >
        {(time) => <SelectItem key={time.value}>{time.label}</SelectItem>}
      </Select>
      <ChartComponent listData={list} />
    </>
  );
}
