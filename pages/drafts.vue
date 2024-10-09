<template>
  <div class="flex justify-center w-full pt-16">
    <div class="flex flex-col gap-2 max-w-4xl w-full">
      <PostSummary v-for="draft in drafts" :post="draft" />
    </div>
  </div>
</template>

<script setup lang="ts">
const drafts = await queryContent("/drafts").find();
</script>
