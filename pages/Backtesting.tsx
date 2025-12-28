import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Download, 
  Calendar, 
  Wallet, 
  Percent, 
  BarChart2, 
  ArrowDownRight,
  RefreshCcw,
  Search,
  Settings2,
  ShieldCheck,
  Zap,
  Target,
  ArrowUpRight,
  ChevronDown,
  Info,
  Clock,
  TrendingUp,
  Activity,
  Layers,
  Trash2,
  Plus
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts';
import { Card, Button, Badge, AnimatedCounter } from '../components/UI';
import { TradeRecord, BacktestResult } from '../types';

const TIMEFRAMES = ['1m', '5m', '15m', '1H', '1D'];
const STRATEGY_TYPES = [
  'EMA Crossover', 
  'RSI Mean Reversion', 
  'Breakout Strategy', 
  'Trend Following', 
  'Mean Reversion (Bollinger)'
];

const STRATEGY_INSIGHT_RULES = [
  { text: "Strategy performs best in trending markets with high ADX.", type: 'positive' },
  { text: "Significant slippage observed during high-volatility sessions.", type: 'warning' },
  { text: "Max drawdown occurred during market consolidation phase.", type: 'info' },
  { text: "Win rate drops by 12% when RSI is > 85.", type: 'warning' }
];

