const URL = 'http://localhost:3000/users';

export interface User {
  id: number;
  name: string;
  profileId: number;
}

export const getUsers = async () => {
  try {
    const result = await fetch(URL);
    const json = await result.json();
    // TODO: VALIDATE DATA
    return json as User[];
  } catch (err) {
    throw new Error('500');
  }
};
