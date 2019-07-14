import { Field, Form, Formik, FormikActions, FormikProps } from 'formik';
import React, { FC, useCallback, useMemo } from 'react';
import FKInputText from './FKInputText';

export interface FormValues {
  [key: string]: string;
}

interface FormErrors {
  [key: string]: string;
}

export interface DynamicFormField {
  name: string;
  initialValue?: string;
  label?: string;
  required?: boolean;
}

export interface Props {
  onSubmit: (formValues: FormValues) => Promise<void>;
  schema: DynamicFormField[];
}

const DynamicForm: FC<Props> = ({ onSubmit, schema }) => {
  const handleRender = useCallback(
    ({ isSubmitting, isValid, status = {} }: FormikProps<FormValues>) => (
      <Form>
        {schema.map((field: DynamicFormField) => (
          <Field
            component={FKInputText}
            disabled={isSubmitting}
            key={field.name}
            label={field.label}
            name={field.name}
            required={field.required}
          />
        ))}
        {status.failed && <div>FAILED</div>}
        <button disabled={isSubmitting || !isValid} type="submit">
          Submit
        </button>
      </Form>
    ),
    [schema]
  );
  const handleSubmit = useCallback(
    async (
      values: FormValues,
      { resetForm, setStatus, setSubmitting }: FormikActions<FormValues>
    ) => {
      setStatus({});
      try {
        await onSubmit(values);
        resetForm();
      } catch (err) {
        setStatus({ failed: true });
      }
      setSubmitting(false);
    },
    [onSubmit]
  );

  const handleValidate = useCallback(
    (formValues: FormValues) => {
      const errors: FormErrors = {};
      schema.forEach(field => {
        if (field.required !== true) {
          return;
        }
        const { name } = field;
        if (formValues[name] === undefined) {
          errors[name] = 'Required';
        } else if (formValues[name].trim() === '') {
          errors[name] = 'Required';
        }
      });
      return errors;
    },
    [schema]
  );
  const initialValues = useMemo(
    () =>
      schema.reduce((accumulator: FormValues = {}, currentValue: DynamicFormField) => {
        const initialValue =
          currentValue.initialValue !== undefined ? currentValue.initialValue : '';
        return { ...accumulator, [currentValue.name]: initialValue };
      }, {}),
    [schema]
  );
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      render={handleRender}
      validate={handleValidate}
    />
  );
};

export default DynamicForm;
