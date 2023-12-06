export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const url = `https://api.rawg.io/api/games/${id}/additions?key=8f4899e2e65a42e58807bc9bbec35cca`

  const response = await $fetch(url, {
    retry: 3,
    retryDelay: 500, // ms
  })
  // console.log(response);
  
  return response
})