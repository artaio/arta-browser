export interface MonthlyEstimateInput {
  totalPrice: number;
  // ISO 4217 code used only to label the result; defaults to USD.
  currency?: string;
}

export interface MonthlyEstimate {
  amountPerMonth: number;
  amountPerMonthCurrency: string;
}

const MINIMUM_DEPOSIT_RATIO = 0.1;
const FLAT_FEE_RATE = 0.125;
const INSTALLMENT_COUNT = 9;

// A lightweight "from $X/mo" estimate for placements and CTAs, mirroring the
// checkout slider's math (Buyers.ArtaPay.DepositMath + FinancingPreview): the
// minimum 10% deposit, a flat 12.5% finance charge on the financed amount, split
// over 9 monthly payments, and rounded up to the next whole dollar as shown in
// the interface. Computed in integer cents to avoid floating-point drift. The
// checkout shows the buyer's exact, quoted schedule.
//
// Async on purpose: the rates above are a copy of the server's model, and this
// is meant to move behind an API call so the two cannot drift. Returning a
// promise now means that move is an implementation change rather than a
// breaking one for callers.
export const monthlyEstimate = async (
  input: MonthlyEstimateInput
): Promise<MonthlyEstimate> => {
  const currency = input.currency || 'USD';
  const totalCents = Math.round(input.totalPrice * 100);

  if (!isFinite(totalCents) || totalCents <= 0) {
    return { amountPerMonth: 0, amountPerMonthCurrency: currency };
  }

  const minDepositCents = Math.ceil(totalCents * MINIMUM_DEPOSIT_RATIO);
  const financedCents = totalCents - minDepositCents;
  const financeChargeCents = Math.round(financedCents * FLAT_FEE_RATE);
  const principalCents = Math.round(financedCents / INSTALLMENT_COUNT);
  const feeCents = Math.round(financeChargeCents / INSTALLMENT_COUNT);
  const monthlyCents = principalCents + feeCents;

  return {
    amountPerMonth: Math.ceil(monthlyCents / 100),
    amountPerMonthCurrency: currency,
  };
};
