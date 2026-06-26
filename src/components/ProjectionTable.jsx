import React from 'react';
import { motion } from 'framer-motion';
import { FiTable, FiCheckCircle } from 'react-icons/fi';
import { formatINRFull } from '../utils/calculations';

const ProjectionTable = ({ yearlyData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="max-w-5xl mx-auto px-4 mb-10"
    >
      <div className="glass-card rounded-2xl overflow-hidden"
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>

        {/* Header */}
        <div className="px-6 py-4 flex items-center gap-3 border-b border-white/5"
          style={{ background: 'linear-gradient(90deg, rgba(201,162,39,0.08) 0%, transparent 100%)' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(201,162,39,0.15)', border: '1px solid rgba(201,162,39,0.3)' }}>
            <FiTable size={14} className="text-gold" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wide">7-Year Projection</h3>
            <p className="text-white/30 text-xs mt-0.5">Annual rent with 3% escalation · All values in INR</p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {['Year', 'Annual Rent', 'Cumulative Rent', 'Balance Investment', 'ROI %'].map((col) => (
                  <th key={col}
                    className="px-5 py-3.5 text-left text-xs text-white/30 tracking-[0.1em] uppercase font-medium">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {yearlyData.map((row, i) => {
                const isRecovered = row.balanceInvestment === 0;
                return (
                  <motion.tr
                    key={row.year}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    className="border-b border-white/[0.04] last:border-0 transition-colors duration-150"
                    style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,162,39,0.04)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)'; }}
                  >
                    <td className="px-5 py-4">
                      <span className="font-semibold text-sm text-gold">Year {row.year}</span>
                    </td>
                    <td className="px-5 py-4 text-sm text-white/80 font-mono">
                      {formatINRFull(row.annualRent)}
                    </td>
                    <td className="px-5 py-4 text-sm text-white/80 font-mono">
                      {formatINRFull(row.cumulativeRent)}
                    </td>
                    <td className="px-5 py-4 text-sm">
                      {isRecovered ? (
                        <span className="flex items-center gap-1.5 text-green-400 font-medium">
                          <FiCheckCircle size={13} />
                          Recovered
                        </span>
                      ) : (
                        <span className="text-white/60 font-mono">{formatINRFull(row.balanceInvestment)}</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 rounded-full bg-white/10 flex-1 max-w-[60px] overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: `${Math.min(row.roiPercent, 100)}%`,
                              background: 'linear-gradient(90deg, #C9A227, #E8C84A)',
                            }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gold tabular-nums">
                          {row.roiPercent.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectionTable;
