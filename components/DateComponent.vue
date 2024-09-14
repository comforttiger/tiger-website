<template>
    <p>{{ convertDate(new Date(timestamp)) }}</p>
</template>

<script setup lang="ts">
function convertDate(timestamp: Date) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    day: "numeric",
    month: "long",
    timeZone: "Europe/Oslo"
  }).toLowerCase();
}
defineProps({
  timestamp: { type: Number, required: true }
})
</script>
