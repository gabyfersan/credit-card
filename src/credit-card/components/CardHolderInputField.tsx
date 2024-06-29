import React from "react";
import { TextField } from "@mui/material";

interface CardHolderInputFieldProps {
  cardName: string;
  setCardName: (value: string) => void;
}

export const CardHolderInputField: React.FC<
  CardHolderInputFieldProps
> = ({ cardName, setCardName }) => (
  <div>
    <TextField
      label="Card holder"
      fullWidth
      value={cardName}
      onChange={(event) => setCardName(event.target.value)}
      margin="normal"
    />
  </div>
);
