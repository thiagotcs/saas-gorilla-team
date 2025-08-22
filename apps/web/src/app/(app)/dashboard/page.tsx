import { Header } from '@/components/header'

export default async function Dashboard() {
  // const { user } = await getAuthenticatedUser()
  // return <pre>{JSON.stringify(user, null, 2)}</pre>
  return (
    <div className="space-y-4 py-4">
      <Header />
      <main className="mx-auto w-full max-w-[1200px] space-y-4">
        <p className="text-muted-foreground text-sm">Selecione uma academia</p>
      </main>
    </div>
  )
}
