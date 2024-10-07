<template>
  <a :href="link" target="_blank"
    ><img
      :src="img"
      :alt="alt"
      class="hover:scale-[2] hover:relative w-[88px] h-[31px]"
      style="
        image-rendering: pixelated;
        transition: filter 0.1s linear;
        transition: transform 0.05s linear;
      "
  /></a>
</template>

<script setup lang="ts">
defineProps({
  img: { type: String, required: true },
  alt: { type: String, required: true },
  link: { type: String, required: true },
});
</script>
