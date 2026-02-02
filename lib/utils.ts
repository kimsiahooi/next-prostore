import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import z, { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function converToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split(".");

  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
}

export function formatError(error: ZodError | unknown) {
  if (error instanceof ZodError) {
    return Object.values(z.flattenError(error).fieldErrors).join(". ");
  }

  return JSON.stringify(error);
}

export function round2(value: number | string) {
  return Math.round(((Number(value) + Number.EPSILON) * 100) / 100);
}
