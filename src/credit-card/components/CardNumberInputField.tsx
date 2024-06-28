import { extractOnlyNumbers } from "../../utils/utils";

interface CardNumberInputFieldProps {
  cardNumArray: number[];
  setCardNumArray: React.Dispatch<React.SetStateAction<number[]>>;
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
}

export const CardNumberInputField: React.FC<
  CardNumberInputFieldProps
> = ({ cardNumArray, setCardNumArray, inputRefs }) => {
  const keyUpCardNumber = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    let newIndex = index;
    if (
      (event.key.length > 1 && !["Backspace"].includes(event.key)) ||
      (event.key.length === 1 && !/^[0-9]$/.test(event.key))
    ) {
      return;
    }
    const numberToAdd = parseInt(event.key);
    let tSubArray;
    if (
      extractOnlyNumbers(cardNumArray, newIndex).length === 4 &&
      newIndex < 3
    ) {
      newIndex += 1;
      inputRefs.current[newIndex]?.focus();
    }

    if (
      extractOnlyNumbers(cardNumArray, newIndex).length === 0 &&
      newIndex > 0 &&
      event.key == "Backspace"
    ) {
      newIndex -= 1;
      inputRefs.current[newIndex]?.focus();
    }

    tSubArray = extractOnlyNumbers(cardNumArray, newIndex);

    if (event.key == "Backspace") {
      tSubArray.pop();
    } else {
      if (tSubArray.length < 4) {
        tSubArray.push(numberToAdd);
      }
    }

    const fillArrayWithNulls =
      tSubArray.length >= 4
        ? tSubArray
        : tSubArray.concat(Array(4 - tSubArray.length).fill(null));

    setCardNumArray((prevArray) => {
      const newArray = [...prevArray];
      newArray.splice(
        newIndex * 4,
        fillArrayWithNulls.length,
        ...fillArrayWithNulls
      );
      return newArray;
    });
  };

  return (
    <fieldset>
      <label htmlFor="card-number">Card Number</label>
      {[0, 1, 2, 3].map((index) => (
        <input
          key={index}
          type="text"
          id={`card-number-${index}`}
          className="input-cart-number"
          maxLength={4}
          ref={(el) => (inputRefs.current[index] = el)}
          onKeyUp={(e) => keyUpCardNumber(e, index)}
          value={extractOnlyNumbers(cardNumArray, index).join("")}
          onChange={() => {}} // Adding empty onChange to suppress the warning
        />
      ))}
    </fieldset>
  );
};
