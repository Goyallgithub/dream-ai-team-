
import React from 'react';
import { Card, Badge } from '../components/UI';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const INDICES = [
  { name: 'NIFTY 50', price: '24,620.45', change: '+1.45%', isPositive: true, data: [20, 40, 35, 50, 45, 60, 55] },
  { name: 'SENSEX', price: '80,450.20', change: '+1.20%', isPositive: true, data: [10, 30, 25, 40, 35, 50, 45] },
  { name: 'BANK NIFTY', price: '52,100.15', change: '-0.35%', isPositive: false, data: [60, 50, 55, 40, 45, 30, 35] },
  { name: 'NASDAQ 100', price: '19,450.80', change: '+2.10%', isPositive: true, data: [5, 15, 10, 30, 25, 45, 60] },
  { name: 'S&P 500', price: '5,580.30', change: '+0.85%', isPositive: true, data: [20, 25, 22, 28, 26, 30, 32] },
  { name: 'GOLD COMEX', price: '2,420.10', change: '-1.15%', isPositive: false, data: [50, 40, 45, 30, 35, 20, 15] },
];

export const MarketOverview: React.FC = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold dark:text-white">Global Markets</h2>
        <div className="flex gap-2">
           <Badge variant="info">Real-time Data</Badge>
           <Badge variant="warning">Market Open</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INDICES.map((index) => (
          <Card key={index.name} className="p-6 hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-slate-500 dark:text-slate-400 font-bold text-sm tracking-wide group-hover:text-blue-500 transition-colors uppercase">{index.name}</h3>
                <p className="text-2xl font-black mt-1 dark:text-white">₹{index.price}</p>
              </div>
              <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-black ${
                index.isPositive ? 'text-emerald-500 bg-emerald-500/10' : 'text-rose-500 bg-rose-500/10'
              }`}>
                {index.isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {index.change}
              </div>
            </div>

            <div className="h-16 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={index.data.map(v => ({ v }))}>
                  <Line 
                    type="monotone" 
                    dataKey="v" 
                    stroke={index.isPositive ? '#10b981' : '#f43f5e'} 
                    strokeWidth={2.5} 
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
