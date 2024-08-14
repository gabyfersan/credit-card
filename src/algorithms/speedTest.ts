import { maximumOddSum, removeIdenticalLetters } from "./index";
import fs from "fs";
import path from "path";
import {
  default as init,
  remove_identical_letters,
} from "./pkg/remove_identical_letters.js";

const wasmPath = path.join(
  __dirname,
  "pkg/remove_identical_letters_bg.wasm"
);
const wasmBytes = fs.readFileSync(wasmPath);

await init(wasmBytes);

const generateArray = (length: number) => {
  const maxVal = 1500000;
  const array = Array.from(
    { length },
    () => Math.floor(Math.random() * maxVal) + 1
  );

  return array;
};
const generateCustomString = (length: number) => {
  const sequences = [
    "a",
    "bb",
    "ccc",
    "dddd",
    "eeeee",
    "ffffff",
    "ggggggg",
  ];
  let result = "";

  while (result.length < length) {
    result += sequences[Math.floor(Math.random() * 7)];
  }

  return result;
};

// A new removeIdenticalLetters to test performance
const removeIdenticalLettersLoop = (s: string): string => {
  let result = "";
  let count = 1;

  for (let i = 1; i <= s.length; i++) {
    if (s[i] === s[i - 1]) {
      count++;
    } else {
      result += s[i - 1].repeat(Math.min(count, 3));
      count = 1;
    }
  }

  return result;
};

export const runSpeedTest = async () => {
  /// ------------ speed test maximumOddSum -----------
  const nummberOfElementsInArray = 150000;
  console.time(
    `maximumOddSum Time run ${nummberOfElementsInArray} elements`
  );
  maximumOddSum(generateArray(nummberOfElementsInArray));
  console.timeEnd(
    `maximumOddSum Time run ${nummberOfElementsInArray} elements`
  );

  /// ------------ speed test removeIdenticalLetters -----------
  const lengthOfString = 10 ** 8;
  const longString = generateCustomString(lengthOfString);

  console.time(
    `removeIdenticalLetters Time run string with length of ${lengthOfString} using Javascript regexp`
  );
  removeIdenticalLetters(longString);
  console.timeEnd(
    `removeIdenticalLetters Time run string with length of ${lengthOfString} using Javascript regexp`
  );

  console.time(
    `removeIdenticalLetters Time run string with length of ${lengthOfString} using Javascript loop`
  );
  removeIdenticalLettersLoop(longString);
  console.timeEnd(
    `removeIdenticalLetters Time run string with length of ${lengthOfString} using Javascript loop`
  );

  console.time(
    `removeIdenticalLetters Time run string with length of ${lengthOfString} using Rust webassembly`
  );
  remove_identical_letters(longString);
  console.timeEnd(
    `removeIdenticalLetters Time run string with length of ${lengthOfString} using Rust webassembly`
  );
};
