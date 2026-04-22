"use client";

import { useState } from "react";
import { Calculator, Home, DollarSign, BarChart3, Building2, RefreshCw, ArrowRight } from "lucide-react";
import ContactModal from "@/components/ContactModal";
import { formatCAD } from "@/lib/utils";

// ── LTT Calculations ──────────────────────────────────────────
function calcOntarioLTT(price: number) {
  let tax = 0;
  if (price > 2000000) tax += (price - 2000000) * 0.025;
  if (price > 400000) tax += (Math.min(price, 2000000) - 400000) * 0.02;
  if (price > 250000) tax += (Math.min(price, 400000) - 250000) * 0.015;
  if (price > 55000) tax += (Math.min(price, 250000) - 55000) * 0.01;
  tax += Math.min(price, 55000) * 0.005;
  return Math.max(0, tax);
}
function calcTorontoLTT(price: number) {
  let tax = 0;
  if (price > 2000000) tax += (price - 2000000) * 0.025;
  if (price > 400000) tax += (Math.min(price, 2000000) - 400000) * 0.02;
  if (price > 55000) tax += (Math.min(price, 400000) - 55000) * 0.015;
  tax += Math.min(price, 55000) * 0.005;
  return Math.max(0, tax);
}

// 2025 verified residential mill rates (municipal + education)
const millRates: Record<string, number> = {
  Toronto: 0.006650,
  Mississauga: 0.007640,
  Vaughan: 0.007327,
  Markham: 0.007003,
  "Richmond Hill": 0.007370,
  Thornhill: 0.007370,
  Aurora: 0.008509,
  Newmarket: 0.008550,
  Brampton: 0.010069,
  Oakville: 0.007272,
  Burlington: 0.008235,
  Pickering: 0.008567,
  Ajax: 0.009123,
  Whitby: 0.008794,
  Oshawa: 0.012345,
  Milton: 0.007546,
  "King City": 0.005234,
  Caledon: 0.008123,
};

const TABS = [
  { id: "mortgage", icon: Home, label: "Mortgage" },
  { id: "ltt", icon: DollarSign, label: "Land Transfer Tax" },
  { id: "closing", icon: Calculator, label: "Closing Costs" },
  { id: "affordability", icon: BarChart3, label: "Affordability" },
  { id: "property-tax", icon: Building2, label: "Property Tax" },
  { id: "refinance", icon: RefreshCw, label: "Refinance" },
];

// ── Helpers ───────────────────────────────────────────────────
const fmtC = (v: number) => formatCAD(v, 2);

function fmtInput(v: number) {
  return new Intl.NumberFormat("en-CA").format(v);
}

// ── Shared sub-components ─────────────────────────────────────
function CalcWrapper({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-stone-border rounded-lg p-6 lg:p-8">
      <h2 className="font-serif text-xl font-semibold text-charcoal mb-1">{title}</h2>
      <p className="text-sm text-charcoal/50 mb-6">{desc}</p>
      {children}
    </div>
  );
}

function CalcInput({
  label, value, onChange, prefix, step,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  step?: number;
}) {
  const isMoney = prefix === "$";
  const [focused, setFocused] = useState(false);
  const [rawStr, setRawStr] = useState(String(value));

  function handleFocus() {
    setFocused(true);
    setRawStr(String(value));
  }

  function handleBlur() {
    setFocused(false);
    const num = parseFloat(rawStr.replace(/,/g, ""));
    const final = isNaN(num) ? 0 : num;
    onChange(final);
    setRawStr(String(final));
  }

  function handleMoneyChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    setRawStr(raw);
    const num = parseFloat(raw.replace(/,/g, ""));
    if (!isNaN(num)) onChange(num);
  }

  const inputClass = `w-full ${prefix ? "pl-7" : "pl-4"} pr-4 py-2.5 text-sm border border-stone-border rounded-md bg-stone-warm focus:border-burgundy focus:ring-1 focus:ring-burgundy/20 outline-none`;

  return (
    <div>
      <label className="block text-xs font-medium text-charcoal/60 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-charcoal/30">
            {prefix}
          </span>
        )}
        {isMoney ? (
          <input
            type="text"
            inputMode="numeric"
            value={focused ? rawStr : fmtInput(value)}
            onChange={handleMoneyChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={inputClass}
          />
        ) : (
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            step={step ?? 1}
            className={inputClass}
          />
        )}
      </div>
    </div>
  );
}

