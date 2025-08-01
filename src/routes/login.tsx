import { createFileRoute } from '@tanstack/react-router'
import Hero from '../components/Hero'
import UserAuthentication from '../components/UserAuthentication'

export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
  return <>
    <Hero />
    <UserAuthentication defaultTab="signIn" />
  </>
}
