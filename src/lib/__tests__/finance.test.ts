import { describe, expect, it } from "vitest";
import {
  cmhcPremium,
  firstTimeBuyerLTTRebate,
  minimumDownPayment,
  monthlyMortgagePayment,
  ontarioLTT,
  rentAffordability,
} from "@/lib/finance";

describe("minimumDownPayment", () => {
  it("requires 5% on homes under $500k", () => {
    expect(minimumDownPayment(400_000)).toBe(20_000);
    expect(minimumDownPayment(500_000)).toBe(25_000);
  });

  it("uses tiered 5%/10% between $500k and $1.5M", () => {
    // $700k -> 5% of $500k + 10% of $200k = $25k + $20k = $45k
    expect(minimumDownPayment(700_000)).toBe(45_000);
    expect(minimumDownPayment(999_999)).toBeCloseTo(74_999.9, 1);
  });

  it("requires 20% on $1.5M+", () => {
    expect(minimumDownPayment(1_500_000)).toBe(300_000);
    expect(minimumDownPayment(2_000_000)).toBe(400_000);
  });
});

describe("monthlyMortgagePayment", () => {
  it("returns 0 for zero principal", () => {
    expect(monthlyMortgagePayment({ principal: 0, annualRatePct: 5, amortizationYears: 25 })).toBe(0);
  });

  it("matches a known Canadian semi-annually-compounded calculation", () => {
    // $500k at 5% over 25 years should be ~$2,908/mo (Canadian convention)
    const m = monthlyMortgagePayment({
      principal: 500_000,
      annualRatePct: 5,
      amortizationYears: 25,
    });
    expect(m).toBeGreaterThan(2_900);
    expect(m).toBeLessThan(2_920);
  });

  it("handles zero rate as simple division", () => {
    const m = monthlyMortgagePayment({ principal: 240_000, annualRatePct: 0, amortizationYears: 20 });
    // 240k / 240 months = $1,000
    expect(m).toBe(1_000);
  });
});

describe("ontarioLTT", () => {
  it("computes a known case", () => {
    // $400k -> 0.5%*55k + 1%*195k + 1.5%*150k
    // = 275 + 1950 + 2250 = 4475
    expect(ontarioLTT(400_000)).toBe(4_475);
  });

  it("hits the top bracket on $2.5M+", () => {
    // first 55k: 275; next 195k @ 1%: 1950; next 150k @ 1.5%: 2250;
    // next 1.6M @ 2%: 32000; portion >2M (500k) @ 2.5%: 12500
    // total = 48975
    expect(ontarioLTT(2_500_000)).toBe(48_975);
  });

  it("returns 0 for zero or negative", () => {
    expect(ontarioLTT(0)).toBe(0);
    expect(ontarioLTT(-100)).toBe(0);
  });
});

describe("firstTimeBuyerLTTRebate", () => {
  it("caps the rebate at $4,000", () => {
    expect(firstTimeBuyerLTTRebate(2_000)).toBe(2_000);
    expect(firstTimeBuyerLTTRebate(10_000)).toBe(4_000);
  });
});

describe("cmhcPremium", () => {
  it("returns 0 above $1.5M (uninsurable)", () => {
    expect(cmhcPremium({ price: 1_600_000, downPayment: 320_000 })).toBe(0);
  });

  it("scales by LTV band", () => {
    // $500k home, 5% down ($25k) -> LTV 95% -> 4% premium on $475k = $19,000
    expect(cmhcPremium({ price: 500_000, downPayment: 25_000 })).toBe(19_000);
  });
});

describe("rentAffordability", () => {
  it("flags <=30% as comfortable", () => {
    const r = rentAffordability({ grossMonthlyIncome: 7_000, targetMonthlyRent: 2_000 });
    expect(r.verdict).toBe("comfortable");
  });

  it("flags >40% as unaffordable", () => {
    const r = rentAffordability({ grossMonthlyIncome: 4_000, targetMonthlyRent: 2_000 });
    expect(r.verdict).toBe("unaffordable");
  });
});
