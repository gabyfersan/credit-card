import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";
import { MonthSelectProps } from "../types";

export const MonthSelect: React.FC<MonthSelectProps> = ({
  expMonth,
  setExpMonth,
  errorExpMonth,
  handleErrorCheckExpMonth,
}) => {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="card-expiration-month-label">Month</InputLabel>
      <Select
        value={expMonth}
        label="Month"
        onChange={(event) => {
          setExpMonth(event.target.value);
        }}
        name="expMonth"
        onBlur={handleErrorCheckExpMonth}
        error={!!errorExpMonth}
        type="text"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {Array.from({ length: 12 }, (_, i) => (
          <MenuItem key={i} value={String(i + 1).padStart(2, "0")}>
            {String(i + 1).padStart(2, "0")}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error={true}>
        {errorExpMonth ? errorExpMonth : " "}
      </FormHelperText>
    </FormControl>
  );
};
