<template>
  <NuxtLink
    :href="url"
    class="border-2 border-secondary bg-base-100 text-neutral flex w-72 h-full gap-3 p-5 hover:bg-secondary"
  >
    <div class="flex flex-col gap-1">
      <h3 class="text-2xl text-primary text-center">
        {{ title }}
      </h3>
      <p v-if="date">{{ date }}</p>
      <p v-if="description">{{ description }}</p>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    url: { type: String, required: true },
    date: { type: String, required: false },
    description: { type: String, required: false },
  },
};
</script>
