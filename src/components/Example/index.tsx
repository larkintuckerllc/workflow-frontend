import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { getUsers, User } from '../../apis/users';
import ExampleLogin from './ExampleLogin';
import ExampleWorkflows from './ExampleWorkflows';

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
    return <ExampleLogin onChange={handleChange} userName={userName} users={users} />;
  }
  return <ExampleWorkflows userName={userName} />;
};

export default Example;