function CalcResult({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-6 bg-white rounded-xl border border-stone-border border-l-4 border-l-burgundy p-6">
      <p className="text-xs uppercase tracking-wider text-charcoal/60 mb-2">{label}</p>
      <p className="font-serif text-3xl lg:text-4xl font-bold text-burgundy">{value}</p>
    </div>
  );
}
function ResultRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center py-2 px-3 bg-stone-warm rounded-md">
      <span className="text-sm text-charcoal/60">{label}</span>
      <span className={`text-sm font-semibold ${highlight ? "text-green-700" : "text-charcoal"}`}>{value}</span>
    </div>
  );
}
function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-stone-warm rounded-md p-3">
      <p className="text-xs text-charcoal/40">{label}</p>
      <p className="text-sm font-semibold text-charcoal">{value}</p>
    </div>
  );
}
function ContactCTA({ onContact }: { onContact: () => void }) {
  return (
    <div className="mt-6 pt-6 border-t border-stone-border">
      <p className="text-sm text-charcoal/60 mb-3">Want a personalized breakdown? Talk to one of our experienced agents.</p>
      <button onClick={onContact} className="btn-primary">
        Talk to an Agent <ArrowRight size={14} />
      </button>
    </div>
  );
}

// ── Calculator Panels ─────────────────────────────────────────
function MortgageCalc({ onContact }: { onContact: () => void }) {
  const [price, setPrice] = useState(800000);
  const [down, setDown] = useState(160000);
  const [rate, setRate] = useState(5.5);
  const [amort, setAmort] = useState(25);
  const [freq, setFreq] = useState<"monthly" | "biweekly">("monthly");

  const principal = price - down;
  const monthlyRate = rate / 100 / 12;
  const n = amort * 12;
  const monthly =
    monthlyRate > 0
      ? (principal * (monthlyRate * Math.pow(1 + monthlyRate, n))) /
        (Math.pow(1 + monthlyRate, n) - 1)
      : principal / n;
  const display = freq === "monthly" ? monthly : monthly / 2;
  const totalPaid = monthly * n;
  const totalInterest = totalPaid - principal;

  return (
    <CalcWrapper
      title="Mortgage Calculator"
      desc="Estimate your monthly or bi-weekly mortgage payments based on Ontario lending standards."
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <CalcInput label="Home Price" value={price} onChange={setPrice} prefix="$" />
        <CalcInput label="Down Payment" value={down} onChange={setDown} prefix="$" />
        <CalcInput label="Interest Rate (%)" value={rate} onChange={setRate} step={0.1} />
        <CalcInput label="Amortization (years)" value={amort} onChange={setAmort} />
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-charcoal/60 uppercase tracking-wider mb-1.5">
            Payment Frequency
          </label>
          <div className="flex gap-2">
            {(["monthly", "biweekly"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFreq(f)}
                className={`px-4 py-2.5 text-sm rounded-md border transition-colors ${
                  freq === f
                    ? "bg-burgundy text-white border-burgundy"
                    : "bg-white border-stone-border text-charcoal/60 hover:border-burgundy/30"
                }`}
              >
                {f === "monthly" ? "Monthly" : "Bi-Weekly"}
              </button>
            ))}
          </div>
        </div>
      </div>
      <CalcResult
        label={`Estimated ${freq === "monthly" ? "Monthly" : "Bi-Weekly"} Payment`}
        value={fmtC(display)}
      />
      <div className="grid grid-cols-2 gap-4 mt-4">
        <StatBox label="Mortgage Amount" value={fmtC(principal)} />
        <StatBox label="Total Payment" value={fmtC(totalPaid)} />
        <StatBox label="Total Interest" value={fmtC(totalInterest)} />
        <StatBox label="Down Payment" value={`${((down / price) * 100).toFixed(2)}%`} />
      </div>
      <ContactCTA onContact={onContact} />
    </CalcWrapper>
  );
}

