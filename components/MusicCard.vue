<template>
  <div class="bg-base-100 rounded-xl p-5 border-l-4 border-accent">
    <h2 class="text-3xl font-display text-accent">
      <NuxtLink :to="artist.url">{{ artist.title }}</NuxtLink>
    </h2>
    <div v-for="album in artist.albums">
      <ul class="list-inside pl-5">
        <li class="text-accent underline">
          <NuxtLink :to="album.album.url">{{ album.album.title }}</NuxtLink>
        </li>
        <ul class="list-inside pl-5">
          <li v-for="song in album.album.songs">
            <NuxtLink :to="song.song.url" class="text-secondary underline">{{
              song.song.title
            }}</NuxtLink>
          </li>
        </ul>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type ParsedContent } from "@nuxt/content/dist/runtime/types";

defineProps({
  artist: { type: Object as PropType<ParsedContent>, required: true },
});
</script>
