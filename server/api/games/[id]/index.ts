export default defineEventHandler(async (event) => {
  const { apiKey } = useRuntimeConfig()
  const id = getRouterParam(event, 'id')

  const url = `https://api.rawg.io/api/games/${id}?key=${apiKey}`

  const response = await $fetch(url, {
    retry: 3,
    retryDelay: 500, // ms
  })
  return response
})