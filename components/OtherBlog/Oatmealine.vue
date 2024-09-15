<template>
  <div class="flex justify-center font-oatmealine">
    <div class="p-8 rounded-xl bg-[#17101a]">
      <NuxtLink target="_blank" to="https://oat.zone" class="link text-2xl">
        <span>oatmealine</span><span class="text-[#e6dedc]">@</span><span>oat.zone</span>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.link {
  color: #ee64ae;
  text-shadow: 0 0 0.5px #ee64ae;
  transition: 0.1s color, 0.1s text-shadow;
  cursor: pointer;
}

.link:hover {
  color: #f075b7;
  text-shadow: 0 0 2px #ee64ae;
}
</style>
