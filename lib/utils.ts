import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCAD(amount: number, decimals = 0): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(amount);
}

export function formatPrice(price: number, type: string, status: string): string {
  if (type === "commercial" && status === "For Lease") {
    return `$${price}/sq ft`;
  }
  return formatCAD(price);
}
