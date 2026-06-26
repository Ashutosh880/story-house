import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiArrowRight } from 'react-icons/fi';
import { formatINRFull, formatINR } from '../utils/calculations';

const Row = ({ label, value, highlight, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="flex items-center justify-between py-3.5 border-b border-white/5 last:border-0"
  >
    <span className="text-white/50 text-sm">{label}</span>
    <span className={`font-semibold text-sm ${highlight === 'gold' ? 'text-gold' : highlight === 'green' ? 'text-green-400' : 'text-white'}`}>
      {value}
    </span>
  </motion.div>
);

const InvestmentSummary = ({ data, investor }) => {
  const rows = [
    { label: 'Project Size', value: data.plotSize + ' Sqft' },
    { label: 'Total Studios', value: data.studios + ' Units' },
    { label: 'Total Investment', value: formatINRFull(data.totalInvestment), highlight: 'gold' },
    { label: 'Monthly Lease Income', value: formatINRFull(data.monthlyLease), highlight: 'gold' },
    { label: 'Annual Lease Income', value: formatINRFull(data.annualLease), highlight: 'gold' },
    { label: 'Monthly ROI', value: data.monthlyROI + '%' },
    { label: 'Yearly ROI', value: data.yearlyROI + '%' },
    {
      label: 'Expected Break Even',
      value: `${data.breakEvenYears} Years ${data.breakEvenMonths} Months`,
      highlight: 'gold',
    },
    { label: 'Year 7 Total Return', value: formatINRFull(data.totalReturn), highlight: 'green' },
    { label: 'Net Profit (7 Years)', value: formatINRFull(data.profit), highlight: 'green' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-4 mb-10"
    >
      <div className="glass-card rounded-2xl overflow-hidden"
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>

        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-white/5"
          style={{ background: 'linear-gradient(90deg, rgba(201,162,39,0.08) 0%, transparent 100%)' }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(201,162,39,0.15)', border: '1px solid rgba(201,162,39,0.3)' }}>
              <FiAward size={14} className="text-gold" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm tracking-wide">Investment Summary</h3>
              {investor?.name && (
                <p className="text-white/30 text-xs mt-0.5">Prepared for {investor.name}</p>
              )}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-xs text-white/20">
            <span>{investor?.location || 'India'}</span>
            <FiArrowRight size={10} />
            <span className="text-gold/50">7-Year Projection</span>
          </div>
        </div>

        {/* Summary rows */}
        <div className="px-6 py-2">
          {rows.map((row, i) => (
            <Row key={row.label} {...row} delay={i * 0.05} />
          ))}
        </div>

        {/* Profit highlight banner */}
        <div className="mx-6 mb-6 mt-2 rounded-xl p-4 flex items-center justify-between"
          style={{ background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.2)' }}>
          <div>
            <p className="text-green-400/70 text-xs uppercase tracking-wider font-medium mb-0.5">7-Year Net Profit</p>
            <p className="text-green-400 text-2xl font-bold">{formatINR(data.profit)}</p>
          </div>
          <div className="text-right">
            <p className="text-white/30 text-xs uppercase tracking-wider mb-0.5">Overall ROI</p>
            <p className="text-white text-xl font-bold">{((data.profit / data.totalInvestment) * 100).toFixed(1)}%</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InvestmentSummary;
