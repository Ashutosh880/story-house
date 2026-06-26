import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine,
} from 'recharts';
import { FiTrendingUp, FiLayers, FiBarChart2 } from 'react-icons/fi';
import { formatINR } from '../utils/calculations';

const GOLD = '#C9A227';
const GOLD_LIGHT = '#E8C84A';
const GREEN = '#4ade80';
const BLUE = '#60a5fa';

const tooltipStyle = {
  backgroundColor: '#1a1a1a',
  border: '1px solid rgba(201,162,39,0.3)',
  borderRadius: '10px',
  color: '#fff',
  fontSize: '12px',
  padding: '8px 12px',
};

const labelStyle = { color: 'rgba(255,255,255,0.5)', fontSize: 11 };

const formatL = (v) => {
  if (v >= 100) return '₹' + (v / 100).toFixed(1) + 'Cr';
  return '₹' + v + 'L';
};

const ChartCard = ({ title, icon: Icon, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="glass-card rounded-2xl overflow-hidden"
    style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}
  >
    <div className="px-6 py-4 flex items-center gap-3 border-b border-white/5"
      style={{ background: 'linear-gradient(90deg, rgba(201,162,39,0.06) 0%, transparent 100%)' }}>
      <div className="w-7 h-7 rounded-md flex items-center justify-center"
        style={{ background: 'rgba(201,162,39,0.12)', border: '1px solid rgba(201,162,39,0.25)' }}>
        <Icon size={13} className="text-gold" />
      </div>
      <h3 className="text-white/80 font-medium text-sm tracking-wide">{title}</h3>
    </div>
    <div className="p-5">{children}</div>
  </motion.div>
);

const Charts = ({ yearlyData, totalInvestment }) => {
  const chartData = yearlyData.map((row) => ({
    year: `Y${row.year}`,
    annualRentL: Math.round(row.annualRent / 100000),
    cumulativeRentL: Math.round(row.cumulativeRent / 100000),
    balanceL: Math.round(row.balanceInvestment / 100000),
    roi: row.roiPercent,
  }));

  const invL = Math.round(totalInvestment / 100000);

  return (
    <div className="max-w-5xl mx-auto px-4 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

        {/* Chart 1: Annual Rent Growth */}
        <ChartCard title="Annual Rent Growth" icon={FiTrendingUp} delay={0}>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="year" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={formatL} />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={labelStyle}
                formatter={(v) => ['₹' + v + ' L', 'Annual Rent']}
              />
              <Line
                type="monotone"
                dataKey="annualRentL"
                stroke={GOLD}
                strokeWidth={2.5}
                dot={{ fill: GOLD, r: 4, strokeWidth: 0 }}
                activeDot={{ fill: GOLD_LIGHT, r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart 2: Cumulative Return */}
        <ChartCard title="Cumulative Return vs Investment" icon={FiLayers} delay={0.1}>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={GREEN} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={GREEN} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="year" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={formatL} />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={labelStyle}
                formatter={(v, name) => ['₹' + v + ' L', name === 'cumulativeRentL' ? 'Cumulative Return' : 'Bal. Investment']}
              />
              <ReferenceLine
                y={invL}
                stroke={GOLD}
                strokeDasharray="4 4"
                strokeWidth={1.5}
                label={{ value: 'Investment', fill: 'rgba(201,162,39,0.6)', fontSize: 10, position: 'right' }}
              />
              <Area
                type="monotone"
                dataKey="cumulativeRentL"
                stroke={GREEN}
                strokeWidth={2}
                fill="url(#greenGrad)"
                dot={{ fill: GREEN, r: 3, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Chart 3: Investment Recovery — full width */}
      <ChartCard title="Investment Recovery Balance per Year" icon={FiBarChart2} delay={0.2}>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} barSize={36}>
            <defs>
              <linearGradient id="barGold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={GOLD_LIGHT} stopOpacity={1} />
                <stop offset="100%" stopColor={GOLD} stopOpacity={1} />
              </linearGradient>
              <linearGradient id="barGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6ee7b7" stopOpacity={1} />
                <stop offset="100%" stopColor={GREEN} stopOpacity={1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="year" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={formatL} />
            <Tooltip
              contentStyle={tooltipStyle}
              labelStyle={labelStyle}
              formatter={(v) => ['₹' + v + ' L', 'Remaining Balance']}
            />
            <Bar
              dataKey="balanceL"
              radius={[6, 6, 0, 0]}
              fill="url(#barGold)"
              background={{ fill: 'rgba(255,255,255,0.02)', radius: [6, 6, 0, 0] }}
            />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-center text-white/20 text-xs mt-2">Bars show remaining investment to recover · Reaches zero at break even</p>
      </ChartCard>
    </div>
  );
};

export default Charts;
