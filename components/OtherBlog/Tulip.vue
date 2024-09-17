<template>
    <NuxtLink external to="https://platinumtulip.garden/" target="_blank" class="tulip-bg p-8 rounded-xl flex flex-col gap-4 justify-center items-center text-center">
        <span class="font-tulip-one text-5xl text-[#f5b2a3]">platinumtulip</span>
        <span class="font-tulip-two text-2xl text-[#c06968]">digital garden sanctuary</span>
    </NuxtLink>
</template>

<style scoped>
    .tulip-bg {
        background-image: url("/images/other-blogs/tulip-bg.webp")
    }

    .tulip-bg:hover > span {
        text-shadow: 0 0 2px #C06968;
    }
</style>