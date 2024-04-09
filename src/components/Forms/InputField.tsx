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
import { FieldAttributes, useField, useFormikContext } from 'formik';
import { FC } from 'react';

import pxToRem from '@/themes/functions/pxToRem';

type InputFieldProps = {
  label: string;
  sx?: FormControlProps['sx'];
  helperText?: string;
  size?: 'small' | 'medium' | 'large';
  isRequired?: boolean;
  inputProps?: OutlinedInputProps;
} & FieldAttributes<OutlinedInputProps>;

const InputField: FC<InputFieldProps> = ({
  label,
  sx,
  helperText,
  size = 'medium',
  ...inputProps
}) => {
  const [field, meta, helpers] = useField(inputProps);
  const { getFieldMeta } = useFormikContext();

  const formLabel = `${label} ${inputProps?.isRequired ? '*' : ''}`;
  return (
    <FormControl fullWidth sx={sx} size={size}>
      <label htmlFor={`outlined-select-${field.name}`}>{formLabel}</label>
      {/* <FormLabel htmlFor={`outlined-select-${field.name}`}></FormLabel> */}
      <OutlinedInput
        error={Boolean(meta.touched && meta.error)}
        {...field}
        value={field.value ?? ''}
        fullWidth
        id="email"
        size="small"
      />
      {!meta.error && helperText && (
        <FormHelperText id={`helper-text-${field.name}`}>{helperText}</FormHelperText>
      )}
      {meta.touched && meta.error && (
        <FormHelperText error id={`helper-text-${field.name}`}>
          {meta.error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default InputField;
