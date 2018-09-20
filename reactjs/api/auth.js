import fetch from 'isomorphic-fetch';

const baseUrl = 'http://localhost:3030';

const api = {
  auth: {
    async signIn(username, password) {
      const response = await fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.status === 200) {
        const data = await response.json();
        return data;
      }
      const data = await response.json();
      throw new Error(data.message);
    },
    async signUp(user) {
      const response = await fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(user),
      });
      if (response.status === 200) {
        const data = await response.json();
        return data;
      }
      const data = await response.json();
      throw new Error(data.error);
    },
  },
  users: {
    async getSingle(id = 1) {
      const response = await fetch(`${baseUrl}/users/${id}`);
      const data = await response.json();
      return data;
    },
  },
};

export default api;
