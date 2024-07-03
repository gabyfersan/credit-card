import React, { useState, useEffect } from "react";
import {
  TextField,
  Box,
  Typography,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { extractOnlyNumbers } from "../../utils/utils";
import { creditCardSchema } from "../validation/creditCardValidation";
import { checkForErrorInFormFields } from "../../utils/utils";
import { CardNumberInputFieldProps } from "../types";

export const CardNumberInputField: React.FC<
  CardNumberInputFieldProps
> = ({
  cardNumArray,
  setCardNumArray,
  inputRefs,
  isErrorWhenFormSubmit,
}) => {
  const [errorCardNumArray, setErrorCardNumArray] = useState<
    string | null
  >(null);

  const handleKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    let newIndex = index;
    const isBackspace = event.key === "Backspace";
    const isSingleKeyNotNumber =
      event.key.length === 1 && !/^[0-9]$/.test(event.key);
    const isInvalidKey = event.key.length > 1 && !isBackspace;

    if (isInvalidKey || isSingleKeyNotNumber) {
      return;
    }
    const numberToAdd = parseInt(event.key, 10);
    let subArray;
    // Check if any of the first three input fields is in focus and full of numbers, and the user has not pressed backspace.
    // If true, change focus to the next input field.
    if (
      extractOnlyNumbers(cardNumArray, newIndex).length === 4 &&
      newIndex < 3 &&
      !isBackspace
    ) {
      newIndex += 1;
      inputRefs.current[newIndex]?.focus();
    }
    //Check if any of the last three input fields is in focus and empty, and the user pressed backspace.
    //If true, change focus to the previous input field.
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

    setCardNumArray((prevArray: number[]) => {
      const newArray = [...prevArray];
      newArray.splice(newIndex * 4, 4, ...fillArrayWithNulls);
      return newArray;
    });
  };

  useEffect(() => {
    (errorCardNumArray || isErrorWhenFormSubmit) &&
      handleErrorCheck();
  }, [isErrorWhenFormSubmit, cardNumArray]);

  const handleErrorCheck = () => {
    checkForErrorInFormFields(
      {
        name: "cardNum",
        value: extractOnlyNumbers(cardNumArray, 0, 16).join(""),
      },
      setErrorCardNumArray,
      creditCardSchema.pick({ cardNum: true })
    );
  };
  return (
    <Box>
      <FormControl>
        <Typography component="h2">Card Number</Typography>
        <Box display="flex" gap={1}>
          {[0, 1, 2, 3].map((index) => (
            <TextField
              key={index}
              type="text"
              name="cardNumArray"
              inputProps={{ maxLength: 4 }}
              inputRef={(el) => (inputRefs.current[index] = el)}
              onKeyUp={(e) =>
                handleKeyUp(
                  e as React.KeyboardEvent<HTMLInputElement>,
                  index
                )
              }
              value={extractOnlyNumbers(cardNumArray, index).join("")}
              onChange={() => {}} // Adding empty onChange to suppress warning
              onBlur={() => index === 3 && handleErrorCheck()}
              error={!!errorCardNumArray}
            />
          ))}
        </Box>
        <FormHelperText error={true}>
          {errorCardNumArray ? errorCardNumArray : " "}
        </FormHelperText>
      </FormControl>
    </Box>
  );
};
