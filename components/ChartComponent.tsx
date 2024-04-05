import React, { useEffect, useRef } from "react";
import { createChart, ColorType, ISeriesApi } from "lightweight-charts";
import { CandleStick } from "@/types";

export default function ChartComponent(props: { listData: CandleStick[] }) {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  let data: CandleStick[] = props.listData;
  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: "white" },
          textColor: "back",
        },
        width: chartContainerRef.current?.clientWidth,
        height: 500,
      });

      const handleResize = () => {
        chart.applyOptions({
          width: chartContainerRef.current?.clientWidth,
          crosshair: {
            // hide the horizontal crosshair line
            horzLine: {
              visible: false,
              labelVisible: false,
            },
            // hide the vertical crosshair label
            vertLine: {
              labelVisible: false,
            },
          },
          // hide the grid lines
          grid: {
            vertLines: {
              visible: false,
            },
            horzLines: {
              visible: false,
            },
          },
        });
      };
      chart.timeScale().fitContent();
      const candleSeries = chart.addCandlestickSeries({
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      });

      candleSeries.setData(data);

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
        chart.remove();
      };
    }
  }, [data]);
  return (
    <>
      <h2>Chart price</h2>
      <div ref={chartContainerRef}></div>
    </>
  );
}
