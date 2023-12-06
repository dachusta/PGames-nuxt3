<template>
  <div id="pg-app">
    <NuxtLayout>
      <TheHeader class="header" />

      <NuxtPage />

      <footer class="footer">
        Made with love
      </footer>
    </NuxtLayout>
  </div>
</template>

<style>
@import url("~/assets/css/normalize");

@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');

body {
  background: #1C1C2C;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-track {
  padding: 2px;
  border-radius: 100px;
}
::-webkit-scrollbar-thumb {
  border-radius: 100px;
  background-color: rgba(203, 219, 238, 0.5);
}

#__nuxt {
  display: grid;
  font-family: 'Open Sans', sans-serif;
  color: #2c3e50;
  background: #1C1C2C;
  color: #CBDBEE;
  height: 100vh;
}

#pg-app {
  display: grid;
  grid-template-areas:
    "TheHeader"
    "Main"
    "Footer";
  grid-template-rows: min-content 1fr min-content;
  position: relative;
  z-index: 0;
}

.header {
  grid-area: TheHeader;
  position: sticky;
  top: 0;
  z-index: 1;
}

.footer {
  grid-area: Footer;
  display: flex;
  justify-content: center;
  padding: 20px;
  background: #27293f;
}
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
