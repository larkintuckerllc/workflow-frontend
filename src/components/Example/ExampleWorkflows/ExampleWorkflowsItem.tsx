import React, { FC } from 'react';

interface Props {
  id: number;
  onClick: (id: number) => void;
}

const ExampleWorkflowsItem: FC<Props> = ({ id, onClick }) => {
  const handleClick = () => {
    onClick(id);
  };

  return <button onClick={handleClick}>{id.toString()}</button>;
};

export default ExampleWorkflowsItem;
