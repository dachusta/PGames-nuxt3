<template>
      <main
        class="main"
        :style="{ background: `no-repeat center url(${game?.background_image}) fixed` }"
        style="background-size: cover;"
      >
        <Loader v-if="pending" />

        <div v-else class="content">
          <div class="title">
            {{ game.name }}
          </div>

          <GameScreenshots
            class="screenshots"
            :gameId="id"
          />
          <GameDescription
              v-if="game.description_raw?.length"
              class="description"
              :text="game.description_raw"
            />
          <!-- company -->
          <div class="sidebar">
            <!-- <img class="main-img" :src="game.background_image" alt=""> -->
            <div class="dev-wrapper">
              <div class="dev-container">
                <div class="developers">
                  <div class="developers__title">
                    Developers:
                  </div>
                  <div
                    v-for="developer in game.developers"
                    :key="developer.id"
                    class="developer"
                  >
                    {{ developer.name }}
                  </div>
                </div>
                <div class="publishers">
                  <div class="publishers__title">
                    Publishers:
                  </div>
                  <div
                    v-for="publisher in game.publishers"
                    :key="publisher.id"
                    class="publisher"
                  >
                    {{ publisher.name }}
                  </div>
                </div>
              </div>
              <div class="dev-container">
                <div class="released">
                  <div class="released__title">
                    Released:
                  </div>
                  <div class="released__date">
                    {{ released }}
                  </div>
                </div>
                <div class="updated">
                  <div class="updated__title">
                    Updated:
                  </div>
                  <div class="updated__date">
                    {{ updated }}
                  </div>
                </div>
              </div>
              <div class="dev-container">
                <div class="genres">
                  <div class="genres__title">
                    Genres:
                  </div>
                  <div
                    v-for="genre in game.genres"
                    :key="genre.id"
                    class="genre"
                  >
                    {{ genre.name }}
                  </div>
                </div>
                <div class="tags">
                <div class="tags__title">
                  Tags:
                </div>
                <div
                  v-for="tag in game.tags"
                  :key="tag.id"
                  class="tag"
                >
                  {{ tag.name }}
                </div>
              </div>
              </div>
            </div>
            <GameStores
              class="stores"
              :gameId="id"
            />
            <div class="rating-wrapper">
              <!-- circular progress bar -->
              <div
                v-if="ratingPercent"
                class="rating"
              >
                <div
                  class="percent"
                  :style="{'--clr':'#04fc43', '--num': ratingPercent}"
                >
                  <div class="dot" />
                  <svg>
                    <circle
                      cx="50"
                      cy="50"
                      r="50"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="50"
                    />
                  </svg>
                  <div class="number">
                    <h2>{{ ratingPercent }}</h2>
                    <p>Rating</p>
                  </div>
                </div>
              </div>
              <div
                v-if="game.metacritic"
                class="metacritic"
              >
                <div
                  class="percent"
                  :style="{'--clr':'#04fc43', '--num': game.metacritic}"
                >
                  <div class="dot" />
                  <svg>
                    <circle
                      cx="50"
                      cy="50"
                      r="50"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="50"
                    />
                  </svg>
                  <div class="number">
                    <h2>{{ game.metacritic }}</h2>
                    <p>Metacritic</p>
                  </div>
                </div>
              </div>
              <div
                v-if="game.esrb_rating?.name"
                class="esrb-rating"
              >
                <img
                  :src="`/img/esrb/${game.esrb_rating?.name}.png`"
                  :alt="game.esrb_rating?.name"
                >
              </div>
              <div
                v-if="game.playtime"
                class="playtime"
              >
                <IconTimer :time="game.playtime" />
              </div>
            </div>
          </div>
          <div class="additional">
            <LazyGameAdditions
              class="additions"
              :gameId="id"
            />
            <LazyGameSeries
              v-if="game?.id"
              class="game-series"
              :gameId="id"
            />
            <LazyGameAchievements
              v-if="game?.id"
              class="achievements"
              :gameId="id"
            />
          </div>
        </div>
      </main>
</template>

<script lang="ts" setup>
// const isLoading = useState('isLoading')

const route = useRoute()

const id = route.params.id

const ratingPercent = computed(() => Math.round((100 / 5) * game.value.rating))

function dtFormat (date) {
  const handler = (d) => d < 10 ? '0' + d : d

  date = new Date(date)
  const year = date.getFullYear()
  const month = handler(date.getMonth() + 1)
  const day = handler(date.getDate())

  return day + '.' + month + '.' + year
}

const released = computed(() => dtFormat(game.value.released))
const updated = computed(() => dtFormat(game.value.updated))

