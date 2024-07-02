import React, { useState, useEffect } from "react";
import { TextField, Box, Typography } from "@mui/material";
import { creditCardSchema } from "../validation/creditCardValidation";
import { handleOnBlurForErrorHandling } from "../../utils/utils";

interface CCVInputFieldProps {
  cardCcv: string;
  setCardCcv: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  isErrorWhenFormSubmit: boolean;
}

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

  const handleOnBlurForCcv = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    handleOnBlurForErrorHandling(
      event.target,
      setErrorCardCcv,
      creditCardSchema.pick({ cardCcv: true })
    );
    onBlur();
  };

  useEffect(() => {
    if (isErrorWhenFormSubmit) {
      handleOnBlurForErrorHandling(
        {
          name: "cardCcv",
          value: cardCcv,
        },
        setErrorCardCcv,
        creditCardSchema.pick({ cardCcv: true })
      );
    }
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
        onBlur={(event) => handleOnBlurForCcv(event)}
        fullWidth
        name="cardCcv"
        margin="normal"
        error={!!errorCardCcv}
        helperText={errorCardCcv || " "}
        FormHelperTextProps={{ style: { marginTop: "0" } }}
      />
    </Box>
  );
};
