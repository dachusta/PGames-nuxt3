<template>
  <div class="stores">
    <div class="stores__title">
      Where to buy:
    </div>
    <div class="stores__list">
      <a
        v-for="store in props.list"
        :key="store.id"
        :href="store.url"
        class="store"
        target="_blank"
      >
        <img
          v-if="fileName(store.url) !== 'Some kind of store'"
          class="store__logo"
          :src="`/img/stores/${fileName(store.url)}.png`"
          :alt="fileName(store.url)"
          >
        <p class="store__text">{{ fileName(store.url) }}</p>
        <a
          class="store__btn"
          :href="store.url"
        >Buy</a>
      </a>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})

// разбить на 2 функции (path to file и storeName)
function fileName (store) {
  const hostname = new URL(store).hostname

  switch (true) {
    case hostname.includes('apple'):
      return 'App Store'
    case hostname.includes('playstation'):
      return 'PlayStation'
    case hostname.includes('microsoft'):
      return 'Microsoft'
    case hostname.includes('steam'):
      return 'Steam'
    case hostname.includes('gog'):
      return 'GOG'
    case hostname.includes('xbox'):
      return 'Xbox'
    case hostname.includes('nintendo'):
      return 'Nintendo'
    case hostname.includes('google'):
      return 'Google Play'
    case hostname.includes('epicgames'):
      return 'Epic Games'
    default:
      return 'Some kind of store'
  }
}
</script>

<style  scoped>
.stores {
  display: grid;
  align-content: flex-start;
  gap: 10px;
  background: rgba(39, 41, 63, 0.75);
  box-shadow: inset 0 0 5px 0px rgba(0, 0, 0, 0.3);

  .stores__title {
    display: flex;
    justify-self: flex-start;
    padding: 5px 20px;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 1px;
    background: rgba(102, 204, 51, 0.75);
  }

  .stores__list {
    display: grid;
    gap: 10px;
    padding: 10px 20px;
    overflow: auto;

    .store {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 0px 0px 0px 15px;
      background: #3c4464;
      color: inherit;
      text-decoration: none;
      overflow: hidden;

      transition: transform .15s ease, box-shadow .2s ease;

      .store__logo {
        width: 18px;
        height: 18px;
      }

      .store__text {
        margin: 0;
        font-size: 14px;
      }

      .store__btn {
        margin-left: auto;
        padding: 10px 10px;
        font-size: 12px;
        font-weight: 500;
        letter-spacing: 1px;
        background: rgba(102, 204, 51, 0.75);
        color: inherit;
        text-decoration: none;
      }

      &:hover {
        transform: scale(101%);
        box-shadow: 0px 0px 5px 1px rgba(99, 163, 236, 0.75);
      }

      &:focus {
        transform: scale(100%);
        box-shadow: 0px 0px 5px 1px rgba(99, 163, 236, 0.50);
      }
    }
  }
}
</style>
