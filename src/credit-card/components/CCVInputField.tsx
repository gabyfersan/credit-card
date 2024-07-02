import React, { useState, useEffect } from "react";
import { TextField, Box, Typography } from "@mui/material";
import { creditCardSchema } from "../validation/creditCardValidation";
import { checkForErrorInFormFields } from "../../utils/utils";
import { CCVInputFieldProps } from "../types";

export const CCVInputField: React.FC<CCVInputFieldProps> = ({
  cardCcv,
  setCardCcv,
  onFocus,
  onBlur,
  isErrorWhenFormSubmit,
}) => {
  const [errorCardCcv, setErrorCardCcv] = useState<string | null>(
    null
  );

  const handleErrorCheck = () => {
    checkForErrorInFormFields(
      {
        name: "cardCcv",
        value: cardCcv,
      },
      setErrorCardCcv,
      creditCardSchema.pick({ cardCcv: true })
    );
  };
  useEffect(() => {
    isErrorWhenFormSubmit && handleErrorCheck();
  }, [isErrorWhenFormSubmit]);

  return (
    <Box>
      <Typography component="h2">CCV</Typography>
      <TextField
        type="text"
        value={cardCcv}
        onChange={(event) => setCardCcv(event.target.value)}
        name="cardCcv"
        onFocus={onFocus}
        onBlur={() => {
          handleErrorCheck();
          onBlur();
        }}
        fullWidth
        error={!!errorCardCcv}
        helperText={errorCardCcv || " "}
        inputProps={{ maxLength: 3 }}
      />
    </Box>
  );
};
