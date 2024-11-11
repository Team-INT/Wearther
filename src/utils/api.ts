import { RequestOptionsType, RequestType } from "@/types/TypeApi"



export function apiRequest(basePoint : string) {
  const baseUrl = process.env.API_BASE_URL || 'http://192.168.0.31:8000'
  const apiUrl = `${baseUrl}${basePoint}`

  async function setRequest({endpoint, type, options={}, data} : RequestType) {
    const { headers={}, params} = options

    const queryString = params ? '?' + new URLSearchParams(params).toString() : ''

    const res = await fetch(`${apiUrl}${endpoint}${queryString}`, {
      method : type.toUpperCase(),
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: data? JSON.stringify(data) : undefined
    })

    if(!res.ok){
      console.log('api 요청 오류')
    }

    return res.json()
  } 
  
  return {
    get: (endpoint: string, options?: RequestOptionsType)=>{
      return setRequest({endpoint, type : 'get', options})
    },
    create: (endpoint: string, data: any, options?: RequestOptionsType)=>{
      return setRequest({endpoint, type :'post', options, data})
    },
    update: (endpoint: string, data: any, options?: RequestOptionsType)=>{
      return setRequest({endpoint, type :'put', options, data})
    },
    delete: (endpoint: string, options?: RequestOptionsType)=> {
      return setRequest({endpoint, type : 'delete', options})
    },
  }
}