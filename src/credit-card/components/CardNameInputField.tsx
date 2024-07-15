import {
  TextField,
  Typography,
  FormControl,
  FormLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { checkForErrorInFormFields } from "../../utils/utils";
import { CardHolderInputFieldProps } from "../types";
import { creditCardSchema } from "../validation/creditCardValidation";

export const CardNameInputField: React.FC<
  CardHolderInputFieldProps
> = ({ cardName, setCardName, isErrorWhenFormSubmit }) => {
  const [errorCardName, setErrorCardName] = useState<string | null>(
    null
  );

  const handleErrorCheck = () => {
    checkForErrorInFormFields(
      {
        name: "cardName",
        value: cardName,
      },
      setErrorCardName,
      creditCardSchema.pick({ cardName: true })
    );
  };
  useEffect(() => {
    (errorCardName || isErrorWhenFormSubmit) && handleErrorCheck();
  }, [isErrorWhenFormSubmit, cardName]);

  return (
    <FormControl fullWidth>
      <FormLabel htmlFor="name">
        <Typography component="h2" variant="h6">
          Card Holder
        </Typography>
      </FormLabel>

      <TextField
        id="name"
        type="text"
        fullWidth
        placeholder="John Doe"
        name="cardName"
        value={cardName}
        onChange={(event) => setCardName(event.target.value)}
        error={!!errorCardName}
        helperText={errorCardName || " "}
        onBlur={handleErrorCheck}
      />
    </FormControl>
  );
};
