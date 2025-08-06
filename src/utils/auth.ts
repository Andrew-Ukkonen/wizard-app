import { authEndpoints } from "./endpoints";

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

const refreshToken = async (): Promise<boolean> => {
  try {
    const res = await fetch(authEndpoints().refresh(), {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) return false;

    const data = await res.json();
    accessToken = data.accessToken;
    return true;
  } catch {
    return false;
  }
};

export const fetchWithAuth = async (input: RequestInfo, init: RequestInit = {}) => {
  const headers = new Headers(init.headers || {});
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  const response = await fetch(input, {
    ...init,
    headers,
    credentials: 'include', // for cookie-based refresh/logout
  });

  if (response.status === 401) {
    const refreshed = await refreshToken();
    if (refreshed) {
      headers.set('Authorization', `Bearer ${accessToken}`);
      return fetch(input, {
        ...init,
        headers,
        credentials: 'include',
      });
    } else {
      throw new Error('Unauthorized and refresh failed');
    }
  }

  return response;
};