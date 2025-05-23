<template>
  <div class="flex items-center justify-center">
    <div class="flex flex-col gap-4 items-center justify-center">
      <div class="flex gap-2 items-center">
        <button @click="selected > 0 ? selected -= 1 : selected = photos.length - 1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="lg:size-10 size-6"
        >
          <path
            fill-rule="evenodd"
            d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
            clip-rule="evenodd"
          />
        </svg>
        </button>

        <NuxtLink :to="photos[selected]" external target="_blank"><img :src="photos[selected]" class="max-h-[80vh]" /></NuxtLink>
        <button @click="selected < photos.length - 1 ? selected += 1 : selected = 0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="lg:size-10 size-6"
        >
          <path
            fill-rule="evenodd"
            d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
            clip-rule="evenodd"
          />
        </svg>
        </button>
      </div>
      <div class="flex flex-wrap gap-2 justify-center">
        <div v-for="(photo, index) in photos">
            <button @click="selected = index" v-if="selected != index"><img :src="photo" class="lg:h-20 h-12" /></button>
            <button v-else disabled><img :src="photo" class="lg:h-20 h-12 blur-[2px]" /></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  photos: { type: Array<string>, required: true },
  first: { type: Number, required: false },
});

var selected = ref<number>(props.first ? props.first : 0);
</script>
