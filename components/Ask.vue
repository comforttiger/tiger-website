<template>
  <div
    class="rounded-xl p-4 border-2 border-accent flex flex-col gap-4 bg-base-100 w-fit"
  >
    <div class="flex gap-2">
      <ProfilePicture :name="query.name" :email="query.email" :website="query.website" small />
      <div class="flex flex-col gap-4 w-full">
        <div class="flex gap-1">
        <span class="font-display text-lg"
          ><FilledButton
            v-if="query.website"
            :url="query.website"
            target="_blank"
            >{{ query.name }}</FilledButton
          ><span class="rounded-xl px-2 py-1 text-accent bg-base-100 border-accent border-2 font-display" v-else>{{ query.name }}</span> asked:</span
        >
        </div>
        <ContentRenderer :value="query"></ContentRenderer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  ask: { type: String, required: true },
});
const query = await queryContent(`/asks/${props.ask}`).findOne();
</script>
