<template>
  <div class="page">
    <TheHeader class="header" />

    <main class="main">
      <Loader v-if="!gameList.length"/>

      <template v-else>
        <div class="cards">
          <GameItem
            v-for="game in gameList"
            :key="game.id"
            class="card game-item"
            :screenshots="game.short_screenshots"
            :name="game.name"
            :rating="game.rating"
            :platforms="game.parent_platforms"
            @click="toGameDetails(game.id)"
          />
        </div>
  
        <VPagination
          class="pagination"
          v-model:currentPage="page"
          :gameCount="gameCount"
          :pageSize="pageSize"
        />
      </template>
    </main>
  </div>
</template>

<script lang="ts" setup>
  // const emit = defineEmits(['change', 'delete'])

  const gameList = ref([])
  // const repositoriesMatchingSearchQuery = computed(() => {
  //   return repositories.value.filter(
  //     repository => repository.name.includes(searchQuery.value)
  //   )
  // })

  // const currentPage = ref(1)

  const route = useRoute()

// When accessing /posts/1, route.params.id will be 1
  console.log(route.query)

  const page = ref(1)
  const pageSize = ref(21)
  const gameCount = ref(0)

  watch(
    () => page.value,
    () => {
      navigateTo({
        query: {
          page: page.value
        }
      })
    }
  )

  watch(
    () => route.query.page,
    () => {
      api({
        pageSize: pageSize.value,
        page: route.query?.page
      })
    }
  )


  // const setCurrentPage = (page) => {
  //   const pageSize = pageSize.value
  //   const page = page.value
  //   api({ pageSize, page })
  // }

  // const queryParam = {
  //   page: null,
  //   pageSize: 21,
  //   // search: null
  // }

  // const possibleNumberOfGames = ref(812156)
  // const pageSize = ref(20)

  async function api(queryParam) {
    const { page, pageSize, search, ordering } = queryParam || {}
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
    // Available fields: name, released, added, created, updated, rating, metacritic.
    // You can reverse the sort order adding a hyphen, for example: -released.
    if (ordering) {
      url += `&ordering=${ordering}`
    }

    const response = await fetch(url)
    const commits = await response.json()
    // const commits = response.json()
    // console.log(commits)
    gameCount.value = commits.count
    gameList.value = commits.results
  }
  onMounted(() => {
    if (route.query?.page) {
      page.value = +route.query?.page
    }
    api({
      pageSize: pageSize.value,
      page: page.value
    })
  })

  function toGameDetails(id) {

    navigateTo(`/${id}`)

    // router.push({ name: 'GameDetails', params: { id } })
  }
</script>

<style scoped>
.page {
  display: grid;
  grid-template-areas: 
    "TheHeader"
    "Main";
  grid-template-rows: auto 1fr auto;
  overflow: hidden;
  /* gap: 30px; */
  /* padding: 30px; */
  height: 100dvh;
}
.header {
  display: flex;
  /* height: 100px; */
}
.main {
  grid-area: Main;
  display: grid;
  grid-template-rows: 1fr min-content;
  justify-content: center;
  overflow: auto;
}
.cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin: 60px 30px;
  max-width: 1024px;
  min-width: 1024px;
}
.pagination {
  margin: 30px;
}
</style>
