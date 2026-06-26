import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiPhone, FiMail, FiMapPin, FiMaximize, FiTrendingUp } from 'react-icons/fi';
import { PLOT_OPTIONS } from '../data/constants';

const InputField = ({ label, icon: Icon, id, type = 'text', placeholder, value, onChange, required }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-xs text-white/40 tracking-[0.12em] uppercase font-medium flex items-center gap-1.5">
      <Icon size={11} className="text-gold/60" />
      {label}
    </label>
    <input
      id={id}
      type={type}
      className="input-field text-sm"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

const InvestorForm = ({ onGenerate }) => {
  const [form, setForm] = useState({ name: '', mobile: '', email: '', location: '', plot: '' });
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = true;
    if (!form.mobile.trim()) errs.mobile = true;
    if (!form.email.trim()) errs.email = true;
    if (!form.location.trim()) errs.location = true;
    if (!form.plot) errs.plot = true;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onGenerate(form);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="max-w-2xl mx-auto px-4 mb-12"
    >
      <form
        onSubmit={handleSubmit}
        className="glass-card rounded-2xl p-6 md:p-8"
        style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,162,39,0.1)' }}
      >
        {/* Card header */}
        <div className="flex items-center gap-3 mb-7">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(201,162,39,0.15)', border: '1px solid rgba(201,162,39,0.3)' }}>
            <FiUser size={14} className="text-gold" />
          </div>
          <div>
            <h2 className="text-white font-semibold text-base tracking-wide">Investor Information</h2>
            <p className="text-white/30 text-xs mt-0.5">Fill in your details to generate your personalized report</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={errors.name ? 'ring-1 ring-red-500/50 rounded-lg' : ''}>
            <InputField label="Full Name" icon={FiUser} id="name" placeholder="Rajesh Kumar" value={form.name} onChange={set('name')} />
          </div>
          <div className={errors.mobile ? 'ring-1 ring-red-500/50 rounded-lg' : ''}>
            <InputField label="Mobile Number" icon={FiPhone} id="mobile" type="tel" placeholder="+91 98765 43210" value={form.mobile} onChange={set('mobile')} />
          </div>
          <div className={errors.email ? 'ring-1 ring-red-500/50 rounded-lg' : ''}>
            <InputField label="Email Address" icon={FiMail} id="email" type="email" placeholder="rajesh@example.com" value={form.email} onChange={set('email')} />
          </div>
          <div className={errors.location ? 'ring-1 ring-red-500/50 rounded-lg' : ''}>
            <InputField label="Project Location" icon={FiMapPin} id="location" placeholder="Bangalore, Karnataka" value={form.location} onChange={set('location')} />
          </div>

          {/* Plot size full width */}
          <div className={`md:col-span-2 ${errors.plot ? 'ring-1 ring-red-500/50 rounded-lg' : ''}`}>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="plot" className="text-xs text-white/40 tracking-[0.12em] uppercase font-medium flex items-center gap-1.5">
                <FiMaximize size={11} className="text-gold/60" />
                Plot Size
              </label>
              <select
                id="plot"
                className="input-field text-sm"
                value={form.plot}
                onChange={set('plot')}
              >
                {PLOT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 my-6" />

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-4 rounded-xl font-semibold text-sm tracking-[0.12em] uppercase transition-all duration-200 flex items-center justify-center gap-2.5"
          style={{
            background: 'linear-gradient(135deg, #C9A227 0%, #E8C84A 50%, #C9A227 100%)',
            color: '#0A0A0A',
            boxShadow: '0 4px 20px rgba(201,162,39,0.3)',
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 30px rgba(201,162,39,0.5)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(201,162,39,0.3)'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <FiTrendingUp size={16} />
          Generate ROI Report
        </button>
      </form>
    </motion.div>
  );
};

export default InvestorForm;
