import { RecipeDifficulty } from "@prisma/client"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { intervalToDuration } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRecipeDifficulty(difficulty: RecipeDifficulty) {
  if (difficulty === RecipeDifficulty.EASY)
    return "Fácil";
  else if (difficulty === RecipeDifficulty.INTERMEDIARY)
    return "Intermediário";
  else
    return "Difícil";
}


export function formatMinutes(mins: number) {
  const duration = intervalToDuration({ start: 0, end: mins * 60 * 1000 });
  const { hours = 0, minutes = 0 } = duration;

  if (hours === 0) return `${minutes}min`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}min`;
}

/**
 * Formats a price value to Brazilian Real currency format.
 *
 * BUSINESS RULE: Products without prices should prompt customers to contact the producer.
 * This supports gradual price adoption as producers transition to the platform.
 *
 * @param price - Price as Decimal/number or null
 * @returns Formatted string "R$ 10,95" or "Consulte o produtor" if null
 */
export function formatPrice(price: number | null): string {
  if (price === null || price === undefined) {
    return "Consulte a produtora";
  }

  const numericPrice = typeof price === "number" ? price : Number(price);

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numericPrice);
}

