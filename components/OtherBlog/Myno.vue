<template>
  <div class="flex justify-center text-myno">
    <NuxtLink
      target="_blank"
      to="https://zatzhing.me/"
      class="link text-4xl p-5 w-2/3 flex gap-2 items-baseline justify-center"
      ><img class="h-12" src="/images/other-blogs/myno_amused_blep.png" />
      <span>Myno!</span></NuxtLink
    >
  </div>
</template>

<style scoped>
.link {
  margin: 5px auto;
  border-radius: 20px;
  background-color: #3a205f;
  color: white;
  text-align: center;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.05s linear;
}

.link:hover {
  background-color: #6d37b4;
  color: black;
}
</style>
