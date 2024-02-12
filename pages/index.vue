<template>
  <div class="grid gap-5 p-5 w-screen">
    <div
      class="justify-center grid gap-5 md:grid-cols-2 lg:grid-cols-3 grid-cols-1"
    >
      <div class="flex flex-col gap-2 lg:col-span-2">
        <h1 class="text-primary text-6xl text-center">
          welcome to <br /><span class="lg:pl-40">my website</span>
        </h1>
        <div class="grid gap-2 lg:grid-cols-2">
          <div class="">
            <h2 class="text-3xl text-primary italic">who am i???</h2>
            <div
              class="bg-base-200 border-2 p-2 border-primary rounded-xl space-y-2"
            >
              <p>
                hi! i'm ~tiger~! i'm a
                <span class="text-accent">queer autistic lil nerd</span> whos in
                ur puter.....
              </p>
              <p>
                i have lots of stuff i like to do in my spare time! like making
                <a class="underline text-accent">art</a> or
                <a class="underline text-accent">games</a>,
                <a class="underline text-accent">programming</a>,
                <a class="underline text-accent">photography</a>,
                <a class="underline text-accent">the list is endless!</a> but i
                hope this small selection of things will satisfy you. for now.
              </p>
            </div>
          </div>

          <div>
            <h2 class="text-3xl text-primary">socials</h2>
            <div
              class="bg-base-200 border-2 p-2 border-primary rounded-xl text-center"
            >
              e-mail ~ <a
                href="mailto:tiger@kittycat.homes"
                class="text-accent underline"
                >tiger@kittycat.homes</a>
              <br />

              discord ~ <a href="https://discord.com" class="text-accent underline">comforttiger#0</a>
              <br />

              cohost ~ <a
                href="https://cohost.org/comforttiger"
                class="text-accent underline"
                >comforttiger</a>
            </div>
          </div>
        </div>
        <h2 class="text-3xl text-primary">webring</h2>
            <div
              class="bg-base-200 border-2 p-2 border-primary rounded-xl text-center w-max"
            >
              <a
                href="https://webring.kittycat.homes/previous/tiger"
                class="text-accent underline"
                >prev</a
              >
              ~
              <a
                href="https://webring.kittycat.homes/"
                class="text-accent underline"
                >kittycat.homes</a
              >
              ~
              <a
                href="https://webring.kittycat.homes/next/tiger"
                class="text-accent underline"
                >next</a
              >
            </div>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <div class="flex flex-col gap-2">
          <h2 class="text-3xl text-accent">~recent blog posts~</h2>
          <div class="card bg-base-200 border-2 border-accent">
            <div class="card-body">
              <h3 class="card-title">hehe</h3>
              <p>today i am laughing... hahahahaha!!! mwahahahaha!</p>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <h2 class="text-3xl text-accent">~things i've made~</h2>
          <div class="card bg-base-200 border-2 border-accent">
            <div class="card-body">
              <h3 class="card-title">Untitled Plant Game</h3>
              <p>a game about taking care of a very talkative plant</p>
            </div>
          </div>
          <div class="card bg-base-200 border-2 border-accent">
            <div class="card-body">
              <h3 class="card-title">Trainyard Trouble</h3>
              <p>
                a game about managing trains and keeping your cargo bay from
                overflooding
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <p>
      check out my <NuxtLink to="/zoe" class="text-primary">wife!!!</NuxtLink>
    </p> -->
  </div>
</template>
