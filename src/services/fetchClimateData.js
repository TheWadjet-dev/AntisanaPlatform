export async function fetchClimateData() {
  const response = await fetch('/api/climate')
  return await response.json()
}