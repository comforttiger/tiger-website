<template>
  <article class="w-full flex items-center justify-center flex-col">
    <div class="md:w-2/3 w-screen">
      <PostTitle :date="post.date" :category="post.category">{{ post.title }}</PostTitle>
      <div class="text-neutral p-5">
        <ContentRenderer :value="post" class="space-y-2" />
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
  import {useRoute} from "vue-router";

  const post = await queryContent(useRoute().path).findOne();
</script>