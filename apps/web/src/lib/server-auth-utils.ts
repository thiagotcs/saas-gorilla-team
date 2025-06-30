import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { getProfile } from '@/http/get-profile'

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  return !!cookieStore.get('token')?.value
}

export async function getCurrentGym() {
  const cookieStore = await cookies()
  return cookieStore.get('org')?.value ?? null
}

export async function getUserSession() {
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
