"use client"

import apiRequest from "@/utils/api";
import { useMutation, useQuery } from "@tanstack/react-query";


export function boardApi(category : string){
  const api = apiRequest(category)

  function GetListData() {
    return useQuery({
      queryKey: [category],
      queryFn: ()=> api.get('')
    })
  }

  function GetBoardData(id : string) {
    return useQuery({
      queryKey: [category, id],
      queryFn: (data)=> api.create(`/${id}`, data)
    })
  }

  function PostListData() {
    return useMutation({
      mutationFn: (data)=> api.create('', data)
    })
  }

  function ModifyBoardData(id : string) {
    return useMutation({
      mutationFn: (data)=> api.update(`/${id}`, data)
    })
  }

  function DeleteBoardData(id : string) {
    return useMutation({
      mutationFn: ()=> api.delete(`/${id}`)
    })
  }

  return {
    GetListData,
    GetBoardData,
    PostListData,
    ModifyBoardData,
    DeleteBoardData
  }
}



