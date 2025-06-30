import MainLayout from '../layouts/MainLayout'
import { useAboutData } from '../hooks/useAboutData'

// Componentes de sección
import {
  SectionHeader,
  ImageCarousel,
  WaterCycleSection,
  LaMicaSystemSection,
  FaunaSection,
  FloraSection,
  HistorySection,
  GuardiansSection,
  CuriositiesSection,
  ConservationSection,
  HowToHelpSection
} from '../components/about'

export default function AboutRefactored() {
  const { data, loading, error } = useAboutData()

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto p-4 md:p-6 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Cargando información del Antisana...</p>
          </div>
        </div>
      </MainLayout>
    )
  }

  if (error) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto p-4 md:p-6 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">😞</div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">¡Ups! Algo salió mal</h2>
            <p className="text-gray-600">No pudimos cargar la información del Antisana. Inténtalo de nuevo más tarde.</p>
          </div>
        </div>
      </MainLayout>
    )
  }

  if (!data) return null

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto p-4 md:p-6 text-gray-800">
        {/* Header principal */}
        <SectionHeader 
          title={data.header.title}
          subtitle={data.header.description}
        />

        {/* Carrusel de imágenes */}
        <ImageCarousel 
          images={data.carousel.images}
          captions={data.carousel.captions}
        />

        {/* Ciclo del agua */}
        <WaterCycleSection data={data.waterCycle} />

        {/* Sistema La Mica */}
        <LaMicaSystemSection data={data.lamicaSystem} />

        {/* Fauna */}
        <FaunaSection data={data.fauna} />

        {/* Flora */}
        <FloraSection data={data.flora} />

        {/* Historia */}
        <HistorySection data={data.history} />

        {/* Guardianes */}
        <GuardiansSection data={data.guardians} />

        {/* Curiosidades */}
        <CuriositiesSection data={data.curiosities} />

        {/* Conservación */}
        <ConservationSection data={data.conservation} />

        {/* Cómo ayudar */}
        <HowToHelpSection data={data.howToHelp} />
      </div>
    </MainLayout>
  )
}
