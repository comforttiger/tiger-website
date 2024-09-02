<template>
    <div class="w-full flex items-center justify-center flex-col">
      <div class="md:w-1/2 w-screen h-screen">
        <LikesTitle page="index" index> stuff i like </LikesTitle>
        <!-- <div>
          <ContentList :query="query" v-slot="{ list }">
            <div class="flex flex-col gap-5">
              <div
                v-for="post in list"
                :key="post._path"
                class="pl-5 border-l-4 border-accent"
              >
                <StuffCard :post="post" />
              </div>
            </div>
          </ContentList>
        </div> -->
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  useSeoMeta({
  title: "stuff i like",
  ogTitle: "stuff i like",
  description: "a collection of things i like :3",
  ogDescription: "a collection of things i like :3",
})
  </script>