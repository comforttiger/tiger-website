<template>
  <client-only>
    <div v-if="show && track && track.name">
      <NuxtLink
        to="https://last.fm/user/comforttiger"
        target="_blank"
        class="rounded-xl bg-base-100 p-8 flex flex-col gap-5"
      >
        <h3 class="text-4xl text-primary font-display">
          currently listening to:
        </h3>
        <div class="grid grid-cols-3 gap-5">
          <img
            v-if="
              track.image &&
              track.image !==
                'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png'
            "
            :src="track.image"
          />
          <div class="gap-3 flex flex-col col-span-2 justify-evenly">
            <p class="text-accent font-display text-2xl">
              {{ track.artist }} - {{ track.name }}
            </p>
            <p class="text-accent font-display text-2xl">{{ track.album }}</p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </client-only>
</template>

<script setup lang="ts">
import { useFetch } from "#app";
import { ref, onMounted, onBeforeUnmount } from "vue";

const show = ref(false);

const { data: track, refresh } = await useFetch<{
  name: string;
  artist: string;
  album: string;
  image: string;
}>("https://nowplaying.kittycat.homes/tiger");

async function get_song() {
  await refresh();
  show.value = true;
}

onMounted(() => {
  setTimeout(get_song, 50);

  const intervalId = setInterval(get_song, 30000);

  onBeforeUnmount(() => {
    clearInterval(intervalId);
  });
});
</script>
