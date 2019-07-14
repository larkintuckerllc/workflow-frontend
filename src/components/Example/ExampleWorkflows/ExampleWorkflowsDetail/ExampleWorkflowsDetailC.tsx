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
    label: 'Name',
    message: 'Cannot be blank',
    name: 'name',
    pattern: '^\\S',
    placeholder: 'Enter name',
  },
];

const ExampleWorkflowsDetailC: FC = () => {
  const handleSubmit = useCallback(async (formValues: FormValues) => {
    await wait();
    window.console.log(formValues);
  }, []);

  return (
    <div>
      <h3>C</h3>
      <DynamicForm onSubmit={handleSubmit} schema={SCHEMA} />
    </div>
  );
};

export default ExampleWorkflowsDetailC;
