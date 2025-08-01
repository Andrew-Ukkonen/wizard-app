import { createFileRoute } from '@tanstack/react-router'
import Hero from '../components/Hero'
import UserAuthentication from '../components/UserAuthentication'

export const Route = createFileRoute('/register')({
  component: Register,
})

function Register() {
  return <>
    <Hero />
    <UserAuthentication defaultTab="signUp" />
  </>
}
