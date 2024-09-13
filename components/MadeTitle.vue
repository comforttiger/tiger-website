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
        <li v-if="category == 'other'"><NuxtLink to="/made/other">other</NuxtLink></li>
      </ul>
    </div>
    <h1 class="text-primary font-display text-7xl underline decoration-accent decoration-8 bg-base-100 rounded-xl p-5 w-fit">
      <slot />
    </h1>
    <div class="flex gap-5">
      <div>
    <div class="flex gap-2 bg-base-100 w-fit p-2 rounded-xl mt-2" v-if="index && category == 'made'">
      <NuxtLink to="/made/art" class="underline text-secondary">art</NuxtLink>
      <NuxtLink to="/made/games" class="underline text-secondary"
        >games</NuxtLink
      >
      <NuxtLink to="/made/photography" class="underline text-secondary">photography</NuxtLink>
      <NuxtLink to="/made/conlang" class="underline text-secondary">conlang</NuxtLink>
      <NuxtLink to="/made/other" class="underline text-secondary">other</NuxtLink>
    </div>
    <div class="flex gap-2 bg-base-100 w-fit p-2 rounded-xl mt-2" v-if="index && category == 'conlang'">
      <NuxtLink to="/made/conlang/toki-pona" class="underline text-secondary">toki pona</NuxtLink>
      <NuxtLink to="/made/conlang/tuki-tiki" class="underline text-secondary">tuki tiki</NuxtLink>
    </div>
    </div>
    <NuxtLink v-if="index && category == 'made'" to="/made/rss.xml" class="underline text-secondary bg-base-100 rounded-xl mt-2 p-2 flex gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
  <path fill-rule="evenodd" d="M3.75 4.5a.75.75 0 0 1 .75-.75h.75c8.284 0 15 6.716 15 15v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75C18 11.708 12.292 6 5.25 6H4.5a.75.75 0 0 1-.75-.75V4.5Zm0 6.75a.75.75 0 0 1 .75-.75h.75a8.25 8.25 0 0 1 8.25 8.25v.75a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75v-.75a6 6 0 0 0-6-6H4.5a.75.75 0 0 1-.75-.75v-.75Zm0 7.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clip-rule="evenodd" />
</svg> rss feed</NuxtLink>
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