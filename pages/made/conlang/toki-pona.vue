<template>
  <div class="w-full flex items-center justify-center flex-col">
    <div class="p-10 xl:w-1/2 w-full flex flex-col gap-10">
     <MadeTitle category="conlang" sub_category="toki pona">
        ijo pi toki pona
     </MadeTitle>

      <AllPosts path="/made/conlang/toki-pona" />
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'toki pona stuff',
  ogTitle: 'toki pona stuff',
  description: "stuff i made related to toki pona",
  ogDescription: "stuff i made related to toki pona",
})
</script>