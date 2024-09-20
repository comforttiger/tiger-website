<template>
  <client-only>
    <div v-if="show && track && track.name">
      <NuxtLink
        to="https://last.fm/user/comforttiger"
        target="_blank"
        class="rounded-xl text-accent bg-base-100 p-5 flex flex-col gap-5"
      >
        <h3 class="text-4xl text-primary font-display flex gap-2 items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z"
              clip-rule="evenodd"
            />
          </svg>
          currently listening to
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z"
              clip-rule="evenodd"
            />
          </svg>
        </h3>
        <div class="grid grid-cols-3 gap-5">
          <div
            v-if="
              track.image &&
              track.image !==
                'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png'
            "
            class="flex items-center"
          >
            <img
              :src="track.image"
              :alt="`Cover art for ${track.name} by ${track.artist}`"
            />
          </div>
          <div
            class="flex flex-col gap-5 col-span-2 justify-evenly font-display"
          >
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

  // const intervalId = setInterval(get_song, 30000);

  // onBeforeUnmount(() => {
  //   clearInterval(intervalId);
  // });
});
</script>
