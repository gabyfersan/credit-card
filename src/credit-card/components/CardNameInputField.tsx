import React, { useState, useEffect } from "react";
import { TextField, Box, Typography } from "@mui/material";
import { creditCardSchema } from "../validation/creditCardValidation";
import { handleOnBlurForErrorHandling } from "../../utils/utils";

interface CardHolderInputFieldProps {
  cardName: string;
  setCardName: React.Dispatch<React.SetStateAction<string>>;
}

export const CardNameInputField: React.FC<
  CardHolderInputFieldProps
> = ({ cardName, setCardName }) => {
  const [errorCardName, setErrorCardName] = useState<string | null>(
    null
  );

  return (
    <Box>
      <Typography component="h2">Card holder</Typography>
      <TextField
        fullWidth
        name="cardName"
        value={cardName}
        onChange={(event) => setCardName(event.target.value)}
        margin="normal"
        error={!!errorCardName}
        helperText={errorCardName || " "}
        FormHelperTextProps={{ style: { marginTop: "0" } }}
        onBlur={(event) =>
          handleOnBlurForErrorHandling(
            event.target,
            setErrorCardName,
            creditCardSchema.pick({ cardName: true })
          )
        }
      />
    </Box>
  );
};
