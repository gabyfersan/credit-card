// Example  extractOnlyNumbers ([1, 1, 1, null, null, null], 0) => [1, 1, 1]
export const extractOnlyNumbers = (
  cardNumArray: Array<number>,
  index: number,
  length: number = 4
) => {
  return cardNumArray
    .slice(index * length, length * (index + 1))
    .filter((item: number) => typeof item === "number");
};
