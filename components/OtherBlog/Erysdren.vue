<template>
  <NuxtLink
    external
    target="_blank"
    to="https://erysdren.me"
    class="flex justify-center text-center bg-[#222] p-8 w-full rounded-xl bg"
  >
    <div
      class="text-3xl font-erysdren bg-[#eeeeee] text-[#222222] flex justify-center px-4 py-2 w-fit border-[#eeeeee] border-dashed border-2 erysdren-link"
    >
      erysdren's WWW site
    </div>
  </NuxtLink>
</template>

<style scoped>
.bg:hover > .erysdren-link {
  background-color: #222;
  color: #eee;
}
</style>
