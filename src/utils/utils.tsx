import { z } from "zod";
import React from "react";
// Example  extractOnlyNumbers ([1, 1, 1, null, null, null], 0) => [1, 1, 1]
export const extractOnlyNumbers = (
  cardNumArray: Array<number>,
  index: number,
  length: number = 4
) => {
  return cardNumArray
    .slice(index * length, length * (index + 1))
    .filter((item: number) => typeof item === "number");
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
  creditCardSchema: z.ZodSchema<any>,
  formValues: {
    cardNum: string;
    expMonth: string;
    expYear: string;
    cardCcv: string;
    cardName: string;
  }
) => {
  const result = creditCardSchema.safeParse(formValues);
  return result.success;
};
