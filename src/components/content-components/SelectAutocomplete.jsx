import React from "react";
import { Autocomplete, TextField } from "@mui/material";

const SelectAutocomplete = ({ options, value, onChange, onInputChange, placeholder, error, helperText, size = "small", disabled }) => {
  return (
    <Autocomplete
      size={size}
      options={options}
      getOptionLabel={(option) => option.label || ""}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      value={options.find((option) => option.value === value) || null}
      onChange={(_, newValue) => onChange(newValue ? newValue.value : "")}
      onInputChange={(_, newInputValue) => onInputChange && onInputChange(newInputValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          error={!!error}
          helperText={helperText}
          InputProps={{
            ...params.InputProps,
            sx: { height: 41 },
          }}
        />
      )}
      disabled={disabled}
    />
  );
};

export default SelectAutocomplete;
