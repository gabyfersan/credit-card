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
        id="card-ccv"
        type="text"
        variant="outlined"
        inputProps={{ maxLength: 3 }}
        value={cardCcv}
        onChange={(event) => setCardCcv(event.target.value)}
        onFocus={onFocus}
        onBlur={() => {
          handleErrorCheck();
          onBlur();
        }}
        fullWidth
        name="cardCcv"
        error={!!errorCardCcv}
        helperText={errorCardCcv || " "}
      />
    </Box>
  );
};
