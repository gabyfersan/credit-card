import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { MonthSelectProps, refProp } from "../types";

export const MonthSelect = forwardRef<refProp, MonthSelectProps>(
  (
    {
      expirationMonth,
      setExpirationMonth,
      errorExpirationMonth,
      handleErrorCheckExpirationMonth,
    },
    ref
  ) => {
    const inputRef = useRef<HTMLSelectElement>(null);

    useImperativeHandle(ref, () => ({
      focus() {
        inputRef.current?.focus();
      },
    }));
    return (
      <FormControl sx={{ width: "50%", paddingRight: "1rem" }}>
        <InputLabel id="card-expiration-month-label">
          Month
        </InputLabel>
        <Select
          inputRef={inputRef}
          labelId="card-expiration-month-label"
          id="month"
          value={expirationMonth}
          label="Month"
          onChange={(event) => {
            setExpirationMonth(event.target.value);
          }}
          name="expirationMonth"
          onBlur={handleErrorCheckExpirationMonth}
          error={!!errorExpirationMonth}
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
          {errorExpirationMonth ? errorExpirationMonth : " "}
        </FormHelperText>
      </FormControl>
    );
  }
);
