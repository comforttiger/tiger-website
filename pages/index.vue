<template>
  <div class="w-full flex items-center justify-center flex-col">
    <h1 class="text-primary text-7xl p-10 pb-20">tiger's website :3</h1>
    <div class="sm:w-4/5 w-full sm:px-5 flex flex-col gap-3">
      <div class="sm:grid grid-cols-3 gap-5">
        <AboutMe class="sm:col-span-2" />
        <div>
          <SocialsLinks />
          <WebringNavigation />
        </div>
      </div>
      <div class="sm:grid gap-5 grid-cols-2">
        <div>
          <h2 class="text-primary text-4xl">i recently posted this</h2>
          <RecentPosts path="/blog" />
          <NuxtLink to="/blog" class="underline text-accent"
            >see all posts here</NuxtLink
          >
        </div>
        <div>
          <h2 class="text-primary text-4xl">i recently made this</h2>
          <RecentPosts path="/made" />
        </div>
      </div>
    </div>
  </div>
</template>
