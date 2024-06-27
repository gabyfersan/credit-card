const removeIdenticalLetters = (str: string): string => {
  return '';
};

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
  //return [maxOdd, maxEven, maxOdd + maxEven];
};

export { removeIdenticalLetters, maximumOddSum };
