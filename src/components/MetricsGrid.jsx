import React from 'react';
import { motion } from 'framer-motion';
import {
  FiMaximize2, FiHome, FiDollarSign, FiCalendar,
  FiTrendingUp, FiPercent, FiActivity, FiClock,
} from 'react-icons/fi';
import AnimatedNumber from './AnimatedNumber';
import { formatINR } from '../utils/calculations';

const cards = (data) => [
  {
    label: 'Plot Size',
    value: data.plotSize + ' Sqft',
    icon: FiMaximize2,
    raw: null,
    color: '#C9A227',
  },
  {
    label: 'Studios',
    value: null,
    raw: data.studios,
    icon: FiHome,
    color: '#C9A227',
    format: (v) => Math.round(v).toString(),
  },
  {
    label: 'Total Investment',
    value: null,
    raw: data.totalInvestment,
    icon: FiDollarSign,
    color: '#C9A227',
    format: (v) => formatINR(v),
    full: formatINR(data.totalInvestment, false),
  },
  {
    label: 'Monthly Lease',
    value: null,
    raw: data.monthlyLease,
    icon: FiCalendar,
    color: '#4ade80',
    format: (v) => formatINR(v),
  },
  {
    label: 'Annual Lease',
    value: null,
    raw: data.annualLease,
    icon: FiActivity,
    color: '#4ade80',
    format: (v) => formatINR(v),
  },
  {
    label: 'Monthly ROI',
    value: null,
    raw: data.monthlyROI,
    icon: FiPercent,
    color: '#60a5fa',
    format: (v) => v.toFixed(2) + '%',
  },
  {
    label: 'Yearly ROI',
    value: null,
    raw: data.yearlyROI,
    icon: FiTrendingUp,
    color: '#60a5fa',
    format: (v) => v.toFixed(2) + '%',
  },
  {
    label: 'Break Even',
    value: `${data.breakEvenYears}Y ${data.breakEvenMonths}M`,
    icon: FiClock,
    raw: null,
    color: '#f59e0b',
  },
];

const MetricsGrid = ({ data }) => {
  const items = cards(data);
  return (
    <div className="max-w-5xl mx-auto px-4 mb-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {items.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            className="metric-card"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs text-white/40 tracking-wide uppercase font-medium leading-tight">
                {card.label}
              </span>
              <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                style={{ background: `${card.color}18`, border: `1px solid ${card.color}30` }}>
                <card.icon size={11} style={{ color: card.color }} />
              </div>
            </div>
            <div className="text-lg md:text-xl font-bold" style={{ color: card.color }}>
              {card.value !== null
                ? card.value
                : <AnimatedNumber value={card.raw} format={card.format} duration={1000} />
              }
            </div>
            {card.full && (
              <div className="text-xs text-white/25 mt-1 font-mono">{card.full}</div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MetricsGrid;
