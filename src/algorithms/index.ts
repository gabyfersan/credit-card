const removeIdenticalLetters = (str: string): string => {
  return "";
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

  console.log("maximumOddSum", maxOdd === null || maxEven === null ? -1 : maxOdd + maxEven;)
  return maxOdd === null || maxEven === null ? -1 : maxOdd + maxEven;
  //return [maxOdd, maxEven, maxOdd + maxEven];
};

export { maximumOddSum, removeIdenticalLetters };

function generateRandomString(length) {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}


function generateArray(length) {
  if (typeof length !== 'number' || length <= 0 || !Number.isInteger(length)) {
    throw new Error('The input parameter must be a positive integer.');
  }

  const maxVal = 1500000.;
  const array = Array.from({ length }, () => Math.floor(Math.random() * maxVal) + 1);

  return array;
}

// Example usage:
const randomString = generateRandomString(10); // Generates a random string of length 10
console.log(randomString);


function removeIdenticalLetters2(s) {
  const pattern = /(.)\1\1\1/g;
  return s.replace(pattern, (match) => match.slice(0, 3));
}