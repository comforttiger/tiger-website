<template>
    <h3 :id="id" class="text-3xl text-primary font-display border-b-2 border-primary text-shadow-heading">
      <a
        v-if="id && generate"
        :href="`#${id}`"
      >
        <slot />
      </a>
      <slot v-else />
    </h3>
  </template>
  
  <script setup lang="ts">
  import { computed, useRuntimeConfig } from '#imports'
  
  const props = defineProps<{ id?: string }>()
  
  const { headings } = useRuntimeConfig().public.mdc
  const generate = computed(() => props.id && headings?.anchorLinks?.h3)
  </script>