
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Badge, Button } from '../components/UI';
import { Bell, BellOff, Trash2, Edit2, Plus, AlertTriangle } from 'lucide-react';

const INITIAL_ALERTS = [
  { id: 1, type: 'Price', asset: 'RELIANCE', condition: 'Crosses above ₹3,000', active: true },
  { id: 2, type: 'Technical', asset: 'NIFTY 50', condition: 'RSI crosses 70 (15m)', active: true },
  { id: 3, type: 'Volume', asset: 'TCS', condition: 'Volume spikes > 2x avg', active: false },
  { id: 4, type: 'Price', asset: 'HDFC BANK', condition: 'Falls below ₹1,550', active: true },
];

export const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);

  const toggleAlert = (id: number) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  const deleteAlert = (id: number) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold dark:text-white">Active Alerts</h2>
          <p className="text-slate-500 text-sm mt-1">Real-time notifications powered by Dream AI signals.</p>
        </div>
        <Button className="flex items-center justify-center gap-2 py-3"><Plus size={18}/> New Alert</Button>
      </div>

      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {alerts.length === 0 ? (
             <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl"
             >
                <AlertTriangle className="mx-auto text-slate-300 mb-4" size={48} />
                <p className="text-slate-500 font-medium">No alerts configured yet.</p>
             </motion.div>
          ) : alerts.map((alert) => (
            <motion.div
              layout
              key={alert.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            >
              <Card className={`p-5 md:p-6 flex items-center justify-between group ${!alert.active && 'opacity-60 bg-slate-50/50 dark:bg-slate-900/30'}`}>
                <div className="flex items-center gap-4 md:gap-6">
                  <motion.div 
                    animate={{ rotate: alert.active ? [0, -10, 10, -10, 0] : 0 }}
                    transition={{ repeat: alert.active ? Infinity : 0, repeatDelay: 3, duration: 0.5 }}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${alert.active ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}
                  >
                    {alert.active ? <Bell size={24} /> : <BellOff size={24} />}
                  </motion.div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 overflow-hidden">
                      <h4 className="font-black text-base md:text-lg dark:text-white truncate">{alert.asset}</h4>
                      <Badge variant={alert.type === 'Technical' ? 'warning' : 'info'}>{alert.type}</Badge>
                    </div>
                    <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium truncate">{alert.condition}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 md:gap-4 shrink-0">
                  <div className="hidden sm:flex flex-col items-end mr-4">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Auto-Switch</span>
                    <button 
                      onClick={() => toggleAlert(alert.id)}
                      className={`w-10 h-5 rounded-full p-0.5 transition-colors ${alert.active ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                    >
                      <motion.div 
                        animate={{ x: alert.active ? 20 : 0 }}
                        className="w-4 h-4 bg-white rounded-full shadow-sm" 
                      />
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <button className="p-2 md:p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-blue-500 hover:border-blue-500 transition-all">
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => deleteAlert(alert.id)}
                      className="p-2 md:p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-rose-500 hover:border-rose-500 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
