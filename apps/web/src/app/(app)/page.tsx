import { getUserSession } from '@/lib/server-auth-utils'

export default async function Home() {
  const { user } = await getUserSession()
  console.log('user', user)
  return <pre>{JSON.stringify(user, null, 2)}</pre>
}
