import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import { authEndpoints } from '../utils/endpoints';
import { fetchWithAuth } from '../utils/auth';


export const Route = createFileRoute('/spellbook')({
  component: RouteComponent,
})

function RouteComponent() {
  const [authorized, setAuthorized] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const mutation = useMutation({
    mutationFn: async () =>
      fetchWithAuth(authEndpoints().authenticated(), {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', }
      } as RequestInit).then(res => res.text())
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: string = await mutation.mutateAsync();
        if (response) {
          setAuthorized(response);
        } else {
          console.error(response);
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
    return <div>Loading...</div>;
  }

  return <>
    <div>Welcome to the spellbook!</div>
    {authorized}
  </>
}
