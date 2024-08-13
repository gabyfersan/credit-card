import { z } from "zod";
import {
  luhnCheck,
  getCardType,
  cardRegexp,
} from "../../utils/utils";
const currentYear = new Date().getFullYear();
const currentYearLastTwoDigits = currentYear % 100;
const maxYearLastTwoDigits = (currentYear + 3) % 100;

export const creditCardSchema = z.object({
  cardName: z
    .string()
    .min(1, "Card holder name is required")
    .min(2, "Card holder name must be at least 2 characters"),

  cardCcv: z.string().length(3, "Card CCV must be exactly 3 digits"),

  cardNum: z
    .string()
    .length(16, "Credit card number must be exactly 16 digits")
    .refine(
      (cardNum) => {
        console.log(getCardType(cardNum));
        return cardRegexp[getCardType(cardNum)].test(cardNum);
      },
      {
        message: "This is not a Visa nor a Master card",
      }
    )
    .refine(luhnCheck, {
      message: "Credit card number is invalid",
    }),

  expirationYear: z
    .string()
    .regex(/^\d{2}$/, { message: "Year must be 2 digits" })
    .refine(
      (year) => {
        const yearNumber = parseInt(year, 10);
        return (
          yearNumber >= currentYearLastTwoDigits &&
          yearNumber <= maxYearLastTwoDigits
        );
      },
      {
        message: `Year must be between ${String(
          currentYearLastTwoDigits
        ).padStart(2, "0")} and ${String(
          maxYearLastTwoDigits
        ).padStart(2, "0")}`,
      }
    ),

  expirationMonth: z.string().regex(/^(0[1-9]|1[0-2])$/, {
    message: "Month must be 01-12",
  }),
});

const isFutureDate = (
  expirationMonth: string,
  expirationYear: string
): boolean => {
  if (!expirationMonth || !expirationYear) {
    return true;
  }
  const now = new Date();
  const expirationDate = new Date(
    Number(`20${expirationYear}`),
    Number(expirationMonth)
  );
  return expirationDate > now;
};

export const expirationSchema = z
  .object({
    expirationMonth: z.string(),
    expirationYear: z.string(),
  })
  .refine(
    (data) => isFutureDate(data.expirationMonth, data.expirationYear),
    {
      message: "Expiration date cannot be in the past",
      path: ["expirationMonth", "expirationYear"],
    }
  );
