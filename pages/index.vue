<template>
    <main class="main">
      <Loader v-if="pending"/>

      <template v-else>
        <div class="cards">
          <GameCard
            v-for="game in games.list"
            :key="game.id"
            class="card game-item"
            :screenshots="game.short_screenshots"
            :name="game.name"
            :rating="game.rating"
            :platforms="game.parent_platforms"
            @click="toGame(game.id)"
          />
        </div>
  
        <Pagination
          class="pagination"
          v-model:currentPage="query.page"
          :gameCount="games.count"
          :pageSize="query.pageSize"
        />
      </template>
    </main>
</template>

<script lang="ts" setup>
  // const isLoading = useState('isLoading')

  const query = ref({ page: 1, pageSize: 21 })

  const route = useRoute()

  if (route.query?.page) {
    query.value.page = +route.query?.page
  }

  watch(() => query.value.page,
    () => {
      navigateTo({
        query: {
          page: query.value.page
        }
      })
    }
  )
  
  const { data: games, pending, error, refresh } = await useLazyFetch('/api/games', {
    query
  })
  // console.log(games);
  
  function toGame(id) {
    navigateTo(`/${id}`)
  }
</script>

<style scoped>
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
