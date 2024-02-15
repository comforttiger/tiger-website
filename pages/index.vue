<template>
  <div class="w-full flex items-center justify-center flex-col">
    <h1 class="text-primary text-7xl underline decoration-accent p-20 pb-40 decoration-8">
      tiger's <br/>
      website :3
    </h1>
    <div class="md:w-4/5 w-full md:px-5 flex flex-col gap-3">
      <div class="md:grid grid-cols-3 gap-5">
        <AboutMe class="md:col-span-2" />
        <SocialsLinks />
        <WebringNavigation />
      </div>
      <div class="md:grid gap-5 grid-cols-2">
        <div class="flex flex-col gap-2">
          <h2 class="text-primary text-4xl">
            <NuxtLink to="/blog">i recently posted this</NuxtLink>
          </h2>
          <RecentPosts path="/blog" limit="6" />
          <NuxtLink to="/blog" class="underline text-secondary"
            >see all posts here</NuxtLink
          >
        </div>
        <div class="flex flex-col gap-2">
          <h2 class="text-primary text-4xl">
            <NuxtLink to="/made">i recently made this</NuxtLink>
          </h2>
          <RecentPosts path="/made" limit="3" />
          <NuxtLink to="/made" class="underline text-secondary"
            >see more things i've made here</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>
