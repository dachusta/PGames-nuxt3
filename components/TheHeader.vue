<template>
  <header class="header">
    <div class="content">
      <NuxtLink
        class="logo link"
        to="/"
      >
        <img
          src="/logo.svg"
          alt="PGames"
          width="100"
          height="30"
        />
      </NuxtLink>

      <!-- <nav class="nav">
        <NuxtLink
          class="link"
          to="/"
        >
          Games
        </NuxtLink>
      </nav>

      <div class="link">
        search
      </div> -->
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  height: 70px;
  background: #27293f;

  .content {
    display: flex;
    align-items: center;
    width: 100%;
    margin: 0 30px;
    gap: 30px;
    max-width: 1024px;
  }

  .logo {
    display: flex;
    align-content: center;
    transition: transform .15s ease;

    &:hover {
      transform: scale(105%);
    }
  }

  .nav {
    display: flex;
    width: 100%;
    gap: 10px;

    .link {
      font-weight: bold;
      color: inherit;
      text-decoration: none;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
}
</style>
