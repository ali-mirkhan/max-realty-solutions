import { ShieldCheck } from "lucide-react";

export default function CommissionProtectionNotice() {
  return (
    <div className="bg-stone-light border-l-4 border-burgundy rounded-r-lg px-5 py-4 flex gap-3 items-start">
      <ShieldCheck size={18} className="text-burgundy mt-0.5 shrink-0" />
      <div>
        <p className="text-sm font-semibold text-charcoal mb-1">
          Cooperating Brokerage Commission Protected
        </p>
        <p className="text-xs text-charcoal/70 leading-relaxed">
          Licensed buyer representatives who register their qualified client through this form
          will have their cooperating commission protected per standard TRESA guidelines.
          Commission amount will be confirmed during the offer stage.
        </p>
      </div>
    </div>
  );
}
