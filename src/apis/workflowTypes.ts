const URL = 'http://localhost:3000/workflow-types';

interface WorkflowState {
  id: number;
}

interface WorkflowAction {
  id: number;
  name: string;
  workflowStates: WorkflowState[];
}

export interface WorkflowType {
  id: number;
  name: string;
  workflowActions: WorkflowAction[];
}

export const getWorkflowTypes = async () => {
  try {
    const result = await fetch(URL);
    const json = await result.json();
    // TODO: VALIDATE DATA
    return json as WorkflowType[];
  } catch (err) {
    throw new Error('500');
  }
};
