<template>
  <div class="md:p-20">
    <div class="breadcrumbs text-accent bg-base-100 rounded-xl p-2 mb-2 w-fit">
      <ul>
        <li><NuxtLink to="/">home</NuxtLink></li>
        <li><NuxtLink to="/blog">blog</NuxtLink></li>
        <li v-if="category == 'diary'">
          <NuxtLink to="/blog/diary">diary</NuxtLink>
        </li>
        <li v-if="category == 'learning'">
          <NuxtLink to="/blog/learning">learning</NuxtLink>
        </li>
        <li v-if="category == 'blorbo'">
          <NuxtLink to="/blog/blorbo">blorbo</NuxtLink>
        </li>
        <li v-if="sub_category == 'guitar'">
          <NuxtLink to="/blog/learning/guitar">guitar</NuxtLink>
        </li>
      </ul>
    </div>
    <h1
      class="text-primary font-display text-7xl underline decoration-accent decoration-8 bg-base-100 rounded-xl p-5 w-fit"
    >
      <slot />
    </h1>
    <div class="flex gap-5">
      <div>
        <div
          class="flex gap-2 bg-base-100 rounded-xl p-2 mt-2 w-fit"
          v-if="index && category == 'blog'"
        >
          <NuxtLink to="/blog/diary" class="underline text-secondary"
            >diary</NuxtLink
          >
          <NuxtLink to="/blog/learning" class="underline text-secondary"
            >learning</NuxtLink
          >
          <NuxtLink to="/blog/blorbo" class="underline text-secondary"
            >blorbo</NuxtLink
          >
        </div>
        <div
          class="flex gap-2 bg-base-100 rounded-xl p-2 mt-2 w-fit"
          v-if="index && category == 'learning'"
        >
          <NuxtLink to="/blog/learning/guitar" class="underline text-secondary"
            >guitar</NuxtLink
          >
        </div>
      </div>
      <NuxtLink external v-if="index && category == 'blog'" to="/blog/rss.xml" class="underline text-secondary bg-base-100 rounded-xl mt-2 p-2 flex gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
  <path fill-rule="evenodd" d="M3.75 4.5a.75.75 0 0 1 .75-.75h.75c8.284 0 15 6.716 15 15v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75C18 11.708 12.292 6 5.25 6H4.5a.75.75 0 0 1-.75-.75V4.5Zm0 6.75a.75.75 0 0 1 .75-.75h.75a8.25 8.25 0 0 1 8.25 8.25v.75a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75v-.75a6 6 0 0 0-6-6H4.5a.75.75 0 0 1-.75-.75v-.75Zm0 7.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clip-rule="evenodd" />
</svg> rss feed</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  category: { type: String, required: true },
  sub_category: { type: String, required: false },
  index: { type: Boolean, required: false },
});
</script>
