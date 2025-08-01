import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/spellbook')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/spellbook"!</div>
}
