import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import AccountService from '../services/AccountService'

export const Route = createFileRoute('/account')({
  component: RouteComponent,
})

function RouteComponent() {
  const [username, setUsername] = useState('')

  useEffect(() => {
    document.title = 'Wizard Idler - Account'
    AccountService.getAccount('').then((response) => {
      setUsername(response)
    })
  }, [])
  
  if (!username) {
    return <div>Loading...</div>
  }

  return <>
    <div>Hello "/account"!</div>
    <div>Your username is: {username}</div>
  </>
}
