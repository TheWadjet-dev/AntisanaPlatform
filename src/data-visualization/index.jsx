import MainLayout from '@/layouts/MainLayout'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

const data = [
  { date: 'Jan', temp: 5 },
  { date: 'Feb', temp: 6 },
  { date: 'Mar', temp: 8 },
  { date: 'Apr', temp: 10 },
  { date: 'May', temp: 13 },
]

export default function DataVisualization() {
  return (
    <MainLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Climate Data</h2>
        <LineChart width={600} height={300} data={data}>
          <Line type="monotone" dataKey="temp" stroke="#3b82f6" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis label={{ value: '°C', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
        </LineChart>
      </div>
    </MainLayout>
  )
}
