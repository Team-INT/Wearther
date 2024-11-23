"use client"

import apiRequest from "@/utils/api";
import { useMutation } from "@tanstack/react-query";

const recommendApi = apiRequest('/recommendations')

export function GetRecommendTrendData<T>() {
  return useMutation<any, Error, T>({
    mutationFn: (value : T)=> recommendApi.create('', value)
  })
}
