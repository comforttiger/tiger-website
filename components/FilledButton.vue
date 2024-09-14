<template>
    <NuxtLink :external="external" :to="url" class="rounded-xl p-2 text-base-100 bg-accent font-display hover:brightness-75"><slot /></NuxtLink>
</template>

<script setup lang="ts">
    defineProps({
        url: { type: String, required: true },
        external: {type: Boolean, required: false}
    })
</script>