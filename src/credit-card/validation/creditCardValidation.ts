import { z } from "zod";
const currentYear = new Date().getFullYear();
const currentYearLastTwoDigits = currentYear % 100;
const maxYearLastTwoDigits = (currentYear + 3) % 100;

// Define the Zod schema
export const creditCardSchema = z.object({
  cardName: z
    .string()
    .min(1, "Card holder name is required")
    .min(2, "Card holder name must be at least 2 characters"),
  cardCcv: z.string().length(3, "Card CCV must be exactly 3 digits"),

  cardNumArray: z
    .string()
    .length(16, "Credit card number must be exactly 16 digits"),
  expYear: z
    .string()
    .regex(/^\d{2}$/, { message: "Year must be a two-digit number" })
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
    message: "Month must be between 01 and 12",
  }),
});
