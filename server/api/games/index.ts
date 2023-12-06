export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  const { page, pageSize, search, ordering } = query || {}

  const key = '8f4899e2e65a42e58807bc9bbec35cca'
  let url = `https://api.rawg.io/api/games?key=${key}`

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