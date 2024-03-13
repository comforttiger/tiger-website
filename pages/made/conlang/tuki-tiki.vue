<template>
  <div class="w-full flex items-center justify-center flex-col">
    <div class="p-10 xl:w-1/2 w-full flex flex-col gap-10">
     <MadeTitle category="conlang" sub_category="tuki tiki">
        iku tuki tiki
     </MadeTitle>

      <AllPosts path="/made/conlang/tuki-tiki" />
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'tuki tiki stuff',
  ogTitle: 'tuki tiki stuff',
  description: "stuff i made related to tuki tiki",
  ogDescription: "stuff i made related to tuki tiki",
})
</script>