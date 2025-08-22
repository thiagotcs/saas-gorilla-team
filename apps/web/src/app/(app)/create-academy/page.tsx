import { Header } from '@/components/header'
import AcademyForm from './academy-form'

export default function CreateAcademy() {
  return (
    <div className="space-y-4 py-4">
      <Header />
      <main className="mx-auto w-full max-w-[1200px] space-y-4">
        <h1 className="text-2xl font-bold">Nova Academia</h1>
        <AcademyForm />
      </main>
    </div>
  )
}
