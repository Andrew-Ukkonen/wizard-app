import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { AUTH_ENDPOINTS } from '../utils/endpoints';
import { fetchWithAuth } from '../utils/auth';
import { Stack, CircularProgress } from '@mui/material';


export const Route = createFileRoute('/spellbook')({
  component: RouteComponent,
})

function RouteComponent() {
  const [authorized, setAuthorized] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const authorize = async () => {
    setIsLoading(true);

    try {
      const response = await fetchWithAuth(AUTH_ENDPOINTS.AUTHENTICATED, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', }
      } as RequestInit);
      return await response.text();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: string = await authorize();
        if (response) {
          setAuthorized(response);
        } else {
          throw new Error(response);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      isLoading && (
        <Stack alignItems="center" sx={{ py: 2 }}>
          <CircularProgress size={32} />
        </Stack>
      )
    );
  }

  return (
    <>
      <div>Welcome to the spellbook!</div>
      {authorized}
    </>
  );
}
