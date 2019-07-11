import React, { ChangeEvent, FC } from 'react';
import { User } from '../../apis/users';

interface Props {
  onChange: (userName: string) => void;
  userName: string;
  users: User[];
}

const ExampleLogin: FC<Props> = ({ onChange, userName, users }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const changedUserName = event.target.value;
    onChange(changedUserName);
  };

  return (
    <select value={userName} onChange={handleChange} required={true}>
      <option value="" disabled={true}>
        Select user
      </option>
      {users.map(user => (
        <option key={user.id} value={user.name}>
          {user.name}
        </option>
      ))}
    </select>
  );
};

export default ExampleLogin;
