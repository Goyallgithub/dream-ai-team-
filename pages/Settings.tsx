
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Button } from '../components/UI';
import { useTheme } from '../ThemeContext';
// Added missing Sun and Moon icon imports
import { User, Shield, Bell, Monitor, CheckCircle2, LayoutGrid, Sun, Moon } from 'lucide-react';

export const Settings: React.FC = () => {
  const { theme, toggleTheme, density, toggleDensity } = useTheme();
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleProfileSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold dark:text-white">Global Preferences</h2>
        <motion.div 
          animate={{ opacity: saveSuccess ? 1 : 0, scale: saveSuccess ? 1 : 0.8 }}
          className="flex items-center gap-2 text-emerald-500 text-sm font-bold"
        >
          <CheckCircle2 size={16} /> Changes saved successfully!
        </motion.div>
      </div>

      <div className="space-y-6 md:space-y-8">
        {/* Appearance & Layout */}
        <Card className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-8">
            <Monitor className="text-blue-500" size={24} />
            <h3 className="text-xl font-bold dark:text-white">Interface</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-transparent hover:border-blue-500/20 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                   {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                </div>
                <div>
                  <p className="font-bold dark:text-white">Theme Mode</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Current: {theme === 'dark' ? 'Dark' : 'Light'}</p>
                </div>
              </div>
              <button 
                onClick={toggleTheme}
                className={`w-14 h-8 rounded-full p-1 transition-all ${theme === 'dark' ? 'bg-blue-600' : 'bg-slate-300'}`}
              >
                <motion.div 
                  layout
                  className="w-6 h-6 bg-white rounded-full shadow-lg" 
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-transparent hover:border-blue-500/20 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                   <LayoutGrid size={20} />
                </div>
                <div>
                  <p className="font-bold dark:text-white">Layout Density</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Current: {density === 'comfortable' ? 'Comfortable' : 'Compact'}</p>
                </div>
              </div>
              <button 
                onClick={toggleDensity}
                className={`w-14 h-8 rounded-full p-1 transition-all ${density === 'compact' ? 'bg-purple-600' : 'bg-slate-300'}`}
              >
                <motion.div 
                  layout
                  className="w-6 h-6 bg-white rounded-full shadow-lg" 
                />
              </button>
            </div>
          </div>
        </Card>

        {/* User Account */}
        <Card className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-8">
            <User className="text-blue-500" size={24} />
            <h3 className="text-xl font-bold dark:text-white">Account Details</h3>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                <input 
                  type="text" 
                  defaultValue="Alex Trader" 
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:text-white" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                <input 
                  type="email" 
                  defaultValue="alex@dream-ai.io" 
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:text-white" 
                />
              </div>
            </div>
            <Button 
              onClick={handleProfileSave}
              disabled={isSaving}
              className="w-full md:w-auto min-w-[160px]"
            >
              {isSaving ? 'Saving Changes...' : 'Save Profile'}
            </Button>
          </div>
        </Card>

        {/* Security Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pb-10">
          <Card className="p-6 border-l-4 border-l-emerald-500">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-emerald-500" size={20} />
              <h4 className="font-bold dark:text-white">Security Scan</h4>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Last checked 2 hours ago. All system protocols are green.</p>
            <Button variant="secondary" className="w-full text-xs font-bold uppercase tracking-widest">View History</Button>
          </Card>
          <Card className="p-6 border-l-4 border-l-amber-500">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="text-amber-500" size={20} />
              <h4 className="font-bold dark:text-white">Sync Status</h4>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Local storage synced with cloud. Mobile push enabled.</p>
            <Button variant="secondary" className="w-full text-xs font-bold uppercase tracking-widest">Force Sync</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
