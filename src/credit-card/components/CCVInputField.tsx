import { Box, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { checkForErrorInFormFields } from "../../utils/utils";
import { CCVInputFieldProps } from "../types";
import { creditCardSchema } from "../validation/creditCardValidation";

export const CCVInputField: React.FC<CCVInputFieldProps> = ({
  cardCcv,
  setCardCcv,
  onFocus,
  onBlur,
  isErrorWhenFormSubmit,
}) => {
  const [errorCardCcv, setErrorCardCcv] = useState<string | null>(null);

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
    (errorCardCcv || isErrorWhenFormSubmit) && handleErrorCheck();
  }, [isErrorWhenFormSubmit, cardCcv]);

  return (
    <Box>
      <Typography component='h2' for='ccv'>
        CCV
      </Typography>
      <TextField
        id='ccv'
        type='text'
        value={cardCcv}
        placeholder='123'
        onChange={(event) => setCardCcv(event.target.value)}
        name='cardCcv'
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
