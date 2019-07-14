import React, { FC, useCallback } from 'react';
import DynamicForm, { DynamicFormField, FormValues } from '../../../DynamicForm';

const wait = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });

const SCHEMA: DynamicFormField[] = [
  {
    initialValue: 'first',
    label: 'First Name',
    name: 'firstName',
    required: true,
  },
  {
    initialValue: 'last',
    label: 'Last Name',
    name: 'lastName',
    required: true,
  },
  {
    label: 'Another',
    name: 'another',
  },
];

const ExampleWorkflowsDetailA: FC = () => {
  const handleSubmit = useCallback(async (formValues: FormValues) => {
    await wait();
    window.console.log(formValues);
  }, []);

  return <DynamicForm onSubmit={handleSubmit} schema={SCHEMA} />;
};

export default ExampleWorkflowsDetailA;
