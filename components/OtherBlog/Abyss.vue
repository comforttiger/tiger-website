<template>
  <NuxtLink
    target="_blank"
    to="https://kobold60.com"
    class="bg p-8 rounded-xl flex justify-center w-full"
  >
    <div class="internal-link text-5xl font-abyss text-center">
      ZA ABYSS <span class="blinking">_</span>
    </div>
  </NuxtLink>
</template>

<style scoped>
.bg {
  background-color: #003700;
  background-image: radial-gradient(at bottom right, rgb(30 30 30), #003700);
}

/* .bg::after {
    content: "";
    width:max-content;
    background: repeating-linear-gradient( 0deg, rgb(0 0 0 / 0.10), rgb(0 0 0 / 0.05) 3px, transparent 4px, transparent 6px);
    pointer-events: none;
} */

.internal-link {
  border: orange 4px solid;
  margin-left: 10pt;
  margin-right: 10pt;
  bottom: 0;
  padding-left: 6pt;
  padding-right: 6pt;
  text-align: center;
  color: orange;
  text-shadow: 0 0 8px orange;
}

.bg:hover > .internal-link {
  border: orange 4px solid;
  margin-left: 10pt;
  margin-right: 10pt;
  bottom: 0;
  padding-left: 6pt;
  padding-right: 6pt;
  text-align: center;
  background-color: orange;
  color: #003700;
  /* text-shadow: 0 0 8px #003700; */
}

.blinking {
  animation: blinker 1s step-start infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
