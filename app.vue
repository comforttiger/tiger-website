<template>
  <div class="bg-background-repeat bg-repeat min-h-screen">
  <div>
    <NuxtPage class="text-neutral pb-20"/>
  </div>
  <footer class="text-center text-sm pb-10"> <span class="bg-base-100 rounded-xl p-2">kittycats rule teh world forevah © 2024</span> </footer>
  </div>
</template>

<style>
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