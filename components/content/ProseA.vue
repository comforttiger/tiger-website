<template>
    <NuxtLink
      :href="href"
      :target="target"
      class="text-secondary underline"
    >
      <slot />
    </NuxtLink>
  </template>
  
  <script setup lang="ts">
  defineProps({
    href: {
      type: String,
      default: ''
    },
    target: {
      type: String,
      default: undefined,
      required: false
    }
  })
  </script>