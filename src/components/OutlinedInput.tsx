import React from "react";
import { styled } from "@mui/material";
import { shouldForwardProp } from "@mui/system";
import MuiOutlinedInput from "@mui/material/OutlinedInput";

export const OutlinedInput = styled(MuiOutlinedInput, { shouldForwardProp })(({ theme }) => ({
  "& .MuiInputBase-input.MuiOutlinedInput-input.Mui-disabled": {
    textFillColor: theme.palette.grey[800],
    opacity: 1,
  },
}));
