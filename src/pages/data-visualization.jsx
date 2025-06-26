import MainLayout from '../layouts/MainLayout'
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

const data = [
  { date: 'Enero', temp: 5 },
  { date: 'Febrero', temp: 6 },
  { date: 'Marzo', temp: 8 },
  { date: 'Abril', temp: 10 },
  { date: 'Mayo', temp: 13 },
]

export default function DataVisualization() {
  return (
    <MainLayout>
      <div className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Datos Climáticos</h2>
          
          {/* Gráfico Responsive */}
          <div className="w-full mb-8 bg-white p-4 rounded-lg shadow-md">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <Line type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={2} />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" />
                <YAxis label={{ value: '°C', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <section className="px-4 py-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Datos Hidrometeorológicos</h2>
            <p className="mb-6 text-gray-700 text-center max-w-4xl mx-auto">
              Los datos provienen de estaciones monitoreadas por la red PARAMH2O de la Empresa Pública Metropolitana de Agua Potable y Saneamiento (EPMAPS),
              enfocadas en la zona de influencia de la reserva ecológica Antisana.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-2 text-blue-800">Estación: Guaytaloma (C16)</h3>
                <p className="text-sm text-blue-600 mb-4">Ubicación: zona sur del Antisana</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Precipitación anual: <span className="font-semibold">850 mm</span></li>
                  <li>Temperatura promedio: <span className="font-semibold">8.5 °C</span></li>
                  <li>Nivel de agua estable</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-2 text-green-800">Estación: Salve Faccha (H56)</h3>
                <p className="text-sm text-green-600 mb-4">Ubicación: cuenca alta del río Papallacta</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Precipitación anual: <span className="font-semibold">950 mm</span></li>
                  <li>Temperatura promedio: <span className="font-semibold">6.2 °C</span></li>
                  <li>Incremento de caudal en época de lluvias</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  )
}
