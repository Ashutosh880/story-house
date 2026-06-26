import React from 'react';
import { motion } from 'framer-motion';

const LoadingOverlay = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(10px)' }}
    >
      <div className="text-center">
        {/* Animated gold ring */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full"
            style={{
              border: '2px solid transparent',
              borderTopColor: '#C9A227',
              borderRightColor: 'rgba(201,162,39,0.3)',
            }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-2 rounded-full"
            style={{
              border: '1px solid transparent',
              borderTopColor: 'rgba(201,162,39,0.5)',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-gold" />
          </div>
        </div>

        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-gold text-sm tracking-[0.15em] uppercase font-medium mb-2"
        >
          Analyzing Investment
        </motion.p>
        <p className="text-white/25 text-xs tracking-wider">Generating your personalized report...</p>
      </div>
    </motion.div>
  );
};

export default LoadingOverlay;
