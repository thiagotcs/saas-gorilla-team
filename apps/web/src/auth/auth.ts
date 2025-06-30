// import { getProfile } from '@/http/get-profile'
// import { cookies } from 'next/headers'
// import { redirect } from 'next/navigation'

// export async function isAuthenticated(): Promise<boolean> {
//   const cookieStore = await cookies()
//   return !!cookieStore.get('token')?.value
// }

// export async function getCurrentGym() {
//   const cookieStore = await cookies()
//   return cookieStore.get('org')?.value ?? null
// }

// export async function auth() {
//   const cookiesStore = await cookies()
//   const token = cookiesStore.get('token')?.value

//   if (!token) {
//     redirect('/auth/sign-in')
//   }

//   try {
//     const { user } = await getProfile()

//     return { user }
//   } catch {
//     redirect('/api/auth/sign-out')
//   }
// }
