/**
 * Pure-function Ontario real-estate math.
 * Verified against:
 *  - CMHC LTV minimum-down-payment bands (gov.ca, 2025)
 *  - Ontario Land Transfer Tax brackets (Min of Finance, 2025)
 *  - Toronto Municipal LTT (intentionally NOT implemented; KW realtor)
 *  - Ontario first-time-buyer rebate (max $4,000 provincial)
 *
 * Returns plain numbers; the UI handles formatting.
 */

/**
 * CMHC minimum down payment.
 *  - Up to $500,000:        5% on full price
 *  - $500,001 to $999,999:  5% on first $500k + 10% on remainder
 *  - $1M to $1.5M:          5% / 10% bands also apply (Dec 2024 update)
 *  - $1.5M+:                20% minimum (uninsurable)
 */
export function minimumDownPayment(price: number): number {
  if (price <= 0) return 0;
  if (price >= 1_500_000) return price * 0.20;
  if (price > 500_000) {
    return 500_000 * 0.05 + (price - 500_000) * 0.10;
  }
  return price * 0.05;
}

/**
 * Monthly payment for a fixed-rate amortizing mortgage.
 * In Canada, fixed-rate mortgages are compounded semi-annually (not in advance)
 * by law, so we convert the nominal rate to an effective monthly rate via:
 *   (1 + r/2)^(2/12) - 1
 */
export function monthlyMortgagePayment(args: {
  principal: number;
  annualRatePct: number;
  amortizationYears: number;
}): number {
  const { principal, annualRatePct, amortizationYears } = args;
  if (principal <= 0 || amortizationYears <= 0) return 0;
  const periods = amortizationYears * 12;
  if (annualRatePct <= 0) return principal / periods;
  const semi = annualRatePct / 100 / 2;
  const monthlyRate = Math.pow(1 + semi, 2 / 12) - 1;
  const payment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -periods));
  return payment;
}

/**
 * Ontario provincial Land Transfer Tax (2025 brackets):
 *  - 0.5% on first $55,000
 *  - 1.0% on $55,001 – $250,000
 *  - 1.5% on $250,001 – $400,000
 *  - 2.0% on $400,001 – $2,000,000
 *  - 2.5% on portion over $2,000,000 (single-family residential)
 *
 * Toronto's municipal LTT is intentionally not handled — this site targets KW.
 */
export function ontarioLTT(price: number): number {
  if (price <= 0) return 0;
  const brackets: Array<[number, number]> = [
    [55_000, 0.005],
    [195_000, 0.01],    // 55k -> 250k
    [150_000, 0.015],   // 250k -> 400k
    [1_600_000, 0.02],  // 400k -> 2M
    [Infinity, 0.025],
  ];
  let remaining = price;
  let tax = 0;
  for (const [size, rate] of brackets) {
    const slice = Math.min(remaining, size);
    tax += slice * rate;
    remaining -= slice;
    if (remaining <= 0) break;
  }
  return tax;
}

/** First-time homebuyer rebate caps the LTT refund at $4,000. */
export function firstTimeBuyerLTTRebate(ltt: number): number {
  return Math.min(ltt, 4_000);
}

/**
 * CMHC insurance premium (rough — for educational use, not financing).
 * In Canada, CMHC mortgage default insurance is only required when the
 * loan-to-value (LTV) ratio exceeds 80% — i.e. when the down payment is
 * less than 20%. Below that, no premium applies on a conventional purchase.
 *
 * Premium tiers (CMHC purchase, 2025):
 *   LTV ≤ 80%:            0  (not required; conventional mortgage)
 *   80.01% – 85%:         2.80%
 *   85.01% – 90%:         3.10%
 *   90.01% – 95%:         4.00%
 *   > 95% (or home value > $1.5M): not insurable → 0
 *
 * The premium is added to the mortgage principal, not paid upfront.
 */
export function cmhcPremium(args: { price: number; downPayment: number }): number {
  const { price, downPayment } = args;
  if (price >= 1_500_000) return 0;
  if (downPayment >= price) return 0;
  const principal = price - downPayment;
  const ltv = principal / price;
  if (ltv <= 0.80) return 0;
  let rate = 0;
  if (ltv <= 0.85) rate = 0.028;
  else if (ltv <= 0.90) rate = 0.031;
  else if (ltv <= 0.95) rate = 0.04;
  else return 0;
  return principal * rate;
}

/**
 * Rent affordability — rule-of-thumb 30% of gross monthly income.
 * Returns the recommended max monthly rent + a verdict for a target rent.
 */
export function rentAffordability(args: { grossMonthlyIncome: number; targetMonthlyRent: number }) {
  const max = args.grossMonthlyIncome * 0.30;
  const ratio = args.targetMonthlyRent / args.grossMonthlyIncome;
  let verdict: "comfortable" | "tight" | "stretched" | "unaffordable";
  if (ratio <= 0.30) verdict = "comfortable";
  else if (ratio <= 0.35) verdict = "tight";
  else if (ratio <= 0.40) verdict = "stretched";
  else verdict = "unaffordable";
  return { maxRecommended: max, ratio, verdict };
}
