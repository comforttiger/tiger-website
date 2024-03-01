<template>
  <div class="w-full flex items-center justify-center flex-col">
    <PageTitle home="yeah">
      tiger's <br/>
      website :3
    </PageTitle>
    <div class="md:w-4/5 w-full md:px-5 flex flex-col gap-3">
      <div class="md:grid grid-cols-3 gap-5">
        <AboutMe class="md:col-span-2" />
        <SocialsLinks />
        <WebringNavigation />
      </div>
      <div class="md:grid gap-5 grid-cols-2">
        <div class="flex flex-col gap-2">
          <h2 class="text-primary text-4xl font-display bg-base-100 rounded-xl p-3">
            <NuxtLink to="/blog">i recently posted this</NuxtLink>
          </h2>
          <RecentPosts path="/blog" limit="6" />
          <NuxtLink to="/blog" class="underline text-secondary bg-base-100 rounded-xl p-2"
            >see all posts here</NuxtLink
          >
        </div>
        <div class="flex flex-col gap-2">
          <h2 class="text-primary text-4xl font-display bg-base-100 rounded-xl p-3">
            <NuxtLink to="/made">i recently made this</NuxtLink>
          </h2>
          <RecentPosts path="/made" limit="3" />
          <NuxtLink to="/made" class="underline text-secondary bg-base-100 rounded-xl p-2"
            >see more things i've made here</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "tiger's website :3",
  ogTitle: "tiger's website :3",
  ogImage: '/favicon.png',
})
</script>
