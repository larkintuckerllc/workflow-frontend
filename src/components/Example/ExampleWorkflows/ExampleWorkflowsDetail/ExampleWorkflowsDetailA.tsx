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
    label: 'First Name',
    message: 'Cannot be blank',
    name: 'firstName',
    pattern: '^\\S',
    placeholder: 'Enter first name',
  },
  {
    label: 'Last Name',
    message: 'Cannot be blank',
    name: 'lastName',
    pattern: '^\\S',
    placeholder: 'Enter last name',
  },
  {
    label: 'Optional',
    name: 'optional',
  },
];

const ExampleWorkflowsDetailA: FC = () => {
  const handleSubmit = useCallback(async (formValues: FormValues) => {
    await wait();
    window.console.log(formValues);
  }, []);

  return (
    <div>
      <h3>A</h3>
      <DynamicForm onSubmit={handleSubmit} schema={SCHEMA} />
    </div>
  );
};

export default ExampleWorkflowsDetailA;
