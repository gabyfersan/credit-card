import { expect, test, describe } from "vitest";
import {
  removeIdenticalLetters,
  maximumOddSum,
} from "../algorithms/index";

describe("maximumOddSum", () => {
  test("should return the sum of the largest odd and largest even number for array of 200 elements", () => {
    const numbers = [
      1233706, 1099425, 684554, 860339, 222266, 104675, 554606,
      420729, 383673, 1425631, 1282950, 1171406, 630158, 1271749,
      1089331, 1452160, 62427, 1354892, 1187063, 1197568, 697133,
      516331, 138817, 1032931, 844318, 981713, 297848, 1254693,
      1075612, 1300206, 1123566, 141854, 623834, 970094, 1348900,
      1082471, 594379, 642672, 281762, 1282606, 1321660, 748633,
      282456, 945259, 184602, 1244528, 351819, 728351, 444429, 13264,
      48819, 749829, 230320, 592926, 381932, 545725, 531267, 855161,
      1461949, 142838, 1488372, 1082594, 521386, 919365, 11702,
      476587, 686567, 104482, 841209, 744035, 696728, 912902, 1005989,
      650480, 194959, 430032, 535060, 586421, 238004, 14569, 729249,
      910612, 917916, 1498422, 407577, 61726, 735591, 349736, 49717,
      637095, 1016544, 1461513, 622818, 1220459, 1061949, 454596,
      235818, 594026, 545081, 754364, 1470774, 1331300, 863017, 1065,
      87930, 827581, 1093720, 543117, 1152200, 964442, 992069,
      1148123, 166109, 729652, 1133413, 240791, 1010151, 112435, 5906,
      737815, 862143, 1363642, 294291, 1085538, 366658, 1207914,
      978778, 1180811, 793262, 682617, 513038, 684082, 717430, 236,
      1404328, 1363714, 508374, 271522, 667000, 283285, 454489, 77275,
      1142552, 85725, 1185158, 482399, 1185598, 586889, 1115391,
      739572, 1420514, 868926, 1362511, 513002, 1334928, 1077660,
      169129, 1027646, 403386, 1166133, 676069, 80926, 469384,
      1375013, 922536, 385916, 660722, 1012289, 346713, 1085925,
      62435, 572568, 1188036, 142667, 1206006, 730127, 413922, 235040,
      1423508, 1123131, 581353, 1189900, 1375854, 1198446, 554519,
      393305, 847875, 1433457, 1063078, 169402, 109045, 573995, 63475,
      1118832, 324114, 195630, 176259, 634499, 89141, 1041652,
    ];

    const result = maximumOddSum(numbers);
    expect(result).toBe(2960371);
  });

  test("should return 61, test from readme", () => {
    const numbers = [19, 2, 42, 18];
    const result = maximumOddSum(numbers);
    expect(result).toBe(61);
  });

  test("should return 93, test from readme", () => {
    const numbers = [61, 32, 51];
    const result = maximumOddSum(numbers);
    expect(result).toBe(93);
  });
  test("should return -1 if there is no odd number", () => {
    const numbers = [2, 4, 6, 8];
    const result = maximumOddSum(numbers);
    expect(result).toBe(-1);
  });

  test("should return -1 if there is no even number", () => {
    const numbers = [1, 3, 5, 7];
    const result = maximumOddSum(numbers);
    expect(result).toBe(-1);
  });

  test("should return -1 if the list is empty", () => {
    const numbers: number[] = [];
    const result = maximumOddSum(numbers);
    expect(result).toBe(-1);
  });

  test("should return the sum when only one odd and one even number are present", () => {
    const numbers = [1, 2];
    const result = maximumOddSum(numbers);
    expect(result).toBe(3);
  });

  test("should return -1 if all numbers are the same and odd", () => {
    const numbers = [1, 1, 1, 1];
    const result = maximumOddSum(numbers);
    expect(result).toBe(-1);
  });

  test("should return -1 if all numbers are the same and even", () => {
    const numbers = [2, 2, 2, 2];
    const result = maximumOddSum(numbers);
    expect(result).toBe(-1);
  });
});

