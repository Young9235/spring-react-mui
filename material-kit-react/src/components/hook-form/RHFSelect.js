import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { FormHelperText, MenuItem, Select } from '@mui/material';

// ----------------------------------------------------------------------

RHFSelect.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
  errors: PropTypes.string,
};

export default function RHFSelect({ name, options, errors, ...other }) {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue="CHO"
        render={({ field }) => (
          <Select {...field} {...other}>
            {options.map((option) => (
              <MenuItem key={option.id} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <FormHelperText error>{errors}</FormHelperText>
    </>
  );
}
