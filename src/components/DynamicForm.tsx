import Ajv, { ErrorObject } from 'ajv';
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
  initialValue?: string;
  label?: string;
  message?: string;
  name: string;
  pattern?: string;
  placeholder?: string;
}

interface SchemaById {
  [key: string]: DynamicFormField;
}

export interface Props {
  onSubmit: (formValues: FormValues) => Promise<void>;
  schema: DynamicFormField[];
}

const DynamicForm: FC<Props> = ({ onSubmit, schema }) => {
  const schemaById = useMemo(
    () =>
      schema.reduce<SchemaById>((accumulator: SchemaById, currentValue: DynamicFormField) => {
        return { ...accumulator, [currentValue.name]: currentValue };
      }, {}),
    [schema]
  );

  const initialValues = useMemo(
    () =>
      schema.reduce<FormValues>((accumulator: FormValues, currentValue: DynamicFormField) => {
        const initialValue =
          currentValue.initialValue !== undefined ? currentValue.initialValue : '';
        return { ...accumulator, [currentValue.name]: initialValue };
      }, {}),
    [schema]
  );

  // AJV DOES NOT PROVIDE A SCHEMA TYPE
  const ajvSchema = useMemo(() => {
    const initialValue = {
      $schema: 'http://json-schema.org/draft-07/schema#',
      properties: {},
      type: 'object',
    };
    return schema.reduce<any>((accumulator: any, currentValue: DynamicFormField) => {
      const property: any = {
        type: 'string',
      };
      if (currentValue.pattern !== undefined) {
        property.pattern = currentValue.pattern;
      }
      return {
        ...accumulator,
        properties: { ...accumulator.properties, [currentValue.name]: property },
      };
    }, initialValue);
  }, [schema]);

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
      let errors: FormErrors = {};
      const ajv = new Ajv({ allErrors: true });
      const validate = ajv.compile(ajvSchema);
      validate(formValues);
      if (validate.errors) {
        errors = validate.errors.reduce((accumulator: FormErrors, error: ErrorObject) => {
          const name = error.dataPath.substring(1);
          const customMessage = schemaById[name].message;
          const message = customMessage !== undefined ? customMessage : 'Required';
          return { ...accumulator, [name]: message };
        }, {});
      }
      return errors;
    },
    [ajvSchema, schemaById]
  );

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
            placeholder={field.placeholder}
            required={field.pattern !== undefined}
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
