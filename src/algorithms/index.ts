import { runSpeedTest } from "./speedTest";
const maximumOddSum = (numbers: number[]): number => {
  let maxOdd = null;
  let maxEven = null;

  for (let num of numbers) {
    if (num % 2 !== 0) {
      maxOdd = maxOdd === null || num > maxOdd ? num : maxOdd;
    } else {
      maxEven = maxEven === null || num > maxEven ? num : maxEven;
    }
  }

  return maxOdd === null || maxEven === null ? -1 : maxOdd + maxEven;
};

const removeIdenticalLetters = (s: string): string => {
  const pattern = /(.)\1{3,}/g;
  return s.replace(pattern, (match) => match.slice(0, 3));
};

export { maximumOddSum, removeIdenticalLetters };

//-------------------------- Speed test ---------------------
//runSpeedTest();
