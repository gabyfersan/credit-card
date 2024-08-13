import { z } from "zod";
import React from "react";
import { CardInformation } from "../credit-card/types";

// Example  extractOnlyNumbers from an array ([1, 1, 1, null, null, null], 0) => [1, 1, 1]
export const extractOnlyNumbers = (
  cardNumArray: Array<number | null>,
  index: number,
  length: number = 4
) => {
  return cardNumArray
    .slice(index * length, length * (index + 1))
    .filter((item: number | null) => typeof item === "number");
};

export const checkForErrorInFormFields = (
  { name, value }: { name: string; value: string },
  setErrorState: React.Dispatch<React.SetStateAction<string | null>>,
  creditCardSchema: z.ZodSchema<any>
) => {
  const result = creditCardSchema.safeParse({
    [name]: value,
  });
  if (result.success) {
    setErrorState(null);
  } else {
    setErrorState(result.error.errors[0].message);
  }
};

export const checkAllFieldInForm = (
  creditCardSchema: z.ZodSchema<CardInformation>,
  formValues: CardInformation
) => {
  const result = creditCardSchema.safeParse(formValues);
  return result.success;
};

export type CardType = "Visa" | "MasterCard" | "Unknown";

export const luhnCheck = (cardNumber: string) => {
  let sum = 0;
  let shouldDouble = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i]);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
};

export const getCardType = (cardNumber: string): CardType => {
  if (cardRegexp.Visa.test(cardNumber)) {
    return "Visa";
  } else if (cardRegexp.MasterCard.test(cardNumber)) {
    return "MasterCard";
  } else {
    return "Unknown";
  }
};

export const cardRegexp: Record<CardType, RegExp> = {
  Visa: /^4\d{12}(\d{3})?$/,
  MasterCard: /^5[1-5]\d{14}$/,
  Unknown: /.^/,
};
