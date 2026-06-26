import React from 'react';
import { motion } from 'framer-motion';

const SectionDivider = ({ label }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="max-w-5xl mx-auto px-4 mb-5"
  >
    <div className="flex items-center gap-3">
      <div className="w-1 h-4 rounded-full bg-gold" />
      <span className="text-xs text-white/30 tracking-[0.15em] uppercase font-medium">{label}</span>
      <div className="flex-1 h-px bg-white/5" />
    </div>
  </motion.div>
);

export default SectionDivider;
