<template>
  <div class="md:p-20">
    <div class="breadcrumbs text-accent bg-base-100 w-fit p-2 rounded-xl mb-2">
      <ul>
        <li><NuxtLink to="/">home</NuxtLink></li>
        <li><NuxtLink to="/made">made</NuxtLink></li>
        <li v-if="category == 'art'"><NuxtLink to="/made/art">art</NuxtLink></li>
        <li v-if="category == 'games'"><NuxtLink to="/made/games">games</NuxtLink></li>
        <li v-if="category == 'photography'"><NuxtLink to="/made/photography">photography</NuxtLink></li>
        <li v-if="category == 'conlang'"><NuxtLink to="/made/conlang">conlang</NuxtLink></li>
        <li v-if="sub_category == 'toki pona'"><NuxtLink to="/made/conlang/toki-pona">toki pona</NuxtLink></li>
        <li v-if="sub_category == 'tuki tiki'"><NuxtLink to="/made/conlang/tuki-tiki">tuki tiki</NuxtLink></li>
      </ul>
    </div>
    <h1 class="text-primary font-display text-7xl underline decoration-accent decoration-8 bg-base-100 rounded-xl p-5 w-fit">
      <slot />
    </h1>
    <div class="flex gap-2 bg-base-100 w-fit p-2 rounded-xl mt-2" v-if="index && category == 'made'">
      <NuxtLink to="/made/art" class="underline text-secondary">art</NuxtLink>
      <NuxtLink to="/made/games" class="underline text-secondary"
        >games</NuxtLink
      >
      <NuxtLink to="/made/photography" class="underline text-secondary">photography</NuxtLink>
      <NuxtLink to="/made/conlang" class="underline text-secondary">conlang</NuxtLink>
    </div>
    <div class="flex gap-2 bg-base-100 w-fit p-2 rounded-xl mt-2" v-if="index && category == 'conlang'">
      <NuxtLink to="/made/conlang/toki-pona" class="underline text-secondary">toki pona</NuxtLink>
      <NuxtLink to="/made/conlang/tuki-tiki" class="underline text-secondary">tuki tiki</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  category: { type: String, required: true },
  sub_category: {type: String, required: false},
  index: { type: Boolean, required: false },
})
</script>