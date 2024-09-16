<template>
  <NuxtLink
    external
    target="_blank"
    to="https://summergeist.art/"
    class="summer-bg flex justify-center text-center p-8 w-full rounded-xl text-4xl font-summer font-extrabold"
  >
    <div class="summer-border">
      <div class="summer-button text-center">summer's website</div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.summer-bg {
  background-image: url("/images/other-blogs/summer_bg.png");
}

.summer-bg:hover * {
    text-shadow: 0 0 2px #ffbdff;
    box-shadow: 0 0 2px #ff00ff;
}

.summer-button {
  color: #ffbdff;
  text-decoration: none;
  text-transform: none;
  border-width: 0;
  border-color: #ffffff;
}

.summer-border {
  border-style: double;
  border-color: #ff00ff;
  border-width: 4px;
  padding: 6px;
}
</style>
