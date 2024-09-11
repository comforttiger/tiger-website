<template>
  <div class="md:p-20">
    <div class="breadcrumbs text-accent bg-base-100 rounded-xl p-2 mb-2 w-fit">
      <ul>
        <li><NuxtLink to="/">home</NuxtLink></li>
        <li><NuxtLink to="/blog">blog</NuxtLink></li>
        <li v-if="category == 'diary'" ><NuxtLink to="/blog/diary">diary</NuxtLink></li>
        <li v-if="category == 'learning'" ><NuxtLink to="/blog/learning">learning</NuxtLink></li>
        <li v-if="category == 'programming'"><NuxtLink to="/blog/programming">programming</NuxtLink></li>
        <li v-if="category == 'blorbo'"><NuxtLink to="/blog/blorbo">blorbo</NuxtLink></li>
        <li v-if="sub_category == 'guitar'"><NuxtLink to="/blog/learning/guitar">guitar</NuxtLink></li>
      </ul>
    </div>
    <h1 class="text-primary font-display text-7xl underline decoration-accent decoration-8 bg-base-100 rounded-xl p-5 w-fit">
      <slot />
    </h1>
    <div class="flex gap-2 bg-base-100 rounded-xl p-2 mt-2 w-fit" v-if="index && category == 'blog'">
      <NuxtLink to="/blog/diary" class="underline text-secondary">diary</NuxtLink>
      <NuxtLink to="/blog/learning" class="underline text-secondary">learning</NuxtLink>
      <NuxtLink to="/blog/programming" class="underline text-secondary"
        >programming</NuxtLink
      >
      <NuxtLink to="/blog/blorbo" class="underline text-secondary">blorbo</NuxtLink>
    </div>
    <div class="flex gap-2 bg-base-100 rounded-xl p-2 mt-2 w-fit" v-if="index && category == 'learning'">
      <NuxtLink to="/blog/diary/guitar" class="underline text-secondary">guitar</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  category: { type: String, required: true },
  sub_category: {type: String, required: false},
  index: {type: Boolean, required: false}
})
</script>