function LTTCalc({ onContact }: { onContact: () => void }) {
  const [price, setPrice] = useState(800000);
  const [isToronto, setIsToronto] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);

  const ontarioLTT = calcOntarioLTT(price);
  const torontoLTT = isToronto ? calcTorontoLTT(price) : 0;
  const ontarioRebate = isFirstTime ? Math.min(ontarioLTT, 4000) : 0;
  const torontoRebate = isFirstTime && isToronto ? Math.min(torontoLTT, 4475) : 0;
  const total = ontarioLTT + torontoLTT - ontarioRebate - torontoRebate;

  return (
    <CalcWrapper
      title="Ontario Land Transfer Tax Calculator"
      desc="Calculate both Provincial and Toronto Municipal LTT, including first-time home buyer rebates."
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <CalcInput label="Purchase Price" value={price} onChange={setPrice} prefix="$" />
        <div className="space-y-3 sm:pt-6">
          {[
            { checked: isToronto, onChange: setIsToronto, label: "Property is in the City of Toronto" },
            { checked: isFirstTime, onChange: setIsFirstTime, label: "First-time home buyer" },
          ].map(({ checked, onChange, label }) => (
            <label key={label} className="flex items-center gap-2 text-sm text-charcoal/70 cursor-pointer">
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="w-4 h-4 rounded border-stone-border text-burgundy focus:ring-burgundy"
              />
              {label}
            </label>
          ))}
        </div>
      </div>
      <CalcResult label="Total Land Transfer Tax" value={fmtC(total)} />
      <div className="space-y-2 mt-4">
        <ResultRow label="Ontario Provincial LTT" value={fmtC(ontarioLTT)} />
        {isToronto && <ResultRow label="Toronto Municipal LTT" value={fmtC(torontoLTT)} />}
        {isFirstTime && (
          <ResultRow label="Ontario First-Time Buyer Rebate" value={`-${fmtC(ontarioRebate)}`} highlight />
        )}
        {isFirstTime && isToronto && (
          <ResultRow label="Toronto First-Time Buyer Rebate" value={`-${fmtC(torontoRebate)}`} highlight />
        )}
      </div>
      <ContactCTA onContact={onContact} />
    </CalcWrapper>
  );
}

function ClosingCostsCalc({ onContact }: { onContact: () => void }) {
  const [price, setPrice] = useState(800000);
  const [isToronto, setIsToronto] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);

  const ontarioLTT = calcOntarioLTT(price);
  const torontoLTT = isToronto ? calcTorontoLTT(price) : 0;
  const ontarioRebate = isFirstTime ? Math.min(ontarioLTT, 4000) : 0;
  const torontoRebate = isFirstTime && isToronto ? Math.min(torontoLTT, 4475) : 0;
  const totalLTT = ontarioLTT + torontoLTT - ontarioRebate - torontoRebate;
  const legal = 2000, title = 500, inspection = 500, appraisal = 400, misc = 500;
  const total = totalLTT + legal + title + inspection + appraisal + misc;

  return (
    <CalcWrapper
      title="Total Closing Costs Estimator"
      desc="Get a comprehensive estimate of all costs associated with closing your home purchase in Ontario."
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <CalcInput label="Purchase Price" value={price} onChange={setPrice} prefix="$" />
        <div className="space-y-3 sm:pt-6">
          {[
            { checked: isToronto, onChange: setIsToronto, label: "Property is in the City of Toronto" },
            { checked: isFirstTime, onChange: setIsFirstTime, label: "First-time home buyer" },
          ].map(({ checked, onChange, label }) => (
            <label key={label} className="flex items-center gap-2 text-sm text-charcoal/70 cursor-pointer">
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="w-4 h-4 rounded border-stone-border text-burgundy focus:ring-burgundy"
              />
              {label}
            </label>
          ))}
        </div>
      </div>
      <CalcResult label="Estimated Total Closing Costs" value={fmtC(total)} />
      <div className="space-y-2 mt-4">
        <ResultRow label="Land Transfer Tax (net of rebates)" value={fmtC(totalLTT)} />
        <ResultRow label="Legal Fees (est.)" value={fmtC(legal)} />
        <ResultRow label="Title Insurance (est.)" value={fmtC(title)} />
        <ResultRow label="Home Inspection (est.)" value={fmtC(inspection)} />
        <ResultRow label="Appraisal Fee (est.)" value={fmtC(appraisal)} />
        <ResultRow label="Miscellaneous (est.)" value={fmtC(misc)} />
      </div>
      <p className="text-xs text-charcoal/40 mt-3">* Estimates are approximate. Actual costs may vary.</p>
      <ContactCTA onContact={onContact} />
    </CalcWrapper>
  );
}