const { data: game, pending } = await useLazyFetch(`/api/games/${id}`)

// const { data: screenshots } = await useLazyFetch(`/api/games/${id}/screenshots`)

// const { data: additions } = await useFetch(`/api/games/${id}/additions`)

// const { data: series } = await useFetch(`/api/games/${id}/game-series`)

// const { data: stores } = await useLazyFetch(`/api/games/${id}/stores`)

// const { data: achievements } = await useFetch(`/api/games/${id}/achievements`)

</script>

<style scoped>
.main {
  grid-area: Main;
  display: grid;
  justify-content: center;
  height: 100%;
  position: relative;
  z-index: 0;

  &::after {
    content: "";
    background: #1C1C2C;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0.9;
    z-index: -1;
  }

  .content {
    display: grid;
    grid-template-areas:
      "Title Title"
      "Screenshots Sidebar"
      "Description Sidebar"
      "Additional Additional";
    grid-template-columns: 640px 1fr;
    grid-template-rows: min-content min-content 1fr min-content;
    padding: 30px 0;
    margin: 0 30px auto;
    gap: 10px;
    max-width: 1024px;
    min-width: 1024px;

  }

  .title {
    grid-area: Title;
    font-size: 24px;
    margin: 0;
    font-weight: 500;
  }

  .screenshots {
    grid-area: Screenshots;
    width: 640px;
  }
  .description {
    grid-area: Description;
  }

  .sidebar {
    grid-area: Sidebar;
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
    background: rgba(60, 68, 100, 0.7);

    .stores {
      max-height: 368px;
    }

    .dev-wrapper {
      display: grid;
      gap: 10px;
    }
    .dev-container {
      display: grid;
      gap: 5px;
    }

    .rating-wrapper {
      position: relative;
      display: flex;
      align-content: flex-start;
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px;

      & > div {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 120px;
        height: 120px;
      }

      .esrb-rating img {
        height: 100%;
      }

      .rating .percent, .metacritic .percent {
        position: relative;
        width: 110px;
        height: 110px;

        .dot {
          position: absolute;
          inset: 5px;
          z-index: 10;
          transform: rotate(calc(3.6deg * var(--num)));
          /* 360deg / 100 = 3.6 */

          animation: animateDot 2s linear forwards;

          /* @keyframes animateDot {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform:  rotate(calc(3.6deg * var(--num)));
            }
          } */

          &::before {
            content: '';
            position: absolute;
            top: -7.5px;
            left: 50%;
            transform: translateX(-50%);
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background: var(--clr);
            box-shadow:  0 0 15px var(--clr),
            0 0 45px var(--clr);
          }
        }

        & svg {
          position: relative;
          width: 110px;
          height: 110px;
          transform: rotate(270deg);

          & circle {
            width: 100%;
            height: 100%;
            fill: transparent;
            stroke-width: 5;
            stroke: rgba(39, 41, 63, 0.75);
            transform: translate(5px, 5px);

            &:nth-child(2) {
              stroke: var(--clr);
              /* // Math.PI * (d || (r*2)) */
              stroke-dasharray: 314;
              stroke-dashoffset: calc(314 - (314 * var(--num)) / 100);

              opacity: 0;
              animation: fadeIn 1s linear forwards;
              animation-delay: 2.5s;
            }

            /* @keyframes fadeIn {
              0% {
                opacity: 0;
                fill: transparent;
              }
              100% {
                opacity: 1;
                fill: rgba(39, 41, 63, 0.75);
              }
            } */
          }
        }

        .number {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;

          opacity: 0;
          animation: fadeIn 1s linear forwards;
          animation-delay: 2.5s;
        }

        & h2 {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0;
        }

        & p {
          margin: 0;
        }
      }
    }

    .tags {
      max-height: 88px;
      overflow: hidden;
    }
  }

  .additional {
    grid-area: Additional;
    display: grid;
    gap: 10px;
  }
}

@keyframes animateDot {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform:  rotate(calc(3.6deg * var(--num)));
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
    fill: transparent;
  }
  100% {
    opacity: 1;
    fill: rgba(39, 41, 63, 0.75);
  }
}

.developers, .publishers, .genres, .released, .updated, .tags {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: center;
  gap: 5px;

  .developers__title, .publishers__title, .genres__title, .released__title, .updated__title, .tags__title {
    flex: 0 0 90px;
    font-size: 15px;
    font-weight: 500;
    color: rgba(203, 219, 238, 65%);
  }
}
.developer, .publisher, .genre, .tag {
  background: #1C1C2C;
  padding: 3px 5px;
}
</style>
