<template>
  <div v-if="additions?.results.length" class="additions">
    <div class="additions__title">
      Additions:
    </div>
    <div
      ref="gameAdditionsListEl"
      class="game-additions__list"
      @mousedown="startScroll"
      @mousemove="moveScroll"
      @mouseup="endScroll"
      @mouseleave="endScroll"
    >
      <GameCard
        v-for="addition in additions?.results"
        :key="addition.id"
        class="card game-item"
        :size="'s'"
        :screenshots="addition.short_screenshots"
        :name="addition.name"
        :rating="addition.rating"
        :platforms="addition.parent_platforms"
        :to="`/${addition.id}`"
      />
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  // list: {
  //   type: Array,
  //   default: () => []
  // },
  gameId: {
    type: String,
    required: true
  },
})

const { data: additions } = await useLazyFetch(`/api/games/${props.gameId}/additions`)

const gameSeriesListEl = ref(null)

const isDrag = ref(false)

function startScroll () {
  isDrag.value = true
}
function moveScroll (params) {
  if (!isDrag.value) return

  gameSeriesListEl.value.scrollTo(
    gameSeriesListEl.value.scrollLeft - params.movementX,
    0
  )
}
function endScroll () {
  isDrag.value = false
}
</script>

<style  scoped>
.additions {
  display: grid;
  padding-top: 15px;
  background: rgba(39, 41, 63, 0.75);

  .additions__title {
    display: flex;
    justify-self: flex-start;
    margin-left: 30px;
    padding: 5px 20px;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 1px;
    background: rgba(102, 204, 51, 0.75);
  }
  .game-additions__list {
    display: flex;
    gap: 15px;
    padding: 10px 30px 15px 30px;
    overflow: auto;
  }
}
</style>
