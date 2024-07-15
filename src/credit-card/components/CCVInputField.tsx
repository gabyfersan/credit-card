import {
  TextField,
  Typography,
  InputLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
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
    (errorCardCcv || isErrorWhenFormSubmit) && handleErrorCheck();
  }, [isErrorWhenFormSubmit, cardCcv]);

  return (
    <FormControl fullWidth>
      <FormLabel htmlFor="ccv">
        <Typography component="h2" variant="h6">
          CCV
        </Typography>
      </FormLabel>

      <TextField
        id="ccv"
        type="text"
        value={cardCcv}
        placeholder="123"
        onChange={(event) => setCardCcv(event.target.value)}
        name="cardCcv"
        onFocus={onFocus}
        onBlur={() => {
          handleErrorCheck();
          onBlur();
        }}
        error={!!errorCardCcv}
        helperText={errorCardCcv || " "}
        inputProps={{ maxLength: 3 }}
      />
    </FormControl>
  );
};
