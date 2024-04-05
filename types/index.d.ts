export interface PriceFeed {
  pair: string;
  price: string;
  percentChange24h: string;
}
export type CandleStickResponse = [
  UTCTimestamp,
  number,
  number,
  number,
  number,
  number
];

type CandleStick = {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};
