"use client"

import apiRequest from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

const weatherApi = apiRequest('/weather')

export function GetCurrentWeather() {
  return useQuery({
    queryKey: ['test'],
    queryFn: ()=> weatherApi.get('/current')
  })
}
