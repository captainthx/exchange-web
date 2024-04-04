import React, { useEffect, useRef } from "react";
import { createChart, ColorType } from "lightweight-charts";
import { volumeData } from "@/app/volumeData";

export default function ChartComponent(props: any) {
  const {
    data,
    colors: {
      backgroundColor = "white",
      lineColor = "#2962FF",
      textColor = "black",
      areaTopColor = "#2962FF",
      areaBottomColor = "rgba(41, 98, 255, 0.28)",
    } = {},
  } = props;
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: backgroundColor },
          textColor,
        },
        width: chartContainerRef.current?.clientWidth,
        height: 500,
      });

      const handleResize = () => {
        chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
      };

      chart.timeScale().fitContent();
      const newSeries = chart.addCandlestickSeries({
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      });
      newSeries.setData(data);

      const volumeSeries = chart.addHistogramSeries({
        priceFormat: {
          type: "volume",
        },
        priceScaleId: "",
      });
      volumeSeries.priceScale().applyOptions({
        scaleMargins: {
          top: 0.7,
          bottom: 0,
        },
      });
      volumeSeries.setData(volumeData);
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);

        chart.remove();
      };
    }
    [
      data,
      backgroundColor,
      lineColor,
      textColor,
      areaTopColor,
      areaBottomColor,
    ];
  });
  return (
    <>
      <h2>Chart price</h2>
      <div ref={chartContainerRef}></div>;
    </>
  );
}
