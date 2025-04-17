<template>
    <time :datetime="new Date(timestamp).toISOString()">{{ convertDate(new Date(timestamp)) }}</time>
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

<!-- <template>
  <time
    :datetime="iso"
    :title="normalTime"
  >
    {{ lotteTime }}
  </time>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  timestamp: { type: Number, required: true },
  time: { type: Boolean, required: false }
})

const YEAR_ZERO = 971474400
const MONTHS = [
  "lotte", "two", "mute", "E", "👻", "epic", "lazy", "communism",
  "spetember", "love", "tiger", "vengeance", "poison", "pride month", "abby", "destruction",
  "the sun", "destruction pt 2 (for kitties only)", "pali", "creachers :3", "math",
  "fire", "giving", "burglary"
]

function unit(x: number) {
  return Math.floor(x - Math.floor(x / 24) * 24)
}

function pad(n: number, width: number) {
  return n.toString().padStart(width, '0')
}

function toLotteTime(date: Date): string {
  const timestamp = Math.floor(date.getTime() / 1000) - YEAR_ZERO

  const year = Math.floor(timestamp / 24 ** 5)
  const monthIndex = unit(timestamp / 24 ** 4)
  const month = monthIndex + 1
  const day = unit(timestamp / 24 ** 3) + 1
  const hour = unit(timestamp / 24 ** 2)
  const minute = unit(timestamp / 24)

  const monthName = MONTHS[monthIndex] || "mystery month"

  return props.time
    ? `${pad(hour, 2)}:${pad(minute, 2)} • month of ${monthName} ${pad(day, 2)}, ${pad(year, 4)}`
    : `month of ${monthName} ${pad(day, 2)}, ${pad(year, 4)}`
}

function toNormalTime(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    day: "numeric",
    month: "long",
    timeZone: "Europe/Oslo",
    ...(props.time && {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit"
    })
  }).toLowerCase()
}

const iso = computed(() => new Date(props.timestamp).toISOString())
const normalTime = computed(() => toNormalTime(new Date(props.timestamp)))
const lotteTime = computed(() => toLotteTime(new Date(props.timestamp)))
</script> -->