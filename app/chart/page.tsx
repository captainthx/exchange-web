"use client";
import ChartComponent from "@/components/ChartComponent";
import React from "react";
import { priceData } from "../priceData";

export default function Chart() {
  return <ChartComponent data={priceData}></ChartComponent>;
}
