<template>
  <div class="w-full flex items-center justify-center flex-col">
    <PageTitle home="yeah"> tiger's<br />website :3 </PageTitle>
    <div class="2xl:w-4/5 w-full md:px-5 flex flex-col gap-3">
      <div class="xl:grid grid-cols-3 gap-5 flex flex-col">
        <div class="flex flex-col gap-5 md:col-span-2">
          <AboutMe />
          <AllPosts />

        </div>
        <div class="flex flex-col gap-5">
          <SocialsLinks class="h-fit" />
          <OtherBlogs class="mb-5" />
          <WebringNavigation />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "tiger's website :3",
  ogTitle: "tiger's website :3",
});
</script>
