"use client"

import apiRequest from "@/utils/api";
import { useMutation } from "@tanstack/react-query";

const trendApi = apiRequest('/trend')

export function GetMonthlyTrendData() {
  // return useQuery({
  //   queryKey: ['trend'],
  //   queryFn: ()=> trendApi.get('', {
  //     params : value
  //   })
  // })
  return useMutation({
    mutationFn: (value)=> trendApi.get('', {
      params : value
    })
  })
}
