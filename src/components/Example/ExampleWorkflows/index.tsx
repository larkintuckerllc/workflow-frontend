import React, { FC, useCallback, useEffect, useState } from 'react';
import { getWorkflows, Workflow } from '../../../apis/workflows';
import { getWorkflowTypes, WorkflowType } from '../../../apis/workflowTypes';
import ExampleWorkflowsDetail from './ExampleWorkflowsDetail';
import ExampleWorkflowsItem from './ExampleWorkflowsItem';

interface Props {
  userName: string;
}

interface WorkflowById {
  [key: number]: Workflow;
}

const ExampleWorkflows: FC<Props> = ({ userName }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [workflowIds, setWorkflowIds] = useState<number[]>([]);
  const [workflowById, setWorkflowById] = useState<WorkflowById>({});
  const [workflowTypes, setWorkflowTypes] = useState<WorkflowType[]>([]);
  const [currentWorkflow, setCurrentWorkflow] = useState<number | null>(null);
  useEffect(() => {
    const load = async () => {
      try {
        // TODO: GET PERMISSIONS
        const loadedWorkflowsPromise = getWorkflows();
        const loadedWorkflowTypesPromise = getWorkflowTypes();
        const [loadedWorkflows, loadedWorkflowTypes] = await Promise.all([
          loadedWorkflowsPromise,
          loadedWorkflowTypesPromise,
        ]);
        const loadedWorkflowById = loadedWorkflows.reduce<WorkflowById>(
          (accumulator, currentValue) => {
            return { ...accumulator, [currentValue.id]: currentValue };
          },
          {}
        );
        const loadedWorkflowIds = loadedWorkflows.map(workflow => workflow.id);
        setWorkflowTypes(loadedWorkflowTypes);
        setWorkflowById(loadedWorkflowById);
        setWorkflowIds(loadedWorkflowIds);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };
    load();
  }, []);

  const handleClick = useCallback((id: number) => {
    setCurrentWorkflow(id);
  }, []);

  if (loading) {
    return <div>LOADING</div>;
  }
  if (error) {
    return <div>ERROR</div>;
  }
  if (currentWorkflow === null) {
    return (
      <div>
        <div>{userName}</div>
        {workflowIds.map(id => (
          <ExampleWorkflowsItem key={id} id={id} onClick={handleClick} />
        ))}
      </div>
    );
  }
  return (
    <ExampleWorkflowsDetail
      id={currentWorkflow}
      stateId={workflowById[currentWorkflow].stateId}
      typeId={workflowById[currentWorkflow].typeId}
      userName={userName}
      workflowTypes={workflowTypes}
    />
  );
};

export default ExampleWorkflows;
