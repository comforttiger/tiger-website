<template>
    <p>{{ convertDate(new Date(timestamp)) }}</p>
</template>

<script setup lang="ts">
function convertDate(timestamp: Date) {
  if (!props.time) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    day: "numeric",
    month: "long",
    timeZone: "Europe/Oslo"
  }).toLowerCase();
} else {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    day: "numeric",
    month: "long",
    timeZone: "Europe/Oslo",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit"
  }).toLowerCase();
}
}
const props = defineProps({
  timestamp: { type: Number, required: true },
  time: { type: Boolean, required: false }
})
</script>
