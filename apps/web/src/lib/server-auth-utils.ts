import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { getProfile } from '@/http/get-profile'
import { getAcademyMembership } from '@/http/get-academy-membership'
import { defineAbilityFor, Role } from '@saas/auth'

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  return !!cookieStore.get('token')?.value
}

export async function getCurrentAcademy(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get('gyms')?.value ?? null
}

export async function getAuthenticatedUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await getProfile()
    return { user }
  } catch (error) {
    console.error('Erro ao buscar perfil com sessão autenticada:', error)
    ;(await cookieStore).delete('token')
    redirect('/auth/sign-in?error=session_expired')
  }
}

export async function getCurrentAcademyMembership() {
  const academySlug = await getCurrentAcademy()
  if (!academySlug) return null

  try {
    const { membership } = await getAcademyMembership(academySlug)
    return membership
  } catch (error) {
    console.error('Erro ao obter dados de membro da academia:', error)
    const cookieStore = await cookies()
    cookieStore.delete('academy')
    redirect('/auth/sign-in?error=invalid_academy_membership')
  }
}

export async function defineUserAbility() {
  const membership = await getCurrentAcademyMembership()
  if (!membership) return null

  const ability = defineAbilityFor({
    id: membership.userId,
    role: membership.role,
    __typename: 'User',
  })

  return ability
}
