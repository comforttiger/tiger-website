<template>
  <NuxtLink
    external
    target="_blank"
    to="https://indietsushin.net/"
    class="flex justify-center text-center p-8 w-full rounded-xl text-4xl indietsushin-bg font-indietsushin"
  >
    <div class="header-bg px-16 py-4">
      <div class="flex flex-col gap-2 justify-center text-center link-indietsushin">
        <p class="break-keep">インディー 通信 </p>
        <p>Indie Tsushin</p>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.indietsushin-bg {
  background-image: url("/images/other-blogs/indietsushin-bg.gif");
}

.header-bg {
  background-color: #b83b5c;
  border-style: none;
  border-width: 0 0 6px 0;
  margin-bottom: 10px;
  outline-color: #000000;
  outline-style: dashed;
  outline-width: 2px;
  color: #000000;
}

.link-indietsushin {
  color: #ffbf80;
}

.indietsushin-bg:hover * .link-indietsushin {
  background-color: #ffbf80;
  color: #b83b5c;
  margin: -3px -6px;
  padding: 3px 6px;
  border-radius: 15px;
  text-decoration: none;
}
</style>
