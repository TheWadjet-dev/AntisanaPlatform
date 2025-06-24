import MainLayout from '../layouts/MainLayout'
import Trivia from '../interactive/Trivia'

export default function Interactive() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Trivia Interactiva: Ecosistema Antisana</h1>
        <Trivia />
      </div>
    </MainLayout>
  )
}
