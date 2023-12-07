export default defineEventHandler(async (event) => {
  const { apiKey } = useRuntimeConfig()
  const query = getQuery(event)

  const { page, pageSize, search, ordering } = query || {}

  let url = `https://api.rawg.io/api/games?key=${apiKey}`

  if (page) {
    url += `&page=${page}`
  }
  if (pageSize) {
    url += `&page_size=${pageSize}`
  }
  if (search) {
    url += `&search=${search}`
  }
  if (ordering) {
    url += `&ordering=${ordering}`
  }

  const response = await $fetch(url, {
    retry: 3,
    retryDelay: 500, // ms
  })

  return {
    count: response.count,
    list: response.results
  }
})