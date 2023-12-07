<template>
  <NuxtLink
    class="card game-item"
    :style="{
      width: (size === 'm' ? 328 : 224) + 'px',
    }"
  >
    <div class="card-top">
      <div
        class="wrap-img"
        :style="{
          width: (size === 'm' ? 328 : 224) + 'px',
          height: (size === 'm' ? 180 : 126) + 'px'
        }"
      >
        <img
          :src="props.screenshots[0]?.image"
          alt
        >
      </div>
      <div class="row">
        <span
          class="name"
          :style="{
            fontSize: (size === 'm' ? 18 : 16) + 'px',
          }"
        >{{ props.name }}</span>
        <span
          class="rating"
          :style="{ background: ratingBG(props.rating) }"
        >
          {{
            useCalcPercent(props.rating, 5)
          }}
        </span>
      </div>
    </div>
    <div class="platform-list">
      <span
        v-for="platform in props.platforms"
        :key="platform"
        class="platform-item"
      >{{ platform.platform.name }}</span>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  size: {
    type: String,
    default: 'm'
  },
  screenshots: {
    type: Array,
    default: null
  },
  name: {
    type: String,
    default: null
  },
  rating: {
    type: String,
    default: null
  },
  platforms: {
    type: String,
    default: null
  }
})

function ratingBG (params) {
  if (params > 3.5) {
    return 'rgb(50 255 50 / 70%)'
  } else if (params > 2.5) {
    return 'rgb(255 255 50 / 70%)'
  } else {
    return 'rgb(255 50 50 / 70%)'
  }
}
</script>

<style  scoped>
.game-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #3c4464;
  gap: 5px;
  border-radius: 10px;
  text-decoration: none;
  color: inherit;

  transition: transform .15s ease, box-shadow .2s ease;

  &:hover {
    transform: scale(105%);
    box-shadow: 0px 3px 15px 1px rgba(99, 163, 236, 0.75);
  }
}
.game-item .card-top {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 10px;
  overflow: hidden;
}
.game-item .wrap-img {
  /* width: 272px; */
  /* height: 175px; */
  /* width: 272px; */
  /* height: 153px; */
}
.game-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 0px 10px;
}
.game-item .name {
  font-size: 18px;
}
.game-item .rating {
  font-size: 12px;
  background: #1c1c2c;
  color: #1c1c2c;
  padding: 3px 5px;
  border-radius: 5px;
  font-weight: 700;
  align-self: flex-start;
}
.platform-list {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 5px;
  margin: 5px 10px;
  align-self: flex-end;
}
.platform-item {
  display: block;
  font-size: 14px;
  padding: 3px 5px 3px 5px;
  background: #1c1c2c;
  border-radius: 5px;
}
</style>
