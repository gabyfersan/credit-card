import {
  extractOnlyNumbers,
  checkForErrorInFormFields,
} from "../utils/utils";
import { describe, it, expect, test } from "vitest";
import { creditCardSchema } from "../credit-card/validation/creditCardValidation";
import { z } from "zod";
import { useState } from "react";
import { render, screen, renderHook } from "@testing-library/react";

// describe("checkForErrorInFormFields", () => {
//   it("sets error state to null if validation succeeds", () => {
//     const { result } = renderHook(
//       () => (useState < string) | (null > null)
//     );
//     // const [errorState, setErrorState] = result.current;

//     // act(() => {
//     //   checkForErrorInFormFields(
//     //     { name: "cardNum", value: "1234567812345678" },
//     //     setErrorState,
//     //     creditCardSchema.pick({ cardNum: true })
//     //   );
//     // });

//     // expect(result.current[0]).toBeNull();
//   });
// });

const testArray = [
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
