import { apiRequest } from "@/utils/api";

const weatherApi = apiRequest('/weather')

export async function getCurrentWeather() {
  const data = await weatherApi.get('/current')

  return data
}
