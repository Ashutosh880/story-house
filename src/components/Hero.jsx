import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center px-6 pt-16 pb-12">
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-6"
        >
          <div className="w-6 h-[1px] bg-gold/60" />
          <span className="text-gold/70 text-xs tracking-[0.25em] font-medium uppercase">
            StayArtist Studio Pvt. Ltd.
          </span>
          <div className="w-6 h-[1px] bg-gold/60" />
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-3"
          style={{ letterSpacing: '-0.02em' }}
        >
          STORY OF THE
          <span className="block text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(135deg, #C9A227 0%, #F0D060 50%, #C9A227 100%)' }}>
            HOUSE
          </span>
        </motion.h1>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center gap-3 my-5"
        >
          <div className="w-12 h-[1px] bg-gold/40" />
          <div className="w-1.5 h-1.5 bg-gold rotate-45" />
          <div className="w-12 h-[1px] bg-gold/40" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-gold tracking-[0.2em] text-sm font-medium uppercase mb-2"
        >
          Investment Analyzer Pro
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="text-white/30 text-xs tracking-widest uppercase"
        >
          Studio Apartment ROI Projection System
        </motion.p>
      </div>
    </div>
  );
};

export default Hero;
