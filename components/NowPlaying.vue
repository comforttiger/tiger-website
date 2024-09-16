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
          <div class="flex items-center">
          <img
            v-if="
              track.image &&
              track.image !==
                'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png'
            "
            :src="track.image"
          />
          </div>
          <div class="flex flex-col gap-5 col-span-2 justify-evenly text-accent font-display">
              <div>
              <p class="text-2xl">{{ track.artist }}</p>
              <p class="text-3xl">{{ track.name }}</p>
            </div>
            <p class="font-display text-xl">{{ track.album }}</p>
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
