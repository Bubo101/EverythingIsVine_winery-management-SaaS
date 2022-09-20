import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
let internalToken = null;

export function getToken() {
  return internalToken;
}

export async function getTokenInternal() {
  // const host = `${process.env.REACT_APP_WINERY_API}`;
  const host = "http://localhost:8000"
  const url = host + `/api/accounts/me/token/`;

  try {
    const response = await fetch(url, {
      credentials: 'include',
    });
    if (response.ok) {
      const data = await response.json();
      internalToken = data.token;
      return internalToken;
    }
  } catch (e) {}
  return false;
}

function handleErrorMessage(error) {
  if ('error' in error) {
    error = error.error;
    try {
      error = JSON.parse(error);
      if ('__all__' in error) {
        error = error.__all__;
      }
    } catch {}
  }
  if (Array.isArray(error)) {
    error = error.join('<br>');
  } else if (typeof error === 'object') {
    error = Object.entries(error).reduce(
      (acc, x) => `${acc}<br>${x[0]}: ${x[1]}`,
      ''
    );
  }
  return error;
}

export const AuthContext = createContext({
  token: null,
  setToken: () => null,
});

export const AuthProvider = (props) => {
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export function useToken() {
  const { token, setToken } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchToken() {
      const token = await getTokenInternal();
      setToken(token);
    }
    if (!token) {
      fetchToken();
    }
  }, [setToken, token]);

  async function logout(id) {
    if (token) {
      // const host = `${process.env.REACT_APP_WINERY_API}`;
      const host = "http://localhost:8000"
      const url = host + `/api/token/refresh/logout/`;
      await fetch(url, { method: 'delete', credentials: 'include' });
      internalToken = null;
      setToken(null);
      navigate(`/wineries/${id}/`);
    }
  }

  async function login(username, password, id) {
    // const host = `${process.env.REACT_APP_WINERY_API}`;
    const host = "http://localhost:8000"
    const url = host + `/login/`;

    const form = new FormData();
    form.append('username', username);
    form.append('password', password);
    const response = await fetch(url, {
      method: 'post',
      credentials: 'include',
      body: form,
    });
    if (response.ok) {
      const token = await getTokenInternal();
      setToken(token);
      navigate(`/wineries/${id}/`);
      return;
    }
    let error = await response.json();
    return handleErrorMessage(error);
  }

  async function signup(
    username,
    password,
    full_name,
    address,
    phone,
    email,
    employee,
    winery
  ) {
    // const host = `${process.env.REACT_APP_WINERY_API}`;
    const host = "http://localhost:8000"
    const url = host + `/api/accounts/users/`;
    const response = await fetch(url, {
      method: 'post',
      body: JSON.stringify({
        username,
        password,
        full_name,
        address,
        phone,
        email,
        employee,
        winery,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      await login(username, password, winery);
    }
    return false;
  }

  async function update(username, password, email, firstName, lastName) {
    // const host = `${process.env.REACT_APP_WINERY_API}`;
    const host = "http://localhost:8000"
    const url = host + `/api/accounts/`;
    const response = await fetch(url, {
      method: 'post',
      body: JSON.stringify({
        username,
        password,
        email,
        first_name: firstName,
        last_name: lastName,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      await login(username, password);
    }
    return false;
  }

  return [token, login, logout, signup, update];
}
