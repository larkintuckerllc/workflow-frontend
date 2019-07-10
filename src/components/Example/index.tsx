import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { getUsers, User } from '../../apis/users';

const Example: FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const load = async () => {
      try {
        const loadedUsers = await getUsers();
        setUsers(loadedUsers);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };
    load();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const changedUserName = event.target.value;
    setUserName(changedUserName);
  };

  if (loading) {
    return <div>LOADING</div>;
  }
  if (error) {
    return <div>ERROR</div>;
  }
  if (userName === '') {
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
  }
  return <div>Logged In</div>;
};

export default Example;
