<template>
  <div class="bg-background-repeat bg-repeat min-h-screen md:p-10">
    <OutlineButton url="/watching" class="flex gap-2 w-fit" v-if="useRoute().path.includes('/watching/') && useRoute().path != '/watching/'"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
        />
      </svg>
      back</OutlineButton
    >
    <OutlineButton url="/" class="flex gap-2 w-fit" v-else-if="useRoute().path != '/'"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
        />
      </svg>
      home</OutlineButton
    >
    <div>
      <NuxtPage class="text-neutral pb-20" />
    </div>
    <footer class="text-center text-sm pb-10">
      <span class="bg-base-100 rounded-xl p-2"
        >kittycats rule teh world forevah © 2024</span
      >
    </footer>
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