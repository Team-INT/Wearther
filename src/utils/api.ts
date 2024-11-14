import { RequestOptionsType, RequestType } from "@/lib/types/TypeApi"



export default function apiRequest(basePoint: string) {
  const baseUrl = process.env.API_BASE_URL || 'http://192.168.0.31:8000';
  const apiUrl = `${baseUrl}${basePoint}`;

  // 요청 URL과 옵션을 생성하는 헬퍼 함수
  function setRequest({ endpoint, type, options = {}, data }: RequestType) {
    const { headers = {}, params } = options;
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    const url = `${apiUrl}${endpoint}${queryString}`;

    const fetchOptions: RequestInit = {
      method: type.toUpperCase(),
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    };

    return { url, fetchOptions };
  }

  // 각 API 메서드를 비동기로 호출
  return {
    get: async function (endpoint: string, options?: RequestOptionsType) {
      const { url, fetchOptions } = setRequest({ endpoint, type: 'get', options });
      const response = await fetch(url, fetchOptions);
      return handleResponse(response);
    },
    create: async function (endpoint: string, data: any, options?: RequestOptionsType) {
      const { url, fetchOptions } = setRequest({ endpoint, type: 'post', options, data });
      const response = await fetch(url, fetchOptions);
      return handleResponse(response);
    },
    update: async function(endpoint: string, data: any, options?: RequestOptionsType) {
      const { url, fetchOptions } = setRequest({ endpoint, type: 'put', options, data });
      const response = await fetch(url, fetchOptions);
      return handleResponse(response);
    },
    delete: async function(endpoint: string, options?: RequestOptionsType) {
      const { url, fetchOptions } = setRequest({ endpoint, type: 'delete', options });
      const response = await fetch(url, fetchOptions);
      return handleResponse(response);
    },
  };
}

// 응답 처리 함수
function handleResponse(response: Response) {
  if (!response.ok) {
    console.error('API 요청 오류:', response.status, response.statusText);
    throw new Error(`API 요청 실패: ${response.statusText}`);
  }
  return response.json();
}