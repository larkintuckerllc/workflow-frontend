import { FieldProps } from 'formik';
import React, { FC } from 'react';
import styles from './FKInputText.module.css';

interface AdditionalProps {
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

const FKInputText: FC<FieldProps & AdditionalProps> = ({
  disabled = false,
  field: { name, onBlur, onChange, value },
  form: { errors, touched },
  label,
  placeholder = '',
  required = false,
}) => (
  <div>
    <div>
      <div>
        {label !== undefined && (
          <span>
            {label}
            {required && '*'}
          </span>
        )}
      </div>
      <input
        disabled={disabled}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        value={value}
      />
    </div>
    {errors[name] !== undefined && touched[name] && <div id={styles.rootError}>{errors[name]}</div>}
  </div>
);

export default FKInputText;
