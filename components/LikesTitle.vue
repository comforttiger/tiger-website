<template>
  <div class="md:p-20">
    <div class="breadcrumbs text-accent bg-base-100 rounded-xl p-2 w-fit mb-2">
      <ul>
        <li><NuxtLink to="/">home</NuxtLink></li>
        <li><NuxtLink to="/likes">likes</NuxtLink></li>
        <li v-if="page == 'pets'"><NuxtLink to="/likes/pets">pets</NuxtLink></li>
        <li v-if="page == 'funny-videos'"><NuxtLink to="/likes/funny-videos">funny-videos</NuxtLink></li>
        <li v-if="page == 'good-music'"><NuxtLink to="/likes/good-music">good-music</NuxtLink></li>
        <li v-if="page == 'girlfriend'"><NuxtLink to="/likes/girlfriend">girlfriend</NuxtLink></li>
        <li v-if="page == 'other-stuff'"><NuxtLink to="/likes/other-stuff">other-stuff</NuxtLink></li>
        <li v-if="sub_page == 'tiara'"><NuxtLink to="/likes/pets/tiara">tiara</NuxtLink></li>
        <li v-if="sub_page == 'toya'"><NuxtLink to="/likes/pets/toya">toya</NuxtLink></li>
        <li v-if="sub_page == 'kira'"><NuxtLink to="/likes/pets/kira">kira</NuxtLink></li>
        <li v-if="sub_page == 'aiko'"><NuxtLink to="/likes/pets/aiko">aiko</NuxtLink></li>
        <li v-if="sub_page == 'arja'"><NuxtLink to="/likes/pets/arja">arja</NuxtLink></li>
      </ul>
    </div>
    <h1 class="text-primary font-display text-7xl underline decoration-accent decoration-8 bg-base-100 rounded-xl p-5 w-fit">
      <slot />
    </h1>
    <div class="flex gap-2 bg-base-100 rounded-xl p-2 w-fit mt-2" v-if="index && page =='index'">
      <NuxtLink to="/likes/pets" class="underline text-secondary">pets</NuxtLink>
      <NuxtLink to="/likes/funny-videos" class="underline text-secondary">funny videos</NuxtLink>
      <NuxtLink to="/likes/good-music" class="underline text-secondary"
        >good music</NuxtLink
      >
      <NuxtLink to="/likes/girlfriend" class="underline text-secondary">girlfriend</NuxtLink>
      <NuxtLink to="/likes/other-stuff" class="underline text-secondary">other stuff</NuxtLink>
    </div>
    <div class="flex gap-2 bg-base-100 rounded-xl p-2 mt-2 w-fit" v-if="index && page == 'pets'">
      <NuxtLink to="/likes/pets/tiara" class="underline text-secondary">tiara</NuxtLink>
      <NuxtLink to="/likes/pets/kira" class="underline text-secondary">kira</NuxtLink>
      <NuxtLink to="/likes/pets/toya" class="underline text-secondary">toya</NuxtLink>
      <NuxtLink to="/likes/pets/aiko" class="underline text-secondary">aiko</NuxtLink>
      <NuxtLink to="/likes/pets/arja" class="underline text-secondary">arja</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  page: { type: String, required: true },
  sub_page: { type: String, required: false },
  index: { type: Boolean, required: false }
})
</script>