import { z } from "zod";
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
    .regex(
      /^4[0-9]{15}$/,
      "Credit number must be a valid Visa card number"
    ),

  expYear: z
    .string()
    .regex(/^\d{2}$/, { message: "Year must be 4 digit" })
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
  expMonth: z.string().regex(/^(0[1-9]|1[0-2])$/, {
    message: "Month must be 01-12",
  }),
});

const isFutureDate = (expMonth: string, expYear: string): boolean => {
  if (!expMonth || !expYear) {
    return true;
  }
  const now = new Date();
  const expDate = new Date(Number(`20${expYear}`), Number(expMonth));
  return expDate > now;
};

export const expSchema = z
  .object({
    expMonth: z.string(),
    expYear: z.string(),
  })
  .refine((data) => isFutureDate(data.expMonth, data.expYear), {
    message: "Expiration date cannot be in the past",
    path: ["expMonth", "expYear"],
  });
