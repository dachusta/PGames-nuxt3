<template>
  <div class="game-series">
    <div class="game-series__title">
      Game series:
    </div>
    <div
      ref="gameSeriesListEl"
      class="game-series__list"
      @mousedown="startScroll"
      @mousemove="moveScroll"
      @mouseup="endScroll"
      @mouseleave="endScroll"
    >
      <NuxtLink
        v-for="series in series?.results"
        :key="series.id"
        class="game"
        :to="`/${series.id}`"
      >
        <img
          class="game__img"
          :src="series?.background_image"
          alt="game"
          @mousedown.prevent
        >
        <div class="game__name">
          {{ series.name }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line
const props = defineProps({
  // list: {
  //   type: Array,
  //   default: () => []
  // }
  gameId: {
    type: String,
    required: true
  },
})
// function toGameDetails (id) {
//   navigateTo(`/${id}`)
// }

const { data: series } = await useLazyFetch(`/api/games/${props.gameId}/game-series`)

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

<style scoped>
.game-series {
  display: grid;
  padding-top: 15px;
  background: rgba(39, 41, 63, 0.75);

  .game-series__title {
    display: flex;
    justify-self: flex-start;
    margin-left: 30px;
    padding: 5px 20px;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 1px;
    background: rgba(102, 204, 51, 0.75);
  }

  .game-series__list {
    display: flex;
    gap: 15px;
    padding: 10px 30px 15px 30px;
    overflow-y: hidden;
  }

  .game {
    display: grid;
    align-content: flex-start;
    max-width: 256px;
    border-radius: 5px;
    background: #3C4464;
    color: inherit;
    text-decoration: none;
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.2s ease;

    &:hover {
      transform: scale(101%);
      box-shadow: 0px 0px 10px 1px rgb(99 163 236 / 75%);
    }

    .game__img {
      width: 256px;
      height: 144px;
      border-top: 5px;
      background: rgba(39, 41, 63);
    }
    .game__name {
      padding: 5px;
    }
  }
}
</style>
