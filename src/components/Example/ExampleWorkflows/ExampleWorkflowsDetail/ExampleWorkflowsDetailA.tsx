import { Field, Form, Formik, FormikActions, FormikProps } from 'formik';
import React, { FC, useCallback } from 'react';
import FKInputForm from '../../../FKInputText';

interface FormValues {
  name: string;
}

interface FormErrors {
  [key: string]: string;
}

const ExampleWorkflowsDetailA: FC = () => {
  const handleRender = useCallback(
    ({ isSubmitting, isValid }: FormikProps<FormValues>) => (
      <Form>
        <Field component={FKInputForm} name="name" />
        <button disabled={isSubmitting || !isValid} type="submit">
          Submit
        </button>
      </Form>
    ),
    []
  );
  const handleSubmit = useCallback(
    (values: FormValues, { resetForm, setSubmitting }: FormikActions<FormValues>) => {
      window.console.log(values);
      setSubmitting(false);
      resetForm();
    },
    []
  );

  const handleValidate = useCallback(({ name }: FormValues) => {
    const errors: FormErrors = {};
    if (name === '') {
      errors.name = 'Required';
    }
    return errors;
  }, []);

  return (
    <Formik
      initialValues={{ name: '' }}
      onSubmit={handleSubmit}
      render={handleRender}
      validate={handleValidate}
    />
  );
};

export default ExampleWorkflowsDetailA;
