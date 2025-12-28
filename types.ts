
export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  isPositive: boolean;
}

export interface Strategy {
  id: string;
  name: string;
  description: string;
  risk: 'Low' | 'Medium' | 'High';
  performance: string;
}

export interface MarketIndex {
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
  sparkline: number[];
}

export interface TradeRecord {
  id: number;
  direction: 'Long' | 'Short';
  symbol: string;
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  pnlPercentage: number;
  reason: string;
  exitReason: string;
  rr: number;
  duration: string;
  timestamp: string;
}

export interface BacktestResult {
  netProfit: number;
  cagr: number;
  winRate: number;
  totalTrades: number;
  maxDrawdown: number;
  profitFactor: number;
  sharpeRatio: number;
  avgRR: number;
}
