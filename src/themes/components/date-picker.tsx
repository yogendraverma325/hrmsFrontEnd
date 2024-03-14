import { Components, Theme } from "@mui/material";
import pxToRem from "../functions/pxToRem";

export const MuiDatePicker = {
    styleOverrides: {
      root: {
        height: pxToRem(42)
        // Customize the root style of the DatePicker
      },
      // Override specific parts of the DatePicker
      datePicker: {
        // Customize the datePicker style
      },
      day: {
        // Customize the style for each day in the DatePicker
      },
      month: {
        // Customize the style for the month in the DatePicker
      },
      year: {
        // Customize the style for the year in the DatePicker
      },
      // Override specific states or variants of the DatePicker
      outlined: {
        // Customize the style for the outlined variant of the DatePicker
      },
      dialog: {
        // Customize the style for the dialog of the DatePicker
      },
      popper: {
        // Customize the style for the popper of the DatePicker
      },
      // Other overrides as needed
    },
  };
  