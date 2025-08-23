import { AUTH_ENDPOINTS } from "./endpoints";

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
  console.log("Access token set:", token);
  if (typeof token === "string") {
    localStorage.setItem('accessToken', token);
  }
};

const refreshToken = async (): Promise<boolean> => {
  console.log("Refreshing access token...");
  try {
    const res = await fetch(AUTH_ENDPOINTS.REFRESH, {
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
  console.log("Fetching with auth...", input);
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