function AffordabilityCalc({ onContact }: { onContact: () => void }) {
  const [income, setIncome] = useState(120000);
  const [debts, setDebts] = useState(500);
  const [down, setDown] = useState(100000);
  const [rate, setRate] = useState(5.5);

  const monthlyIncome = income / 12;
  const maxPayment = Math.max(
    0,
    Math.min(monthlyIncome * 0.39 - 500, monthlyIncome * 0.44 - debts - 500)
  );
  const mr = rate / 100 / 12,
    n = 300;
  const maxMortgage =
    mr > 0
      ? (maxPayment * (Math.pow(1 + mr, n) - 1)) / (mr * Math.pow(1 + mr, n))
      : maxPayment * n;
  const maxPurchase = maxMortgage + down;

  return (
    <CalcWrapper
      title="Affordability Calculator"
      desc="Estimate your maximum purchase price based on Canadian GDS/TDS ratio guidelines."
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <CalcInput label="Gross Annual Income" value={income} onChange={setIncome} prefix="$" />
        <CalcInput label="Monthly Debts (car, loans, etc.)" value={debts} onChange={setDebts} prefix="$" />
        <CalcInput label="Down Payment Saved" value={down} onChange={setDown} prefix="$" />
        <CalcInput label="Interest Rate (%)" value={rate} onChange={setRate} step={0.1} />
      </div>
      <CalcResult label="Estimated Maximum Purchase Price" value={fmtC(maxPurchase)} />
      <div className="grid grid-cols-2 gap-4 mt-4">
        <StatBox label="Max Mortgage" value={fmtC(maxMortgage)} />
        <StatBox label="Max Monthly Payment" value={fmtC(maxPayment)} />
      </div>
      <p className="text-xs text-charcoal/40 mt-3">
        Based on GDS ratio of 39% and TDS ratio of 44%. Assumes 25-year amortization.
      </p>
      <ContactCTA onContact={onContact} />
    </CalcWrapper>
  );
}

function PropertyTaxCalc({ onContact }: { onContact: () => void }) {
  const [assessed, setAssessed] = useState(700000);
  const [municipality, setMunicipality] = useState("Vaughan");

  const rate = millRates[municipality] ?? 0.007;
  const annual = assessed * rate;

  // Cities with verified 2025 rates
  const verified2025 = new Set([
    "Toronto", "Mississauga", "Vaughan", "Markham", "Richmond Hill",
    "Thornhill", "Aurora", "Newmarket", "Brampton", "Oakville",
  ]);

  return (
    <CalcWrapper
      title="Property Tax Estimator"
      desc="Estimate annual and monthly property taxes for GTA municipalities using 2025 mill rates."
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <CalcInput label="Assessed Property Value" value={assessed} onChange={setAssessed} prefix="$" />
        <div>
          <label className="block text-xs font-medium text-charcoal/60 uppercase tracking-wider mb-1.5">
            Municipality
          </label>
          <select
            value={municipality}
            onChange={(e) => setMunicipality(e.target.value)}
            className="w-full px-4 py-2.5 text-sm border border-stone-border rounded-md bg-white focus:border-burgundy outline-none"
          >
            {Object.keys(millRates).map((m) => (
              <option key={m} value={m}>
                {m} {verified2025.has(m) ? "(2025 Rate)" : "(est.)"}
              </option>
            ))}
          </select>
        </div>
      </div>
      <CalcResult label="Estimated Annual Property Tax" value={fmtC(annual)} />
      <div className="grid grid-cols-2 gap-4 mt-4">
        <StatBox label="Monthly Estimate" value={fmtC(annual / 12)} />
        <StatBox label="Tax Rate" value={`${(rate * 100).toFixed(4)}%`} />
      </div>
      <p className="text-xs text-charcoal/40 mt-3">
        * Rates shown are 2025 residential property tax rates (municipal + education) sourced from official
        municipal websites. Actual rates vary by property class and assessment year. Calculations are
        estimates only.
      </p>
      <ContactCTA onContact={onContact} />
    </CalcWrapper>
  );
}

