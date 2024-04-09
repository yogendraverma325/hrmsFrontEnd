import {
  FormControl,
  FormControlProps,
  FormHelperText,
  FormLabel,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
  TextField,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { FieldAttributes, useField, useFormikContext } from 'formik';
import moment from 'moment';
import { FC } from 'react';

import pxToRem from '@/themes/functions/pxToRem';
type InputFieldProps = {
  label: string;
  sx?: FormControlProps['sx'];
  helperText?: string;
  size?: 'small' | 'medium' | 'large';
  isRequired?: boolean;
  inputProps?: OutlinedInputProps;
} & FieldAttributes<any>;

const getDatePickerValue = (field: string) => {
  if (field === null || field === '') {
    return null; // Don't pass the value prop if value is null
  }
  // Parse the date and return it in the desired format
  return moment(field, 'MM/DD/YYYY');
};

const DateField: FC<InputFieldProps> = ({
  label,
  sx,
  helperText,
  size = 'small',
  ...inputProps
}) => {
  const [field, meta, helpers] = useField(inputProps);
  const { setFieldValue } = useFormikContext();
  const handleDateChange = (value: any) => {
    const formattedDate = moment(value).format('MM/DD/YYYY');
    setFieldValue(field.name, formattedDate); // Update Formik field value
  };
  const formLabel = `${label} ${inputProps?.isRequired ? '*' : ''}`;
  return (
    <>
      <FormControl fullWidth sx={sx} size={size}>
        {/* TODO LEBEL REFORM */}
        <FormLabel htmlFor={`outlined-select-${field.name}`}>{formLabel}</FormLabel>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            onChange={handleDateChange}
            value={getDatePickerValue(field.value)}
            name="Date"
            slotProps={{
              textField: {
                size,
                // Define slot props for the TextField component
                error: meta.touched && Boolean(meta.error),
                helperText: meta.touched && meta.error,
                onKeyDown: (e) => e.preventDefault(),
              },
            }}
          />
        </LocalizationProvider>
      </FormControl>
    </>
  );
};

export default DateField;
