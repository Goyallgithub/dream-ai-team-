
import React from 'react';
import { Card, Badge, Button } from '../components/UI';
import { Filter, Zap, Shield, Target } from 'lucide-react';

const STRATEGIES = [
  { id: '1', name: 'Golden Cross EMA', desc: 'Trend following strategy using 50 and 200 day EMA crossovers.', risk: 'Medium', pnl: '+42.5%', icon: <Zap className="text-amber-500" /> },
  { id: '2', name: 'RSI Oversold Bounce', desc: 'Mean reversion strategy targeting assets with RSI below 30.', risk: 'High', pnl: '+18.2%', icon: <Shield className="text-blue-500" /> },
  { id: '3', name: 'Bollinger Band Squeeze', desc: 'Volatility breakout strategy for low-range consolidation zones.', risk: 'Medium', pnl: '+24.1%', icon: <Target className="text-emerald-500" /> },
  { id: '4', name: 'Dividend Growth', desc: 'Long-term portfolio strategy focusing on consistent dividend payers.', risk: 'Low', pnl: '+12.5%', icon: <Shield className="text-rose-500" /> },
];

export const Strategies: React.FC = () => {
  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold dark:text-white">Active Strategies</h2>
          <p className="text-sm text-slate-500 mt-1">Deploy and manage your automated trading algorithms.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="flex items-center gap-2"><Filter size={18}/> Filters</Button>
          <Button className="flex items-center gap-2">Create Strategy</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {STRATEGIES.map((strat) => (
          <Card key={strat.id} className="p-8 group">
            <div className="flex gap-6">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
                {strat.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold dark:text-white">{strat.name}</h3>
                  <Badge variant={strat.risk === 'Low' ? 'success' : strat.risk === 'Medium' ? 'warning' : 'danger'}>
                    {strat.risk} Risk
                  </Badge>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                  {strat.desc}
                </p>
                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-6">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Performance</span>
                    <span className="text-emerald-500 font-bold">{strat.pnl} Lifetime P&L</span>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="px-4">View</Button>
                    <Button className="px-4">Edit</Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
