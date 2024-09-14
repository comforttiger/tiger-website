<template>
    <NuxtLink :external="external" :to="url" class="rounded-xl p-2 text-accent bg-base-100 border-accent border-2 font-display hover:brightness-75"><slot /></NuxtLink>
</template>

<script setup lang="ts">
    defineProps({
        url: { type: String, required: true },
        external: {type: Boolean, required: false}
    })
</script>