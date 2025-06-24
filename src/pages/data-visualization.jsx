import MainLayout from '../layouts/MainLayout'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

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
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Datos Climáticos</h2>
        <LineChart width={600} height={300} data={data}>
          <Line type="monotone" dataKey="temp" stroke="#3b82f6" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis label={{ value: '°C', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
        </LineChart>

        <section className="max-w-4xl mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-4">Datos Hidrometeorológicos</h2>
          <p className="mb-4 text-gray-700">
            Los datos provienen de estaciones monitoreadas por la red PARAMH2O de la Empresa Pública Metropolitana de Agua Potable y Saneamiento (EPMAPS),
            enfocadas en la zona de influencia de la reserva ecológica Antisana.
          </p>

          <div className="bg-gray-100 rounded p-4 mb-4">
            <h3 className="text-xl font-semibold">Estación: Guaytaloma (C16)</h3>
            <p className="text-sm text-gray-600">Ubicación: zona sur del Antisana</p>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              <li>Precipitación anual: 850 mm</li>
              <li>Temperatura promedio: 8.5 °C</li>
              <li>Nivel de agua estable</li>
            </ul>
          </div>

          <div className="bg-gray-100 rounded p-4">
            <h3 className="text-xl font-semibold">Estación: Salve Faccha (H56)</h3>
            <p className="text-sm text-gray-600">Ubicación: cuenca alta del río Papallacta</p>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              <li>Precipitación anual: 950 mm</li>
              <li>Temperatura promedio: 6.2 °C</li>
              <li>Incremento de caudal en época de lluvias</li>
            </ul>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
