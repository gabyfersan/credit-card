import { expect, test } from "vitest";
import {
  removeIdenticalLetters,
  maximumOddSum,
} from "../algorithms/index";

test("adds 1 + 2 to equal 3", () => {
  expect(maximumOddSum([19, 2, 42, 18])).toBe(61);
});
