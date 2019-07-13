import React, { FC, useMemo } from 'react';
import { WorkflowType } from '../../../../apis/workflowTypes';
import ExampleWorkflowsDetailA from './ExampleWorkflowsDetailA';

interface Props {
  id: number;
  stateId: number;
  typeId: number;
  userName: string;
  workflowTypes: WorkflowType[];
}

interface EnabledActionById {
  [key: number]: boolean;
}

const computeEnabledActionById = (stateId: number, workflowType?: WorkflowType) => {
  if (workflowType === undefined) {
    return {};
  }
  return workflowType.workflowActions.reduce<EnabledActionById>((prev, workflowAction) => {
    const matchingWorkflowState = workflowAction.workflowStates.find(
      workflowState => workflowState.id === stateId
    );
    return { ...prev, [workflowAction.id]: matchingWorkflowState !== undefined };
  }, {});
};

const ExampleWorkflowsDetail: FC<Props> = ({ id, stateId, userName, typeId, workflowTypes }) => {
  const currentWorkflowType = workflowTypes.find(workflowType => workflowType.id === typeId);
  const enabledActionById = useMemo(() => computeEnabledActionById(stateId, currentWorkflowType), [
    stateId,
    currentWorkflowType,
  ]);

  if (currentWorkflowType === undefined) {
    return <div>ERROR</div>;
  }
  return (
    <div>
      <div>{userName}</div>
      <div>id: {id.toString()}</div>
      <div>typeId: {typeId.toString()}</div>
      <div>stateId: {stateId.toString()}</div>
      {currentWorkflowType.workflowActions.map(workflowAction => (
        <button key={workflowAction.id} disabled={!enabledActionById[workflowAction.id]}>
          {workflowAction.name}
        </button>
      ))}
      <ExampleWorkflowsDetailA />
    </div>
  );
};

export default ExampleWorkflowsDetail;
