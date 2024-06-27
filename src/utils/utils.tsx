// Example  extractOnlyNumbers ([1, 1, 1, null, null, null], 0) => [1, 1, 1]
export const extractOnlyNumbers = (
  cardNumArray: Array<number>,
  index: number
) => {
  return cardNumArray
    .slice(index * 4, index * 4 + 4)
    .filter((item: number) => typeof item === "number");
};
