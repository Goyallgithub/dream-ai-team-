
import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  LineChart, 
  Workflow, 
  History, 
  Bell, 
  Settings, 
  PlusCircle, 
  Search, 
  Sun, 
  Moon, 
  TrendingUp, 
  TrendingDown,
  User,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useTheme } from '../ThemeContext';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', mobile: true },
  { label: 'Market Overview', icon: LineChart, path: '/market-overview', mobile: false },
  { label: 'Strategies', icon: Workflow, path: '/strategies', mobile: false },
  { label: 'Backtesting', icon: History, path: '/backtesting', mobile: true },
  { label: 'Alerts', icon: Bell, path: '/alerts', mobile: true },
  { label: 'Settings', icon: Settings, path: '/settings', mobile: true },
];

const WATCHLIST = [
  { symbol: 'RELIANCE', change: '+1.2%', isPositive: true },
  { symbol: 'TCS', change: '-0.5%', isPositive: false },
  { symbol: 'HDFC', change: '+0.8%', isPositive: true },
];

const SidebarItem: React.FC<{ item: typeof NAV_ITEMS[0], active: boolean, collapsed: boolean }> = ({ item, active, collapsed }) => {
  const Icon = item.icon;
  return (
    <Link
      to={item.path}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
        active 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
          : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
      }`}
    >
      <Icon size={20} className={active ? 'scale-110' : ''} />
      {!collapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium whitespace-nowrap">{item.label}</motion.span>}
      {collapsed && active && <div className="absolute left-0 w-1 h-6 bg-white rounded-r-full" />}
    </Link>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme, density } = useTheme();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const pageTitle = NAV_ITEMS.find(item => item.path === location.pathname)?.label || 'Dream AI';

  return (
    <div className={`flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 ${density === 'compact' ? 'text-sm' : ''}`}>
      
      {/* Sidebar - Desktop */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarCollapsed ? 96 : 280 }}
        className="hidden lg:flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 fixed h-screen z-50 overflow-hidden"
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
                <TrendingUp size={24} strokeWidth={2.5} />
              </div>
              {!isSidebarCollapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-black tracking-tight dark:text-white">Dream AI</motion.span>}
            </div>
          </div>
          
          <nav className="space-y-1.5 flex-1">
            {NAV_ITEMS.map((item) => (
              <SidebarItem 
                key={item.label} 
                item={item} 
                active={location.pathname === item.path} 
                collapsed={isSidebarCollapsed}
              />
            ))}
          </nav>

          <div className="mt-auto space-y-4">
             {!isSidebarCollapsed && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                 <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Watchlist</h3>
                 <div className="space-y-3">
                   {WATCHLIST.map((stock) => (
                     <div key={stock.symbol} className="flex items-center justify-between group cursor-pointer">
                       <span className="text-xs font-semibold dark:text-slate-200 group-hover:text-blue-500">{stock.symbol}</span>
                       <span className={`text-[10px] font-bold ${stock.isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>{stock.change}</span>
                     </div>
                   ))}
                 </div>
               </motion.div>
             )}
             <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="w-full flex items-center justify-center p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
             >
               {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
             </button>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.aside 
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-slate-900 z-[70] shadow-2xl p-6"
          >
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                    <TrendingUp size={24} />
                  </div>
                  <span className="text-xl font-black dark:text-white">Dream AI</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                  <X size={20} />
                </button>
            </div>
            <nav className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    location.pathname === item.path 
                      ? 'bg-blue-600 text-white' 
                      : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-24' : 'lg:ml-[280px]'} mb-20 lg:mb-0`}>
        {/* Header */}
        <header className="h-16 md:h-20 border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 flex items-center justify-between sticky top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-slate-500">
              <Menu size={24} />
            </button>
            <h1 className="text-lg md:text-xl font-bold dark:text-white truncate max-w-[150px] md:max-w-none">{pageTitle}</h1>
          </div>
          
          <div className={`hidden md:flex flex-1 max-w-xl mx-8 transition-all ${isSearchFocused ? 'max-w-2xl' : ''}`}>
            <div className="relative w-full">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isSearchFocused ? 'text-blue-500' : 'text-slate-400'}`} size={18} />
              <input 
                type="text" 
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search markets..." 
                className="w-full pl-12 pr-4 py-2.5 bg-slate-100 dark:bg-slate-900 border-2 border-transparent focus:bg-white dark:focus:bg-slate-800 focus:border-blue-500 rounded-2xl outline-none transition-all dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 md:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:ring-2 hover:ring-blue-500/20 transition-all"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="hidden md:flex p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:ring-2 hover:ring-blue-500/20 transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold cursor-pointer">
              <User size={20} />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <motion.div 
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 md:p-8"
        >
          {children}
        </motion.div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 h-16 px-6 flex items-center justify-between z-[60]">
        {NAV_ITEMS.filter(item => item.mobile).map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link 
              key={item.label}
              to={item.path}
              className={`flex flex-col items-center gap-1 ${active ? 'text-blue-600' : 'text-slate-400'}`}
            >
              <item.icon size={22} className={active ? 'scale-110' : ''} />
              <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