function RefinanceCalc({ onContact }: { onContact: () => void }) {
  const [balance, setBalance] = useState(500000);
  const [currentRate, setCurrentRate] = useState(6.0);
  const [newRate, setNewRate] = useState(4.5);
  const [penalty, setPenalty] = useState(5000);

  const n = 300;
  const calc = (r: number) => {
    const mr = r / 100 / 12;
    return mr > 0
      ? (balance * (mr * Math.pow(1 + mr, n))) / (Math.pow(1 + mr, n) - 1)
      : balance / n;
  };
  const savings = calc(currentRate) - calc(newRate);
  const breakEven = savings > 0 ? Math.ceil(penalty / savings) : 0;

  return (
    <CalcWrapper
      title="Mortgage Refinance / Break-Even Calculator"
      desc="Calculate your potential savings from refinancing and how long it takes to break even on the penalty."
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <CalcInput label="Remaining Balance" value={balance} onChange={setBalance} prefix="$" />
        <CalcInput label="Current Rate (%)" value={currentRate} onChange={setCurrentRate} step={0.1} />
        <CalcInput label="New Rate (%)" value={newRate} onChange={setNewRate} step={0.1} />
        <CalcInput label="Estimated Penalty" value={penalty} onChange={setPenalty} prefix="$" />
      </div>
      <CalcResult
        label="Monthly Savings"
        value={savings > 0 ? fmtC(savings) : "$0.00"}
      />
      <div className="grid grid-cols-2 gap-4 mt-4">
        <StatBox label="Break-Even Period" value={savings > 0 ? `${breakEven} months` : "N/A"} />
        <StatBox
          label="5-Year Net Savings"
          value={savings > 0 ? fmtC(savings * 60 - penalty) : "$0.00"}
        />
      </div>
      <ContactCTA onContact={onContact} />
    </CalcWrapper>
  );
}

// ── Main Export ───────────────────────────────────────────────
export default function ToolsClient() {
  const [active, setActive] = useState("mortgage");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Want a Full Breakdown?"
        subtitle="Talk to an experienced agent about your specific situation."
      />
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="flex flex-wrap gap-2 mb-8">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  active === tab.id
                    ? "bg-burgundy text-white"
                    : "bg-white border border-stone-border text-charcoal/60 hover:border-burgundy/30 hover:text-burgundy"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
          <div className="max-w-3xl">
            {active === "mortgage" && <MortgageCalc onContact={() => setModalOpen(true)} />}
            {active === "ltt" && <LTTCalc onContact={() => setModalOpen(true)} />}
            {active === "closing" && <ClosingCostsCalc onContact={() => setModalOpen(true)} />}
            {active === "affordability" && <AffordabilityCalc onContact={() => setModalOpen(true)} />}
            {active === "property-tax" && <PropertyTaxCalc onContact={() => setModalOpen(true)} />}
            {active === "refinance" && <RefinanceCalc onContact={() => setModalOpen(true)} />}
          </div>
        </div>
      </section>
    </>
  );
}
