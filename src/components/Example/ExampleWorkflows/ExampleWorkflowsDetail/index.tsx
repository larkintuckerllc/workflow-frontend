import React, { FC } from 'react';

interface Props {
  id: number;
  stateId: number;
  userName: string;
}

const ExampleWorkflowsDetail: FC<Props> = ({ id, stateId, userName }) => {
  return <div>{id.toString()}</div>;
};

export default ExampleWorkflowsDetail;
