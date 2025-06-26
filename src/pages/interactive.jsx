import MainLayout from '../layouts/MainLayout'
import Trivia from '../interactive/Trivia'

export default function Interactive() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 text-gray-800">
            Trivia Interactiva: Ecosistema Antisana
          </h1>
          <Trivia />
        </div>
      </div>
    </MainLayout>
  )
}
