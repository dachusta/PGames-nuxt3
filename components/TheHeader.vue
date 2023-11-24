<template>
  <header class="header">
    <div class="content">

      <!-- <div class="logo">
        PGames
    </div> -->
    <NuxtLink
        class="logo link"
        to="/"
      >
        PGames
      </NuxtLink>
    <nav class="nav">
      <!-- <div class="link">Home</div> -->
      <!-- <router-link class="link" to="/">Home</router-link> -->
      <NuxtLink
        class="link"
        to="/"
      >
        Games
      </NuxtLink>
    </nav>
    <div class="link">
      search
    </div>
  </div>
  </header>

  <!-- <div class="control-bar">
          <div class="search">
            <input type="text">
          </div>
          <div class="sort">
            <select
              id
              name
            >
              <option value>
                1
              </option>
              <option value>
                2
              </option>
              <option value>
                3
              </option>
            </select>
          </div>
          <div class="display-mode" />
        </div> -->
</template>

<script setup>
</script>

<style scoped>
.header {
  grid-area: TheHeader;
  display: flex;
  justify-content: center;
  /* justify-content: space-between; */
  /* padding: 30px; */
  height: 70px;
  /* gap: 10px; */
  background: #27293f;
  /* z-index: 1; */

  .content {
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    width: 100%;
    margin: 0 30px;
    gap: 10px;
    /* background: #27293f; */
    /* z-index: 1; */
    max-width: 1024px;
  }

  .logo {
    font-weight: bold;
    color: inherit;
  }

  .nav {
    display: flex;
    width: 100%;
    gap: 10px;

    .link {
      font-weight: bold;
      color: inherit;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
}
</style>