export const Backtesting: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'summary' | 'charts' | 'logs'>('summary');
  
  // Strategy Builder State
  const [config, setConfig] = useState({
    symbol: 'NIFTY 50',
    timeframe: '15m',
    strategyType: 'EMA Crossover',
    capital: 1000000,
    riskPerTrade: 1.5,
    maxDrawdownLimit: 10,
    indicators: [
      { id: 1, name: 'EMA Fast', period: 9 },
      { id: 2, name: 'EMA Slow', period: 21 }
    ],
    trailingSL: true
  });

  const [results, setResults] = useState<{
    metrics: BacktestResult;
    equityCurve: any[];
    monthlyPnL: any[];
    tradeLogs: TradeRecord[];
  } | null>(null);

  // Simulation Logic
  const handleRunBacktest = () => {
    setIsRunning(true);
    setResults(null);

    setTimeout(() => {
      const tradeCount = 45 + Math.floor(Math.random() * 20);
      const isProfitable = Math.random() > 0.35;
      
      // Explicitly typed the return of the map function to fix TradeRecord compatibility
      const logs: TradeRecord[] = Array.from({ length: tradeCount }, (_, i): TradeRecord => {
        const win = Math.random() < (isProfitable ? 0.55 : 0.42);
        const rr = win ? (1.5 + Math.random() * 2.5) : 1;
        const pnlPct = win ? (config.riskPerTrade * rr) : (-config.riskPerTrade);
        const slippage = Math.random() * 0.1;
        const finalPnlPct = pnlPct - slippage;

        return {
          id: i + 1,
          direction: Math.random() > 0.5 ? 'Long' : 'Short',
          symbol: config.symbol,
          entryPrice: 24000 + (Math.random() * 1000),
          exitPrice: 0, // Simplified
          pnl: Math.floor(config.capital * (finalPnlPct / 100)),
          pnlPercentage: parseFloat(finalPnlPct.toFixed(2)),
          reason: `${config.strategyType} Confirmation`,
          exitReason: win ? 'Target Hit' : 'Stop Loss',
          rr: parseFloat(rr.toFixed(1)),
          duration: `${Math.floor(Math.random() * 120)}m`,
          timestamp: `2024-05-${(i % 28) + 1} 10:00`
        };
      }).reverse();

      const equityCurve = logs.reduce((acc: any[], trade, i) => {
        const lastEquity = acc.length > 0 ? acc[acc.length - 1].equity : config.capital;
        acc.push({
          index: i,
          equity: lastEquity + trade.pnl,
          drawdown: Math.random() * 5 // Mock drawdown
        });
        return acc;
      }, []);

      const monthlyPnL = [
        { month: 'Jan', pnl: 4.2 }, { month: 'Feb', pnl: -1.5 },
        { month: 'Mar', pnl: 2.8 }, { month: 'Apr', pnl: 5.1 },
        { month: 'May', pnl: 1.2 }, { month: 'Jun', pnl: -0.8 }
      ];

      setResults({
        metrics: {
          netProfit: logs.reduce((sum, t) => sum + t.pnl, 0),
          cagr: isProfitable ? 24.5 : -4.2,
          winRate: (logs.filter(t => t.pnl > 0).length / logs.length) * 100,
          totalTrades: logs.length,
          maxDrawdown: 8.4,
          profitFactor: isProfitable ? 1.85 : 0.92,
          sharpeRatio: isProfitable ? 2.1 : 0.45,
          avgRR: 1.6
        },
        equityCurve,
        monthlyPnL,
        tradeLogs: logs
      });
      setIsRunning(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
      {/* LEFT: Strategy Builder Panel */}
      <aside className="w-full lg:w-[400px] shrink-0 space-y-6">
        <Card className="p-6 md:p-8 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold dark:text-white flex items-center gap-2">
              <Settings2 size={20} className="text-blue-500" /> Builder
            </h3>
            <Badge variant="info">{config.timeframe}</Badge>
          </div>

          {/* Instrument & Timeframe */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Asset</label>
                <select 
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-2.5 text-sm outline-none dark:text-white"
                  value={config.symbol}
                  onChange={(e) => setConfig({...config, symbol: e.target.value})}
                >
                  <option>NIFTY 50</option>
                  <option>BANK NIFTY</option>
                  <option>RELIANCE</option>
                  <option>TCS</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Timeframe</label>
                <select 
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-2.5 text-sm outline-none dark:text-white"
                  value={config.timeframe}
                  onChange={(e) => setConfig({...config, timeframe: e.target.value})}
                >
                  {TIMEFRAMES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Core Engine</label>
              <select 
                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-2.5 text-sm font-semibold outline-none dark:text-white"
                value={config.strategyType}
                onChange={(e) => setConfig({...config, strategyType: e.target.value})}
              >
                {STRATEGY_TYPES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Indicators Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Indicators</label>
              <button className="text-blue-500 hover:text-blue-600 transition-colors">
                <Plus size={16} />
              </button>
            </div>
            <div className="space-y-2">
              {config.indicators.map((ind) => (
                <div key={ind.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-transparent hover:border-blue-500/20 group">
                  <div className="flex items-center gap-3">
                    <Layers size={14} className="text-slate-400" />
                    <span className="text-xs font-bold dark:text-slate-200">{ind.name} ({ind.period})</span>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 text-rose-500 transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Management Section */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
              <ShieldCheck size={14} /> Risk & Position
            </h4>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Capital allocation</label>
                <div className="relative">
                  <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="number" 
                    value={config.capital} 
                    onChange={(e) => setConfig({...config, capital: parseInt(e.target.value)})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-2.5 pl-10 text-sm outline-none dark:text-white" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Risk/Trade (%)</label>
                  <input 
                    type="number" 
                    value={config.riskPerTrade} 
                    step="0.1"
                    onChange={(e) => setConfig({...config, riskPerTrade: parseFloat(e.target.value)})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-2.5 text-sm outline-none dark:text-white" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Max DD (%)</label>
                  <input 
                    type="number" 
                    value={config.maxDrawdownLimit} 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-2.5 text-sm outline-none dark:text-white" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Risk Preview Card */}
          <div className="p-4 bg-blue-500/5 dark:bg-blue-500/10 rounded-2xl border border-blue-500/10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold text-blue-500 uppercase">Risk Preview</span>
              <Badge variant="info">Low Risk</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-500 dark:text-slate-400 flex justify-between">Max Loss/Trade: <span className="font-bold text-rose-500">₹{(config.capital * (config.riskPerTrade/100)).toLocaleString()}</span></p>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex justify-between">Position Size (Unit): <span className="font-bold dark:text-white">42.5 Units</span></p>
            </div>
          </div>

          <Button 
            className="w-full py-4 mt-2 flex items-center justify-center gap-3 text-lg font-bold shadow-2xl"
            onClick={handleRunBacktest}
            disabled={isRunning}
          >
            {isRunning ? <RefreshCcw className="animate-spin" size={20} /> : <Zap size={20} fill="currentColor" />}
            {isRunning ? 'Optimizing...' : 'Run Simulation'}
          </Button>
        </Card>
      </aside>

      {/* RIGHT: Results Dashborad */}
      <main className="flex-1 space-y-6 min-w-0">
        <AnimatePresence mode="wait">
          {!results && !isRunning && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="h-full min-h-[600px] flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem]"
            >
              <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center text-blue-500 mb-6">
                <Target size={40} />
              </div>
              <h2 className="text-2xl font-black dark:text-white mb-2">Quant Backtester v3.0</h2>
              <p className="text-slate-500 max-w-sm">
                Advanced event-driven strategy simulation. Configure your parameters and hit run to see professional-grade analytics.
              </p>
            </motion.div>
          )}

          {isRunning && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="h-full min-h-[600px] flex flex-col items-center justify-center space-y-6"
            >
              <div className="relative">
                <div className="w-24 h-24 border-8 border-blue-500/10 rounded-full" />
                <div className="absolute top-0 w-24 h-24 border-8 border-blue-500 rounded-full border-t-transparent animate-spin" />
              </div>
              <div className="text-center">
                <p className="text-lg font-bold dark:text-white animate-pulse">Running Monte Carlo Simulation...</p>
                <p className="text-sm text-slate-500">Calculating CAGR & Sharpe Ratios</p>
              </div>
            </motion.div>
          )}

          {results && !isRunning && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Performance Tabs */}
              <div className="flex p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl w-fit">
                {['summary', 'charts', 'logs'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-6 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                      activeTab === tab 
                        ? 'bg-white dark:bg-slate-800 text-blue-500 shadow-sm' 
                        : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeTab === 'summary' && (
                <div className="space-y-6">
                  {/* Top Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Net Profit', value: `₹${results.metrics.netProfit.toLocaleString()}`, icon: TrendingUp, color: results.metrics.netProfit > 0 ? 'text-emerald-500' : 'text-rose-500' },
                      { label: 'CAGR', value: `${results.metrics.cagr}%`, icon: ArrowUpRight, color: 'text-blue-500' },
                      { label: 'Win Rate', value: `${results.metrics.winRate.toFixed(1)}%`, icon: Target, color: 'text-purple-500' },
                      { label: 'Sharpe Ratio', value: results.metrics.sharpeRatio.toString(), icon: Activity, color: 'text-amber-500' },
                    ].map((m) => (
                      <Card key={m.label} className="p-6 border-b-4 border-b-slate-100 dark:border-b-slate-800">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{m.label}</span>
                          <m.icon size={14} className="text-slate-400" />
                        </div>
                        <AnimatedCounter value={m.value} className={`text-2xl font-black ${m.color}`} />
                      </Card>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Main Equity Chart Summary */}
                    <Card className="xl:col-span-2 p-8">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="font-bold dark:text-white flex items-center gap-2">
                           Equity Growth <Info size={14} className="text-slate-400" />
                        </h3>
                        <Badge variant="success">Positive Alpha</Badge>
                      </div>
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={results.equityCurve}>
                            <defs>
                              <linearGradient id="equityGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.1} />
                            <XAxis dataKey="index" hide />
                            <YAxis hide domain={['dataMin - 5000', 'dataMax + 5000']} />
                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }} />
                            <Area type="stepAfter" dataKey="equity" stroke="#3b82f6" strokeWidth={3} fill="url(#equityGrad)" animationDuration={1000} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </Card>

                    {/* AI-like Insights */}
                    <Card className="p-8 space-y-6">
                      <h3 className="font-bold dark:text-white flex items-center gap-2">
                        <Zap size={18} className="text-amber-500" /> Engine Insights
                      </h3>
                      <div className="space-y-4">
                        {STRATEGY_INSIGHT_RULES.map((rule, idx) => (
                          <div key={idx} className={`p-4 rounded-xl text-xs leading-relaxed border-l-4 ${
                            rule.type === 'positive' ? 'bg-emerald-500/5 border-emerald-500 text-emerald-700 dark:text-emerald-400' :
                            rule.type === 'warning' ? 'bg-amber-500/5 border-amber-500 text-amber-700 dark:text-amber-400' :
                            'bg-blue-500/5 border-blue-500 text-blue-700 dark:text-blue-400'
                          }`}>
                            {rule.text}
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full text-xs font-bold uppercase py-4">Download PDF Report</Button>
                    </Card>
                  </div>

                  {/* Secondary Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     {[
                       { label: 'Profit Factor', value: results.metrics.profitFactor.toString(), hint: 'Gross Profit / Gross Loss' },
                       { label: 'Max Drawdown', value: `${results.metrics.maxDrawdown}%`, hint: 'Peak to trough decline' },
                       { label: 'Avg R:R', value: `${results.metrics.avgRR}:1`, hint: 'Risk to Reward Ratio' },
                       { label: 'Monthly ROI', value: '4.2%', hint: 'Average monthly return' },
                     ].map((s) => (
                       <div key={s.label} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                         <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">{s.label}</span>
                         <span className="text-lg font-black dark:text-white">{s.value}</span>
                         <p className="text-[9px] text-slate-500 mt-1">{s.hint}</p>
                       </div>
                     ))}
                  </div>
                </div>
              )}

              {activeTab === 'charts' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                   <Card className="p-8">
                     <h4 className="text-sm font-bold mb-6 dark:text-white">Monthly Returns (%)</h4>
                     <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={results.monthlyPnL}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                            <XAxis dataKey="month" fontSize={10} axisLine={false} tickLine={false} />
                            <YAxis fontSize={10} axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Bar dataKey="pnl" radius={[4, 4, 0, 0]}>
                              {results.monthlyPnL.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.pnl > 0 ? '#10b981' : '#f43f5e'} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                     </div>
                   </Card>
                   <Card className="p-8">
                     <h4 className="text-sm font-bold mb-6 dark:text-white">Drawdown Profile</h4>
                     <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={results.equityCurve}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                            <XAxis dataKey="index" hide />
                            <YAxis fontSize={10} axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Area type="monotone" dataKey="drawdown" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.1} />
                          </AreaChart>
                        </ResponsiveContainer>
                     </div>
                   </Card>
                </div>
              )}

              {activeTab === 'logs' && (
                <Card className="overflow-hidden">
                  <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <h3 className="text-lg font-bold dark:text-white">Execution Logs</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" className="px-3 py-1.5 text-xs">Filter Win</Button>
                      <Button variant="outline" className="px-3 py-1.5 text-xs">Filter Loss</Button>
                    </div>
                  </div>
                  <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left min-w-[800px]">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50">
                          <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trade #</th>
                          <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Direction</th>
                          <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Entry / Reason</th>
                          <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">P&L (%)</th>
                          <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">R:R</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {results.tradeLogs.map((trade, idx) => (
                          <motion.tr 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            key={trade.id} 
                            className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                          >
                            <td className="px-8 py-5">
                              <span className="text-xs font-bold text-slate-400">#{trade.id}</span>
                            </td>
                            <td className="px-8 py-5">
                              <div className="flex items-center gap-2">
                                {trade.direction === 'Long' ? <ArrowUpRight size={14} className="text-blue-500" /> : <ArrowDownRight size={14} className="text-amber-500" />}
                                <span className={`text-[10px] font-black uppercase ${trade.direction === 'Long' ? 'text-blue-500' : 'text-amber-500'}`}>{trade.direction}</span>
                              </div>
                            </td>
                            <td className="px-8 py-5">
                              <div className="flex flex-col">
                                <span className="text-xs font-bold dark:text-slate-200">₹{trade.entryPrice.toLocaleString()}</span>
                                <span className="text-[10px] text-slate-500">{trade.reason}</span>
                              </div>
                            </td>
                            <td className="px-8 py-5">
                               <div className="flex flex-col">
                                <span className={`text-sm font-black ${trade.pnlPercentage > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                  {trade.pnlPercentage > 0 ? '+' : ''}{trade.pnlPercentage}%
                                </span>
                                <span className="text-[10px] text-slate-500">Net: ₹{trade.pnl.toLocaleString()}</span>
                              </div>
                            </td>
                            <td className="px-8 py-5 text-right font-bold dark:text-slate-300">
                              {trade.rr}:1
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};