export interface PredictData {
  earnIncrease: string;
  earnIncreaseCount: string;
  returns: string;
  revIncrease: string;
}

export interface DailyPrices {
  Date: string;
  Close: string;
}

export interface DailyData {
  Close: string;
  Date: string;
  High: string;
  Low: string;
  Open: string;
  Volume: string;
}

export interface HeaderProps {
  setPredictData: React.Dispatch<React.SetStateAction<PredictData>>;
  setTicker: React.Dispatch<React.SetStateAction<string>>;
  setDailyPrices: React.Dispatch<React.SetStateAction<DailyPrices[]>>;
  setDailyData: React.Dispatch<React.SetStateAction<DailyData[]>>;
}

export interface ChartGridProps {
  predictData: PredictData;
  ticker: string;
  dailyPrices: DailyPrices[];
  dailyData: DailyData[];
}
