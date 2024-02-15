<template>
  <div class="w-full flex items-center justify-center flex-col">
    <div class="w-2/3">
      <BlogTitle page="blog">bogposing :3</BlogTitle>
      <!-- <div class="p-20 pb-40">
      <h1
        class="text-primary text-7xl underline decoration-accent decoration-8"
      >
        bogposing :3
      </h1>
      <div class="flex gap-2"><NuxtLink to="diary" class="underline text-secondary">diary</NuxtLink> <NuxtLink to="programming" class="underline text-secondary">programming</NuxtLink> <NuxtLink to="blorbo" class="underline text-secondary">blorbo</NuxtLink></div> -->
      <!-- </div> -->

      <AllPosts path="/blog" />
    </div>
  </div>
</template>
