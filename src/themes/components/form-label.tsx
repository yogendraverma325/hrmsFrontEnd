import { Components, Theme, colors } from "@mui/material";
import pxToRem from "../functions/pxToRem";


const { grey } = colors

export const MuiFormLabel: Components<Theme>["MuiFormLabel"] = {
  styleOverrides: {
    root: {
      color: grey[800],
      fontSize: pxToRem(14),
      fontWeight: 500,
      marginBottom: 2
    },
  },
};
