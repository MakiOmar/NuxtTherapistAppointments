export const useApi = () => {
  const config = useRuntimeConfig()
  const axios = $fetch.create({
    baseURL: config.public.apiBase,
    headers: {
      accept: 'application/json',
    },
  })
  return axios
}
