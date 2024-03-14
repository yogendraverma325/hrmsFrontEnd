/* eslint-disable react/prop-types */
import { FormControlLabel, FormLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FieldAttributes, useField, useFormikContext } from "formik";
// prop-types is a library for typechecking of props

type Option = {
  value: string;
  label: string;
};

type Props = FieldAttributes<any> & {
  name: string;
  label: string;
  options: Option[];
  isRequired?: boolean;
  helperText?: string;
};

const SelectField: React.FC<Props> = ({ label, options, sx, helperText, ...props }) => {
  const [field, meta,helpers] = useField(props);
  const formLabel = `${label} ${props?.isRequired ? "*" : ""}`;

  return (
    <FormControl fullWidth >
       <label htmlFor={`outlined-select-${field.name}`}>{formLabel}</label>
          {/* <FormLabel htmlFor={`outlined-select-${field.name}`}>{formLabel}</FormLabel> */}
      <Select
      error={Boolean(meta.touched && meta.error)}
        {...field}
        {...props}
        id={`outlined-select-${field.name}`}
        variant="outlined"
        MenuProps={{
          style: {
            maxHeight: 300,
          },
        }}
        value={field.value ?? ""}
      >
        {props?.placeholder ? (
          <MenuItem disabled selected>
            {props.placeholder}
          </MenuItem>
        ) : null}
        {options?.map((option: Option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {meta.touched && meta?.error && (
        <FormHelperText error id={`standard-helper-${field.name}`}>
          {meta.error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default SelectField;