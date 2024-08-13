import {
  extractOnlyNumbers,
  checkAllFieldInForm,
  luhnCheck,
  getCardType,
  CardType,
  cardRegexp,
} from "../utils/utils";
import { expect, test, describe } from "vitest";

import { creditCardSchema } from "../credit-card/validation/creditCardValidation";

const testArray: Array<number | null> = [
  1,
  2,
  3,
  null,
  4,
  5,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  6,
  7,
  null,
];

describe("extractOnlyNumbers", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(extractOnlyNumbers(testArray, 0)).toStrictEqual([1, 2, 3]);
  });

  test("Extract the first 5 number =>[ 1, 2, 3, 4 ]", () => {
    expect(extractOnlyNumbers(testArray, 0, 5)).toStrictEqual([
      1, 2, 3, 4,
    ]);
  });

  test("Extract the first 5 number =>[ 5 ]", () => {
    expect(extractOnlyNumbers(testArray, 1, 5)).toStrictEqual([5]);
  });

  test("Extract 6 numbers starting at postion 6 =>[  ]", () => {
    expect(extractOnlyNumbers(testArray, 1, 6)).toStrictEqual([]);
  });
});

describe("Check Form fields", () => {
  const formValuesEmpty = {
    cardNum: "",
    cardName: "",
    expirationMonth: "",
    expirationYear: "",
    cardCcv: "",
  };

  const formValuesCorrect = {
    cardNum: "5555500830030331",
    cardName: "Anna Anka",
    expirationMonth: "06",
    expirationYear: "25",
    cardCcv: "123",
  };

  const formValuesWrongCard = {
    cardNum: "5555500830030332", // Should be 5555500830030331
    cardName: "Anna Anka",
    expirationMonth: "06",
    expirationYear: "25",
    cardCcv: "123",
  };

  test("Should return false when formvalues are empty", () => {
    expect(
      checkAllFieldInForm(creditCardSchema, formValuesEmpty)
    ).toStrictEqual(false);
  });

  test("Should return true when formvalues are OK", () => {
    expect(
      checkAllFieldInForm(creditCardSchema, formValuesCorrect)
    ).toStrictEqual(true);
  });

  test("Should return false when cardNum does not fullfill luhnCheck", () => {
    expect(
      checkAllFieldInForm(creditCardSchema, formValuesWrongCard)
    ).toStrictEqual(false);
  });
});

describe("luhnCheck", () => {
  test("should return true for a valid card number", () => {
    expect(luhnCheck("4532015112830366")).toBe(true); // Visa
    expect(luhnCheck("5555555555554444")).toBe(true); // MasterCard
  });

  test("should return false for an invalid card number", () => {
    expect(luhnCheck("4532015112830367")).toBe(false);
    expect(luhnCheck("6011111111111116")).toBe(false);
  });

  test("should return false for a card number with non-digit characters", () => {
    expect(luhnCheck("6011-1111-1111-1117")).toBe(false);
    expect(luhnCheck("5555 5555 5555 4444")).toBe(false);
  });

  test("should return true for a valid card number with an even number of digits", () => {
    expect(luhnCheck("4242424242424242")).toBe(true); // Visa test number
  });

  test("should return false for a card number that fails the Luhn check", () => {
    expect(luhnCheck("4242424242424241")).toBe(false);
  });
});

describe("getCardType", () => {
  test('should return "Visa" for a valid Visa card number', () => {
    const cardNumber = "4111111111111111";
    const result: CardType = getCardType(cardNumber);
    expect(result).toBe("Visa");
  });

  test('should return "MasterCard" for a valid MasterCard card number', () => {
    const cardNumber = "5500000000000004";
    const result: CardType = getCardType(cardNumber);
    expect(result).toBe("MasterCard");
  });

  test('should return "Unknown" for a card number that does not match Visa or MasterCard', () => {
    const cardNumber = "30000000000004"; // A number that doesn't match Visa or MasterCard regex
    const result: CardType = getCardType(cardNumber);
    expect(result).toBe("Unknown");
  });

  test('should return "Unknown" for an empty string', () => {
    const cardNumber = "";
    const result: CardType = getCardType(cardNumber);
    expect(result).toBe("Unknown");
  });

  test('should return "Unknown" for a non-numeric string', () => {
    const cardNumber = "abcdabcdabcdabcd";
    const result: CardType = getCardType(cardNumber);
    expect(result).toBe("Unknown");
  });

  test('should return "Unknown" for a card number that resembles but is not a MasterCard', () => {
    const cardNumber = "5600000000000000";
    const result: CardType = getCardType(cardNumber);
    expect(result).toBe("Unknown");
  });
});

describe("cardRegexp", () => {
  describe("Visa", () => {
    test("should match a valid 16-digit Visa card number", () => {
      const cardNumber = "4111111111111111";
      const result = cardRegexp.Visa.test(cardNumber);
      expect(result).toBe(true);
    });

    test("should not match a card number that starts with 5 (MasterCard)", () => {
      const cardNumber = "5111111111111111";
      const result = cardRegexp.Visa.test(cardNumber);
      expect(result).toBe(false);
    });
  });

  describe("MasterCard", () => {
    test("should match a valid 16-digit MasterCard number starting with 51", () => {
      const cardNumber = "5111111111111111";
      const result = cardRegexp.MasterCard.test(cardNumber);
      expect(result).toBe(true);
    });

    test("should not match a card number that starts with 4 (Visa)", () => {
      const cardNumber = "4111111111111111";
      const result = cardRegexp.MasterCard.test(cardNumber);
      expect(result).toBe(false);
    });
  });

  describe("Unknown", () => {
    test("should not match any card number", () => {
      const cardNumbers = [
        "4111111111111111", // Visa
        "5111111111111111", // MasterCard
        "1234567890123456", // Random number
      ];

      cardNumbers.forEach((cardNumber) => {
        const result = cardRegexp.Unknown.test(cardNumber);
        expect(result).toBe(false);
      });
    });
  });
});
