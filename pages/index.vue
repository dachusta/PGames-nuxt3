<template>
  <div class="page">
    <TheHeader class="header" />

    <main class="main">
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

      <VPagination class="pagination" @set-current-page="setCurrentPage" />
    </main>

    <footer class="footer"></footer>
  </div>
</template>

<script lang="ts" setup>
  // import { ref, onMounted, watch, toRefs, computed, method } from 'vue'
  // import { ref, onMounted } from 'vue'
  // import { useRouter } from 'vue-router'
  // import GameItem from '@/components/Games/GameItem.vue'
  // import TheSidebar from '@/components/TheSidebar.vue'
  // import VPagination from '@/components/VPagination.vue'

  // const emit = defineEmits(['change', 'delete'])

  const router = useRouter()

  const gameList = ref([])
  // const repositoriesMatchingSearchQuery = computed(() => {
  //   return repositories.value.filter(
  //     repository => repository.name.includes(searchQuery.value)
  //   )
  // })

  // const currentPage = ref(1)

  const setCurrentPage = (page) => {
    api({ page })
  }

  // const queryParam = {
  //   page: null,
  //   pageSize: null,
  //   search: null
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
    console.log(commits)
    gameList.value = commits.results
  }
  api()

  function toGameDetails(id) {
    console.log(router)
    console.log(navigateTo)

    navigateTo(`/${id}`)

    // router.push({ name: 'GameDetails', params: { id } })
  }
</script>

<style scoped>
  .page {
    display: grid;
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
    overflow: auto;
  }
  .cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
    margin: 60px 30px;
  }
  .pagination {
    margin: 30px;
  }
  @media (max-width: 1655px) {
    .cards {
      grid-template-columns: 1fr 1fr 1fr;
      gap: 30px;
    }
  }
</style>
