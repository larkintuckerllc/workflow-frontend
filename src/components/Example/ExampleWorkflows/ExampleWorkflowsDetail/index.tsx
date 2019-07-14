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

interface EnabledActionByName {
  [key: string]: boolean;
}

const computeEnabledActionByName = (stateId: number, workflowType?: WorkflowType) => {
  if (workflowType === undefined) {
    return {};
  }
  return workflowType.workflowActions.reduce<EnabledActionByName>((prev, workflowAction) => {
    const matchingWorkflowState = workflowAction.workflowStates.find(
      workflowState => workflowState.id === stateId
    );
    return { ...prev, [workflowAction.name]: matchingWorkflowState !== undefined };
  }, {});
};

const ExampleWorkflowsDetail: FC<Props> = ({ id, stateId, userName, typeId, workflowTypes }) => {
  const currentWorkflowType = workflowTypes.find(workflowType => workflowType.id === typeId);
  const enabledActionByName = useMemo(
    () => computeEnabledActionByName(stateId, currentWorkflowType),
    [stateId, currentWorkflowType]
  );

  if (currentWorkflowType === undefined) {
    return <div>ERROR</div>;
  }
  // TODO: SHOW BUTTONS INDIVIUALLY
  // TODO: SHOW C AS ANOTHER FORM
  return (
    <div>
      <div>{userName}</div>
      <div>id: {id.toString()}</div>
      <div>typeId: {typeId.toString()}</div>
      <div>stateId: {stateId.toString()}</div>
      {enabledActionByName.A ? <ExampleWorkflowsDetailA /> : <div>A DISABLED</div>}
      <div>
        <button disabled={!enabledActionByName.B}>B</button>
      </div>
      {enabledActionByName.C ? <ExampleWorkflowsDetailA /> : <div>C DISABLED</div>}
      <div>
        <button disabled={!enabledActionByName.D}>D</button>
        <button disabled={!enabledActionByName.E}>E</button>
        <button disabled={!enabledActionByName.F}>F</button>
      </div>
    </div>
  );
};

export default ExampleWorkflowsDetail;
