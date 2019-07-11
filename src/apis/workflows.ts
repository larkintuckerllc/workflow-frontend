const URL = 'http://localhost:3000/workflows';

export interface Workflow {
  id: number;
  stateId: number;
  typeId: number;
}

export const getWorkflows = async () => {
  try {
    const result = await fetch(URL);
    const json = await result.json();
    // TODO: VALIDATE DATA
    return json as Workflow[];
  } catch (err) {
    throw new Error('500');
  }
};
