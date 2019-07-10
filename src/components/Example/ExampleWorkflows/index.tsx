import React, { FC, useEffect, useState } from 'react';
import { getWorkflows, Workflow } from '../../../apis/workflows';

interface Props {
  userName: string;
}

interface WorkflowById {
  [key: number]: Workflow;
}

const ExampleWorkflows: FC<Props> = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [workflowIds, setWorkflowIds] = useState<number[]>([]);
  const [workflowById, setWorkflowById] = useState<WorkflowById>({});
  useEffect(() => {
    const load = async () => {
      try {
        // TODO: GET PERMISSIONS ETC
        const loadedWorkflows = await getWorkflows();
        const loadedWorkflowById = loadedWorkflows.reduce<WorkflowById>(
          (accumulator, currentValue) => {
            return { ...accumulator, [currentValue.id]: currentValue };
          },
          {}
        );
        const loadedWorkflowIds = loadedWorkflows.map(workflow => workflow.id);
        setWorkflowById(loadedWorkflowById);
        setWorkflowIds(loadedWorkflowIds);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return <div>LOADING</div>;
  }
  if (error) {
    return <div>ERROR</div>;
  }
  return (
    <ul>
      {workflowIds.map(id => (
        <ul key={id}>{workflowById[id].id}</ul>
      ))}
    </ul>
  );
};

export default ExampleWorkflows;
