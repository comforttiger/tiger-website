<template>
    <NuxtLink :external="external" :to="url" class="rounded-xl px-2 py-1 text-base-100 bg-accent font-display hover:brightness-90 border-2 border-accent"><slot /></NuxtLink>
</template>

<script setup lang="ts">
    defineProps({
        url: { type: String, required: false },
        external: {type: Boolean, required: false}
    })
</script>