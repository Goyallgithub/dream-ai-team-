
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export const Card: React.FC<HTMLMotionProps<"div"> & { children: React.ReactNode; className?: string }> = ({ children, className = '', ...props }) => (
  <motion.div 
    whileHover={{ y: -4, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
    className={`bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-shadow duration-300 overflow-hidden ${className}`}
    {...props}
  >
    {children}
  </motion.div>
);

export const Badge: React.FC<{ children: React.ReactNode; variant?: 'success' | 'warning' | 'danger' | 'info' }> = ({ children, variant = 'info' }) => {
  const variants = {
    success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
    warning: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
    danger: 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',
    info: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400'
  };

  return (
    <motion.span 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`px-2.5 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wide ${variants[variant]}`}
    >
      {children}
    </motion.span>
  );
};

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'ghost' }> = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:bg-blue-800',
    secondary: 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700',
    outline: 'border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-500',
    ghost: 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
  };

  return (
    <motion.button 
      whileTap={{ scale: 0.96 }}
      className={`px-4 md:px-5 py-2.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </motion.button>
  );
};

export const AnimatedCounter: React.FC<{ value: string; className?: string }> = ({ value, className }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      key={value}
      className={className}
    >
      {value}
    </motion.span>
  );
};
