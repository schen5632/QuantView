import { Stack } from "@mui/material";
import React, { useState } from "react";
import Header from "../components/Header/Header";
import ChartGrid from "./ChartGrid";
import { DailyData, DailyPrices, PredictData } from "../interfaces/interfaces";

const Container = () => {
  const defaultData = {
    earnIncrease: "0",
    earnIncreaseCount: "0",
    returns: "0",
    revIncrease: "0",
  };
  const [predictData, setPredictData] = useState<PredictData>(defaultData);
  const [ticker, setTicker] = useState<string>("Stock");
  const [dailyPrices, setDailyPrices] = useState<DailyPrices[]>([]);
  const [dailyData, setDailyData] = useState<DailyData[]>([]);
  return (
    <Stack>
      <Header
        setPredictData={setPredictData}
        setTicker={setTicker}
        setDailyPrices={setDailyPrices}
        setDailyData={setDailyData}
      />
      <ChartGrid
        predictData={predictData}
        ticker={ticker}
        dailyPrices={dailyPrices}
        dailyData={dailyData}
      />
    </Stack>
  );
};

export default Container;
