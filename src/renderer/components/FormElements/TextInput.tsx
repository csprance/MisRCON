import TextField from '@material-ui/core/TextField';
import { useField } from 'formik';
import * as React from 'react';

const MisRCONTextField: React.FunctionComponent<{
  label: string;
  name: string;
}> = ({ label, ...props }) => {
  const [field, meta] = useField(props.name);
  return (
    <>
      <TextField {...field} {...props} label={label} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};
export default MisRCONTextField;
