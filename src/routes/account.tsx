import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/account')({
  component: RouteComponent,
})

function RouteComponent() {
  useEffect(() => {
    document.title = 'Wizard Idler - Account'
  }, [])

  return <>
    <div>Hello "/account"!</div>
  </>
}
