import { extractOnlyNumbers } from "../../utils/utils";

interface CardNumberInputFieldProps {
  cardNumArray: number[];
  setCardNumArray: React.Dispatch<React.SetStateAction<number[]>>;
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
}

export const CardNumberInputField: React.FC<
  CardNumberInputFieldProps
> = ({ cardNumArray, setCardNumArray, inputRefs }) => {
  const handleKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    let newIndex = index;
    const isBackspace = event.key === "Backspace";
    const isSingleKeyNotAnumber =
      event.key.length === 1 && !/^[0-9]$/.test(event.key);
    const isInvalidKey = event.key.length > 1 && !isBackspace;

    if (isInvalidKey || isSingleKeyNotAnumber) {
      return;
    }
    const numberToAdd = parseInt(event.key);
    let subArray;
    //True if any of the first three input fields is in focus and full of numbers, => change focus to next input field
    if (
      extractOnlyNumbers(cardNumArray, newIndex).length === 4 &&
      newIndex < 3 &&
      !isBackspace
    ) {
      newIndex += 1;
      inputRefs.current[newIndex]?.focus();
    }
    //True if any of the last three input fields is in focus, empty, and the user presses backspace = change focus to previous input field
    if (
      extractOnlyNumbers(cardNumArray, newIndex).length === 0 &&
      newIndex > 0 &&
      isBackspace
    ) {
      newIndex -= 1;
      inputRefs.current[newIndex]?.focus();
    }

    subArray = extractOnlyNumbers(cardNumArray, newIndex);

    if (isBackspace) {
      subArray.pop();
    } else if (subArray.length < 4) {
      subArray.push(numberToAdd);
    }

    const fillArrayWithNulls = subArray.concat(
      Array(4 - subArray.length).fill(null)
    );

    setCardNumArray((prevArray) => {
      const newArray = [...prevArray];
      newArray.splice(newIndex * 4, 4, ...fillArrayWithNulls);
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
          onKeyUp={(e) => handleKeyUp(e, index)}
          value={extractOnlyNumbers(cardNumArray, index).join("")}
          onChange={() => {}} // Adding empty onChange to suppress the warning
        />
      ))}
    </fieldset>
  );
};
