import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/duels')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/duels"!</div>
}
