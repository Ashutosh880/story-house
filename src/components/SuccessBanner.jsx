import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiX } from 'react-icons/fi';

const SuccessBanner = ({ show, onDismiss }) => {
  useEffect(() => {
    if (show) {
      const t = setTimeout(onDismiss, 5000);
      return () => clearTimeout(t);
    }
  }, [show, onDismiss]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="fixed top-4 left-1/2 z-40 -translate-x-1/2 w-full max-w-sm px-4"
        >
          <div className="flex items-center justify-between gap-3 rounded-xl px-4 py-3 shadow-xl"
            style={{
              background: 'rgba(20,20,20,0.95)',
              border: '1px solid rgba(74,222,128,0.4)',
              backdropFilter: 'blur(20px)',
            }}>
            <div className="flex items-center gap-2.5">
              <FiCheckCircle size={16} className="text-green-400 flex-shrink-0" />
              <span className="text-sm text-white/90 font-medium">
                Investment Report Generated Successfully
              </span>
            </div>
            <button onClick={onDismiss} className="text-white/30 hover:text-white/60 transition-colors flex-shrink-0">
              <FiX size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessBanner;
