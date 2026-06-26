import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './index.css';

import Hero from './components/Hero';
import InvestorForm from './components/InvestorForm';
import LoadingOverlay from './components/LoadingOverlay';
import SuccessBanner from './components/SuccessBanner';
import MetricsGrid from './components/MetricsGrid';
import InvestmentSummary from './components/InvestmentSummary';
import ProjectionTable from './components/ProjectionTable';
import Charts from './components/Charts';
import SectionDivider from './components/SectionDivider';

import { calculateROI } from './utils/calculations';

function App() {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [investor, setInvestor] = useState(null);

  const handleGenerate = useCallback((formData) => {
    setLoading(true);
    setReportData(null);

    setTimeout(() => {
      const result = calculateROI(parseInt(formData.plot));
      result.plotSize = formData.plot;
      setInvestor(formData);
      setReportData(result);
      setLoading(false);
      setShowSuccess(true);

      setTimeout(() => {
        const el = document.getElementById('report-top');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }, 1500);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #0D0D0D 100%)' }}>
      <AnimatePresence>{loading && <LoadingOverlay />}</AnimatePresence>
      <SuccessBanner show={showSuccess} onDismiss={() => setShowSuccess(false)} />

      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div style={{
          backgroundImage: 'radial-gradient(circle, rgba(201,162,39,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          width: '100%',
          height: '100%',
        }} />
      </div>

      <div className="relative z-10">
        <Hero />

        <div className="flex items-center justify-center gap-3 px-4 mb-10">
          <div className="flex-1 max-w-xs h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.2))' }} />
          <div className="w-1 h-1 bg-gold/40 rotate-45" />
          <div className="flex-1 max-w-xs h-px" style={{ background: 'linear-gradient(270deg, transparent, rgba(201,162,39,0.2))' }} />
        </div>

        <InvestorForm onGenerate={handleGenerate} />

        <AnimatePresence>
          {reportData && (
            <motion.div
              id="report-top"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <SectionDivider label="Overview" />
              <MetricsGrid data={reportData} />

              <SectionDivider label="Investment Summary" />
              <InvestmentSummary data={reportData} investor={investor} />

              <SectionDivider label="7-Year Projection" />
              <ProjectionTable yearlyData={reportData.yearlyData} />

              <SectionDivider label="Growth Analytics" />
              <Charts yearlyData={reportData.yearlyData} totalInvestment={reportData.totalInvestment} />
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="text-center py-10 px-4 mt-6 border-t border-white/5">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-5 h-px bg-gold/30" />
            <div className="w-1 h-1 bg-gold/40 rotate-45" />
            <div className="w-5 h-px bg-gold/30" />
          </div>
          <p className="text-white/20 text-xs tracking-widest uppercase">
            Powered by StayArtist Studio Pvt. Ltd.
          </p>
          <p className="text-white/10 text-xs mt-1">Story of the House · Investment Analyzer Pro</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
