<template>
  <NuxtLink
    target="_blank"
    to="https://oat.zone"
    class="flex justify-center font-oatmealine bg"
  >
    <div class="p-8 rounded-xl bg-[#17101a] w-full text-center">
      <div class="link-oat text-3xl">
        <span>oatmealine</span><span class="text-[#e6dedc]">@</span
        ><span>oat.zone</span>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.bg:hover * .link-oat {
  color: #f075b7;
  text-shadow: 0 0 2px #ee64ae;
}

.link-oat {
  color: #ee64ae;
  text-shadow: 0 0 0.5px #ee64ae;
  transition: 0.1s color, 0.1s text-shadow;
  cursor: pointer;
  text-decoration-line: underline
}

/* .link:hover {
  color: #f075b7;
  text-shadow: 0 0 2px #ee64ae;
} */
</style>
