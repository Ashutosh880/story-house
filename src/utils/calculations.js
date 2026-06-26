import {
  STUDIO_MAP,
  COST_PER_STUDIO,
  LEASE_PER_STUDIO,
  ESCALATION_RATE,
  PROJECTION_YEARS,
} from '../data/constants';

export function calculateROI(plotSize) {
  const studios = STUDIO_MAP[plotSize];
  const totalInvestment = studios * COST_PER_STUDIO;
  const monthlyLease = studios * LEASE_PER_STUDIO;
  const annualLease = monthlyLease * 12;

  // Monthly ROI %
  const monthlyROI = (monthlyLease / totalInvestment) * 100;
  const yearlyROI = monthlyROI * 12;

  // Break even (in months, ignoring escalation for simplicity)
  const breakEvenMonths = totalInvestment / monthlyLease;
  const breakEvenYears = Math.floor(breakEvenMonths / 12);
  const breakEvenRemMonths = Math.round(breakEvenMonths % 12);

  // 7-year projection with 3% escalation
  const yearlyData = [];
  let cumulativeRent = 0;
  let currentAnnualRent = annualLease;

  for (let year = 1; year <= PROJECTION_YEARS; year++) {
    if (year > 1) {
      currentAnnualRent = currentAnnualRent * (1 + ESCALATION_RATE);
    }
    cumulativeRent += currentAnnualRent;
    const balanceInvestment = Math.max(0, totalInvestment - cumulativeRent);
    const roiPercent = (cumulativeRent / totalInvestment) * 100;

    yearlyData.push({
      year,
      annualRent: Math.round(currentAnnualRent),
      cumulativeRent: Math.round(cumulativeRent),
      balanceInvestment: Math.round(balanceInvestment),
      roiPercent: parseFloat(roiPercent.toFixed(2)),
    });
  }

  const totalReturn = yearlyData[PROJECTION_YEARS - 1].cumulativeRent;
  const profit = totalReturn - totalInvestment;

  return {
    studios,
    totalInvestment,
    monthlyLease,
    annualLease,
    monthlyROI: parseFloat(monthlyROI.toFixed(2)),
    yearlyROI: parseFloat(yearlyROI.toFixed(2)),
    breakEvenYears,
    breakEvenMonths: breakEvenRemMonths,
    yearlyData,
    totalReturn,
    profit,
  };
}

export function formatINR(amount, compact = true) {
  if (compact) {
    if (amount >= 1e7) {
      return '₹' + (amount / 1e7).toFixed(2) + ' Cr';
    }
    if (amount >= 1e5) {
      return '₹' + (amount / 1e5).toFixed(2) + ' L';
    }
  }
  return '₹' + Math.round(amount).toLocaleString('en-IN');
}

export function formatINRFull(amount) {
  return '₹' + Math.round(amount).toLocaleString('en-IN');
}
