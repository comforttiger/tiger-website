<template>
  <div class="w-full flex items-center justify-center flex-col">
    <h1 class="text-primary text-7xl p-10 pb-20">tiger's <br class="inline lg:hidden"> website :3</h1>
    <div class="md:w-4/5 w-full md:px-5 flex flex-col gap-3">
      <div class="md:grid grid-cols-3 gap-5">
        <div class="md:col-span-2">
        <AboutMe />
        </div>
        <div>
          <SocialsLinks />
        </div>
        <WebringNavigation />
      </div>
      <div class="md:grid gap-5 grid-cols-2">
        <div class="flex flex-col gap-2">
          <h2 class="text-primary text-4xl"><NuxtLink to="/blog">i recently posted this</NuxtLink></h2>
          <RecentPosts path="/blog" limit="6" />
          <NuxtLink to="/blog" class="underline text-accent"
            >see all posts here</NuxtLink
          >
        </div>
        <div class="flex flex-col gap-2">
          <h2 class="text-primary text-4xl"><NuxtLink to="/made">i recently made this</NuxtLink></h2>
          <RecentPosts path="/made" limit="3" />
          <NuxtLink to="/made" class="underline text-accent">see more things i've made here</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
