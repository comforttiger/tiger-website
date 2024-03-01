<template>
  <div class="w-full flex items-center justify-center flex-col">
    <div class="md:w-1/2 w-screen">
      <MadeTitle page="index">stuff i made</MadeTitle>
      <AllPosts path="/made" />
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "stuff i made",
  ogTitle: "stuff i made",
  description: "a collection of things ive made that im proud of :3",
  ogDescription: "a collection of things ive made that im proud of :3",
  ogImage: '/favicon.png',
})
</script>