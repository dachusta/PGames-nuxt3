<template>
  <div>
    <!-- <NuxtWelcome /> -->
    <NuxtLayout>
      <NuxtPage />
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
  font-family: 'Open Sans', sans-serif;
  color: #2c3e50;
  background: #1C1C2C;
  color: #CBDBEE;
  min-height: 100vh;
}

/* .wrapper {
  display: grid;
  background: #1C1C2C;
  color: #CBDBEE;
  position: relative;
  min-height: inherit;
} */
</style>
