import React, { ChangeEvent, FC } from 'react';
import { User } from '../../apis/users';

interface Props {
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  userName: string;
  users: User[];
}

const ExampleLogin: FC<Props> = ({ onChange, userName, users }) => {
  return (
    <select value={userName} onChange={onChange} required={true}>
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
