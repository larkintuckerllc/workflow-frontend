import { FieldProps } from 'formik';
import React, { FC } from 'react';
import styles from './FKInputText.module.css';

const FKInputText: FC<FieldProps> = ({
  field: { name, onBlur, onChange, value },
  form: { errors, touched },
}: FieldProps) => (
  <div>
    <div>
      <input name={name} onChange={onChange} onBlur={onBlur} value={value} />
    </div>
    {errors[name] !== undefined && touched[name] && <div id={styles.rootError}>{errors[name]}</div>}
  </div>
);

export default FKInputText;
