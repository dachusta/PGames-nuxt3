<template>
  <div class="pagination">
    <button
      class="btn-page previous"
      :disabled="currentPage <= 1"
      @click="gotoPage(currentPage - 1)"
    >
      <img
        src="/svg/arrow-left.svg"
        height="14"
        width="14"
      />
    </button>

    <!-- <button
      class="btn-page"
      :class="{ active: currentPage }"
    >
      {{ currentPage }}
    </button> -->

    <button
      v-if="orderPage(1) >= 1"
      class="btn-page"
      :class="{ active: currentPage === orderPage(1) }"
      @click="gotoPage(orderPage(1))"
    >
      {{ orderPage(1) }}
    </button>

    <button
      v-if="orderPage(2) >= 2"
      class="btn-page"
      :class="{ active: currentPage === orderPage(2) }"
      @click="gotoPage(orderPage(2))"
    >
      {{ orderPage(2) }}
    </button>
    <span
      v-else-if="orderPage(2) === '...'"
      class="gap-page"
    >...</span>

    <button
      v-if="orderPage(3) >= 3"
      class="btn-page"
      :class="{ active: currentPage === orderPage(3) }"
      @click="gotoPage(orderPage(3))"
    >
      {{ orderPage(3) }}
    </button>

    <button
      v-if="orderPage(4) >= 4"
      class="btn-page"
      :class="{ active: currentPage === orderPage(4) }"
      @click="gotoPage(orderPage(4))"
    >
      {{ orderPage(4) }}
    </button>

    <button
      v-if="orderPage(5) >= 5"
      class="btn-page"
      :class="{ active: currentPage === orderPage(5) }"
      @click="gotoPage(orderPage(5))"
    >
      {{ orderPage(5) }}
    </button>

    <button
      v-if="orderPage(6) >= 6"
      class="btn-page"
      :class="{ active: currentPage === orderPage(6) }"
      @click="gotoPage(orderPage(6))"
    >
      {{ orderPage(6) }}
    </button>
    <span
      v-else-if="orderPage(2) === '...'"
      class="gap-page"
    >...</span>

    <button
      v-if="orderPage(7) >= 7"
      class="btn-page"
      :class="{ active: currentPage === orderPage(7) }"
      @click="gotoPage(orderPage(7))"
    >
      {{ orderPage(7) }}
    </button>

    <button
      class="btn-page next"
      :disabled="pageCount <= currentPage"
      @click="gotoPage(currentPage + 1)"
    >
      <img
        src="/svg/arrow-right.svg"
        height="14"
        width="14"
      />
    </button>

    <!-- <div class="pagination__show">
      <span>Show:</span>
      <select
        :key="show"
        class="pagination__show-select top-options default"
        :options="showList"
        :placeholder="show"
        @selected="selectedShow"
      />
      <span>{{ totalItems }}</span>
    </div> -->
  </div>
</template>

<script setup>
// eslint-disable-next-line
const props = defineProps({
  list: {
    type: Array,
    default () {
      return []
    }
  },
  currentPage: {
    type: Number,
    default: 1
  },
  gameCount: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 1
  },
  showList: {
    type: Array,
    default () {
      return [10, 25, 50, 100, 200]
    }
  }
})
const pageCount = computed(() => {
  return Math.ceil(props.gameCount / props.pageSize) || 0
})
console.log(pageCount.value);
// eslint-disable-next-line
const emit = defineEmits(['visibleList', 'update:currentPage', 'setCurrentPage'])

// const show = ref(25)

// const currentPage = ref(1)

// const totalItems = computed(() => props.list?.length || 0)

// const totalPage = computed(
//   () => props.list?.length
//     ? Math.ceil(props.list?.length / show.value)
//     : 0
// )

// const visibleList = computed(() => {
//   if (props.list?.length) {
//     const begin = show.value * currentPage - show.value
//     const end = show.value * currentPage
//     const visibleList = props.list.slice(begin, end)

//     return visibleList
//   } else return 0
// })

// watch(() => props.list, () => {
//   emit('visibleList', visibleList)
// })
// watch(() => currentPage, () => {
//   emit('visibleList', visibleList)
//   console.log(currentPage)
//   emit('setCurrentPage', currentPage)
// })
// watch(() => show, () => {
//   emit('visibleList', visibleList)
// })

// const selectedShow = (value) => {
//   show.value = value
// }

// Order to number page
const orderPage = (index) => {
  switch (index) {
    case 1:
      return 1
    case 2:
      if (
        (props.currentPage <= 3 && pageCount.value >= 2) ||
        (pageCount.value <= 7 && pageCount.value >= 2)
      ) return 2
      else if (props.currentPage <= 1) return props.currentPage
      else return '...'
    case 3:
      if (
        (props.currentPage <= 3 && pageCount.value >= 3) ||
        (pageCount.value <= 7 && pageCount.value >= 3)
      ) return 3
      else if (pageCount.value - 4 >= props.currentPage) return props.currentPage
      else return pageCount.value - 4
    case 4:
      if (
        (props.currentPage <= 3 && pageCount.value >= 4) ||
        (pageCount.value <= 7 && pageCount.value >= 4)
      ) return 4
      else if (pageCount.value - 4 >= props.currentPage) return props.currentPage + 1
      else return pageCount.value - 3
    case 5:
      if (
        (props.currentPage <= 3 && pageCount.value >= 5) ||
        (pageCount.value <= 7 && pageCount.value >= 5)
      ) return 5
      else if (pageCount.value - 4 >= props.currentPage) return props.currentPage + 2
      else return pageCount.value - 2
    case 6:
      if (pageCount.value - 4 <= props.currentPage || pageCount.value <= 7) return pageCount.value - 1
      else return '...'
    case 7:
      return pageCount.value
    default:
      return 1
  }
}
const gotoPage = (numberPage) => {
  emit('update:currentPage', numberPage)
  // currentPage.value = numberPage
}
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0px 10px;
  padding: 5px 100px;
  font-size: 14px;
  background: #3c4464;
  border-radius: 10px;
  box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.15);
}
.btn-page {
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 40px; */
  min-width: 40px;
  height: 30px;
  padding: 0 10px;
  border: 1px solid #000000;
  border: none;
  border-radius: 5px;
  background: #1C1C2C;
  color: #ffffff;
  cursor: pointer;
  /* transition: box-shadow 0.2s ease; */
  transition: transform .15s ease, box-shadow .2s ease;

  &:hover {
    /* background: #63a3ec; */
    /* color: #ffffff; */
    /* box-shadow: 0px 1px 7px 1px rgba(99, 163, 236, 0.75); */
    transform: scale(105%);
    box-shadow: 0px 0px 5px 1px rgba(99, 163, 236, 0.75);
  }
  
  &.active {
    background: #63a3ec;
    color: #ffffff;
    transform: none;
    box-shadow: none;
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
    transform: none;
    box-shadow: none;
  }
}

.gap-page {
  display: flex;
  align-items: center;
  justify-content: center;
  /* width: 40px; */
  height: 30px;
  font-size: 18px;
  letter-spacing: 3px;
  cursor: default;
  user-select: none;
}

.icon-previous,
.icon-next {
  width: 10px;
  height: 10px;
}

.pagination__show {
  display: flex;
  align-items: center;
  gap: 5px;
  padding-left: 10px;
}

</style>
