<template>
  <div class="md:p-20">
    <div class="breadcrumbs text-accent bg-base-100 rounded-xl p-2 mb-2 w-fit">
      <ul>
        <li>
          <NuxtLink to="/">home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/blog">blog</NuxtLink>
        </li>
        <li v-if="category == 'blorbo'">
          <NuxtLink to="/blog/blorbo">blorbo</NuxtLink>
        </li>
        <li v-if="category == 'diary'">
          <NuxtLink to="/blog/diary">diary</NuxtLink>
        </li>
        <li v-if="category == 'programming'">
          <NuxtLink to="/blog/programming">programming</NuxtLink>
        </li>
        <li v-if="sub_category == 'guitar'">
          <NuxtLink to="/blog/diary/guitar">guitar</NuxtLink>
        </li>
      </ul>
    </div>
    <!-- <div v-if="category == 'art' || category == 'photography' || category == 'game'">
      <NuxtLink to="/made" class="underline text-secondary">/made</NuxtLink><NuxtLink to="/made/art" v-if="category == 'art'">/art</NuxtLink>
    </div> -->
    <h1 class="text-primary font-display text-7xl underline decoration-accent decoration-8 bg-base-100 rounded-xl p-5 w-fit">
      <slot />
    </h1>
    <DateComponent :date="date" class="italic text-accent"/>
  </div>
</template>

<script setup lang="ts">
defineProps({
  category: { type: String, required: true },
  sub_category: { type: String, required: false },
  date: { type: String, required: true }
})
</script>