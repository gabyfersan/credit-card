import React, { useState, useEffect } from "react";
import { TextField, Box, Typography } from "@mui/material";
import { creditCardSchema } from "../validation/creditCardValidation";
import { checkForErrorInFormFields } from "../../utils/utils";
import { CardHolderInputFieldProps } from "../types";

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
    <Box>
      <Typography component="h2">Card Holder</Typography>
      <TextField
        type="text"
        fullWidth
        name="cardName"
        value={cardName}
        onChange={(event) => setCardName(event.target.value)}
        error={!!errorCardName}
        helperText={errorCardName || " "}
        onBlur={handleErrorCheck}
      />
    </Box>
  );
};
