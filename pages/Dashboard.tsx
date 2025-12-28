
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Card, Button, Badge } from '../components/UI';
import { TrendingUp, Sparkles, Plus, Share2, MousePointer2 } from 'lucide-react';

const MOCK_DATA = [
  { name: '09:00', value: 24200 },
  { name: '10:00', value: 24350 },
  { name: '11:00', value: 24280 },
  { name: '12:00', value: 24420 },
  { name: '13:00', value: 24500 },
  { name: '14:00', value: 24450 },
  { name: '15:00', value: 24620 },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Section */}
        <Card className="lg:col-span-2 p-8">
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-3xl font-black dark:text-white">NIFTY 50</h2>
                <Badge variant="success">+1.45%</Badge>
              </div>
              <p className="text-slate-500 font-medium">₹24,620.45 <span className="text-emerald-500 ml-1">+345.20 today</span></p>
            </div>
            <div className="flex gap-2">
              {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map((range) => (
                <button 
                  key={range} 
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    range === '1D' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                <XAxis dataKey="name" hide />
                <YAxis hide domain={['dataMin - 100', 'dataMax + 100']} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#2563eb" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex gap-4 mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
            <Button className="flex items-center gap-2"><TrendingUp size={18}/> View Chart</Button>
            <Button variant="outline" className="flex items-center gap-2"><Share2 size={18}/> Compare</Button>
            <Button variant="outline" className="flex items-center gap-2"><Plus size={18}/> Add Alert</Button>
          </div>
        </Card>

        {/* AI Insight Section */}
        <div className="space-y-8">
          <Card className="p-8 bg-blue-600 border-none shadow-xl shadow-blue-500/20 text-white relative overflow-hidden group">
            <Sparkles className="absolute top-4 right-4 text-blue-300 opacity-50 group-hover:scale-125 transition-transform" size={48} />
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              AI Trading Insight
            </h3>
            <p className="text-blue-50 text-sm leading-relaxed mb-6">
              Nifty 50 is showing strong bullish momentum after breaking through the 24,400 resistance level. Volume expansion suggests a potential rally towards 25,000 within the next 5 sessions.
            </p>
            <Button variant="secondary" className="w-full bg-white text-blue-600 hover:bg-blue-50">
              Apply Strategy
            </Button>
          </Card>

          <Card className="p-8">
            <h3 className="font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <MousePointer2 size={18} className="text-blue-500" /> Recent Activity
            </h3>
            <div className="space-y-6">
              {[
                { title: 'EMA Cross Alert', desc: 'RELIANCE 15m breakout', time: '2m ago', icon: '⚡' },
                { title: 'Backtest Ready', desc: 'RSI Reversal (68% win)', time: '1h ago', icon: '📊' },
                { title: 'Market Opening', desc: 'Bullish bias detected', time: '4h ago', icon: '☀️' },
              ].map((act, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-lg">{act.icon}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold dark:text-slate-200">{act.title}</h4>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">{act.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{act.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 text-xs font-bold text-blue-500 uppercase tracking-widest hover:underline">View All Notifications</button>
          </Card>
        </div>
      </div>
    </div>
  );
};