describe("removeIdenticalLetters", () => {
  test("should remove the fourth identical letter in a sequence of four identical letters", () => {
    expect(removeIdenticalLetters("aaaabbbb")).toBe("aaabbb");
    expect(removeIdenticalLetters("ttttgggg")).toBe("tttggg");
    expect(removeIdenticalLetters("ffdttttyy")).toBe("ffdtttyy");
    expect(removeIdenticalLetters("iiikigggg")).toBe("iiikiggg");
  });

  test("should not modify sequences with less than four identical letters", () => {
    expect(removeIdenticalLetters("aaa")).toBe("aaa");
    expect(removeIdenticalLetters("bb")).toBe("bb");
    expect(removeIdenticalLetters("cccc")).toBe("ccc");
  });

  test("should handle mixed sequences correctly", () => {
    expect(removeIdenticalLetters("aaabbbbcccc")).toBe("aaabbbccc");
    expect(removeIdenticalLetters("xxxyyyzzzz")).toBe("xxxyyyzzz");
    expect(removeIdenticalLetters("aaapppppppkkklp")).toBe(
      "aaapppkkklp"
    );
  });

  test("should handle strings with no identical letters", () => {
    expect(removeIdenticalLetters("abcdef")).toBe("abcdef");
    expect(removeIdenticalLetters("mnop")).toBe("mnop");
  });

  test("should handle an empty string", () => {
    expect(removeIdenticalLetters("")).toBe("");
  });

  test("should handle a string with only one character repeated four times", () => {
    expect(removeIdenticalLetters("aaaa")).toBe("aaa");
  });

  test("should handle strings with multiple sequences of four identical letters", () => {
    expect(removeIdenticalLetters("aaaabbbbccccddddeeee")).toBe(
      "aaabbbcccdddeee"
    );
  });

  test("should handle strings with sequences of more than four identical letters", () => {
    expect(removeIdenticalLetters("aaaaa")).toBe("aaa");
    expect(removeIdenticalLetters("bbbbbbbb")).toBe("bbb");
  });

  test("should handle long random strings", () => {
    expect(
      removeIdenticalLetters(
        "abbcccddddeeeeeffffffggggggghhhiiiijjjjjkkkkkklllllllmnoppppppqqqqqqqrrsssttttuuuuuvvvvvvwwwwwwwxxyyyzzaabbcccccddddddeeeeeefggggggghhhhhhiiiiiijjjjjjjkkkkkkklllllllmmmmmnnnnnnoooooopppppppqqqqqqqrrrrrrrssssssttttttuuuuuuvwwwxxxxxxyyyyyzzzzzaaaaabbbbbcccccdddddeeeeefffffggggghhhhhiiiiijjjjjkkkkklllllmmmmmnnnnnooooopppppqqqqqrrrrrssssstttttuuuuuvvvvvwwwwwxxxxxyyyyyzzzzzaaaaabbbbbcccccdddddeeeeefffffggggghhhhhiiiiijjjjjkkkkklllllmmmmmnnnnnooooopppppqqqqqrrrrrssssstttttuuuuuvvvvvwwwwwxxxxxyyyyyzzzzz"
      )
    ).toBe(
      "abbcccdddeeefffggghhhiiijjjkkklllmnopppqqqrrssstttuuuvvvwwwxxyyyzzaabbcccdddeeefggghhhiiijjjkkklllmmmnnnooopppqqqrrrssstttuuuvwwwxxxyyyzzzaaabbbcccdddeeefffggghhhiiijjjkkklllmmmnnnooopppqqqrrrssstttuuuvvvwwwxxxyyyzzzaaabbbcccdddeeefffggghhhiiijjjkkklllmmmnnnooopppqqqrrrssstttuuuvvvwwwxxxyyyzzz"
    );
  });
});
