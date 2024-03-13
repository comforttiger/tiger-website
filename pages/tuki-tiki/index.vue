<template>
  <div class="w-full flex items-center justify-center flex-col">
    <PageTitle home="a"> kiku ka Tika </PageTitle>
    <div class="md:w-4/5 w-full md:px-5 flex flex-col gap-3">
      <div class="bg-base-100 rounded-xl p-5">
        <h2 class="text-primary text-4xl font-display">li timi?</h2>
        <div class="space-y-2">
          <p>
            tuki! li kiku mi tuki tiki. mi upi tula i tuki tiki. li muti lu mi!
            tuki tiki li muku tu
          </p>
          <p>kiku li la iku mi tuki tiki lu pali mi tuki tiki li ki a</p>
        </div>
      </div>

      <div class="bg-base-100 rounded-xl p-5">
        <h2 class="text-primary text-4xl font-display">pali</h2>
        <div class="space-y-2">
          <ul class="list-disc list-inside">
            <li>
              <NuxtLink to="/tuki-tiki/cheat-sheet.pdf" external class="text-secondary underline"
                >ilu lili tuki tiki (tuki tiki cheatsheet)</NuxtLink
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "kiku ka Tika",
  ogTitle: "kiku ka Tika",
});
</script>
