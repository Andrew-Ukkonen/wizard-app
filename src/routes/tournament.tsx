import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tournament')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tournament"!</div>
}
