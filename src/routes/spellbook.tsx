import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { authEndpoints } from '../utils/endpoints';
import { useAuth } from '../contexts/AuthContext';

export const Route = createFileRoute('/spellbook')({
  component: RouteComponent,
})

function RouteComponent() {
  const { accessToken } = useAuth();
  const [response, setResponse] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async () =>
      fetch(authEndpoints().authorized(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      }).then(res => res.json())
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authorized: string = await mutation.mutateAsync();
        if (authorized) {
          setResponse(authorized);
          console.log('Spellbook response:', authorized);
        } else {
          console.error(authorized);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Call the async function
  }, [])

  return <>
    <div>Hello "/spellbook"!</div>
    <div>{response}</div>
  </>
}
