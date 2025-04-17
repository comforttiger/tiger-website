<template>
  <div class="w-full flex items-center justify-center">
    <div class="min-h-screen flex flex-col w-full gap-16">
      <article class="w-full flex items-center justify-center flex-col gap-2">
        <div class="md:p-20 flex flex-col gap-2">
          <h1
            class="text-primary font-display text-5xl underline decoration-accent decoration-4 bg-base-100 rounded-xl p-5 w-fit"
          >
            lotte time
          </h1>
        </div>

        <div class="text-neutral p-5 max-w-3xl w-full flex flex-col gap-4">
          <div
            class="text-primary text-3xl font-bold bg-base-100 rounded-xl p-5 font-display"
          >
            <p>
              {{ currentTime.hour }}:{{ currentTime.minute }}:{{
                currentTime.second
              }}
              {{ currentTime.day }}/{{ currentTime.month }}/{{
                currentTime.year
              }}
            </p>
            <p class="italic text-2xl font-normal">
              month of {{ currentTime.monthName }}
            </p>
          </div>

          <div class="bg-base-100 rounded-xl p-5">
            <h2 class="text-2xl text-primary font-display">
              what's lotte time?!
            </h2>
            <div class="space-y-3">
            <p>lotte time is a time system i invented for fun!</p>
            <p>
              in it, every unit of time is divided into 24; 24 seconds in a
              minute in an hour in a day in a month in a year!
            </p>
            <p>
              that makes it so that one day in normal time is equivalent to 6.25
              days in lotte time, and a year is a little less than four years!!
              <em>that's a lotte time</em>!
            </p>
            <p>the year 0 in lotte time begins on October 14, 2000 in normal time. (which just so happens to be my birthday)</p>
            <p>i'm 97 years old in lotte time as of writing this, and 24 years old in normal time.</p>

            <h3 class="text-xl text-primary font-display">the months</h3>
            <p>there are 24 months in a year, and each month has a name.</p>
            <ol class="list-decimal list-inside pl-4">
            <li>lotte</li>
            <li>two</li>
            <li>mute</li>
            <li>E</li>
            <li>👻</li>
            <li>comfort</li>
            <li>lazy</li>
            <li>communism</li>
            <li>spetember</li>
            <li>love</li>
            <li>tiger</li>
            <li>vengeance</li>
            <li>poison</li>
            <li>pride month</li>
            <li>abby</li>
            <li>destruction</li>
            <li>the sun</li>
            <li>destruction (pt 2)</li>
            <li>pali</li>
            <li>creachers</li>
            <li>math</li>
            <li>fire</li>
            <li>giving</li>
            <li>burglary</li>
  </ol>
            </div>
          </div>

          <div class="bg-base-100 rounded-xl p-5">
            <h2 class="text-2xl text-primary font-display">
              convert normal time to lotte time
            </h2>
            <div class="flex flex-col gap-8">
              <div class="flex gap-2 items-center">
                <label for="datetime">date and time:</label>
                <input
                  v-model="inputDate"
                  type="datetime-local"
                  id="datetime"
                  @change="convertToLotte"
                />
              </div>
              <div class="text-primary text-3xl font-bold font-display">
                <p>
                  {{ convertedTime.hour }}:{{ convertedTime.minute }}:{{
                    convertedTime.second
                  }}
                  {{ convertedTime.day }}/{{ convertedTime.month }}/{{
                    convertedTime.year
                  }}
                </p>
                <p class="italic text-2xl font-normal">
                  month of {{ convertedTime.monthName }}
                </p>
              </div>
            </div>
          </div>

          <div class="bg-base-100 rounded-xl p-5">
            <h2 class="text-2xl text-primary font-display">
              convert lotte time to normal time
            </h2>
            <div class="flex flex-col gap-8">
              <div class="flex gap-2">
                <div
                  v-for="(field, key) in lotteInput"
                  :key="key"
                  class="flex flex-col gap-2"
                >
                  <label>{{ key }}</label>
                  <input
                    v-model.number="lotteInput[key]"
                    type="number"
                    min="0"
                    max="23"
                  />
                </div>
              </div>
              <div class="text-primary text-3xl font-bold font-display">
                <p>{{ normalOutput }}</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const YEAR_ZERO = 971474400;
const MONTHS = [
  "lotte",
  "two",
  "mute",
  "E",
  "👻",
  "comfort",
  "lazy",
  "communism",
  "spetember",
  "love",
  "tiger",
  "vengeance",
  "poison",
  "pride month",
  "abby",
  "destruction",
  "the sun",
  "destruction (pt 2)",
  "pali",
  "creachers",
  "math",
  "fire",
  "giving",
  "burglary",
];

const currentTime = ref({
  year: "",
  month: "",
  day: "",
  hour: "",
  minute: "",
  second: "",
  monthName: "",
});
const inputDate = ref("");
const convertedTime = ref({
  year: "0000",
  month: "01",
  day: "01",
  hour: "00",
  minute: "00",
  second: "00",
  monthName: "Not a Month",
});
const lotteInput = ref({
  hour: 0,
  minute: 0,
  second: 0,
  day: 1,
  month: 1,
  year: 0,
});
const normalOutput = ref("");

function updateCurrentLotteTime() {
  insertDate(Date.now(), currentTime.value);
  setTimeout(updateCurrentLotteTime, 1000);
}

function convertToLotte() {
  const timestamp = Date.parse(inputDate.value);
  insertDate(timestamp, convertedTime.value);
}

function insertDate(timestamp: number, target: any) {
  timestamp = Math.floor(timestamp / 1000) - YEAR_ZERO;
  target.year = pad(Math.floor(timestamp / 24 ** 5), 4);
  const monthIndex = unit(timestamp / 24 ** 4);
  target.month = pad(monthIndex + 1, 2);
  target.day = pad(unit(timestamp / 24 ** 3) + 1, 2);
  target.hour = pad(unit(timestamp / 24 ** 2), 2);
  target.minute = pad(unit(timestamp / 24), 2);
  target.second = pad(unit(timestamp), 2);
  target.monthName = MONTHS[monthIndex] || "Not a Month";
}

function convertToNormal() {
  const { year, month, day, hour, minute, second } = lotteInput.value;
  const timestamp =
    year * 24 ** 5 +
    (month - 1) * 24 ** 4 +
    (day - 1) * 24 ** 3 +
    hour * 24 ** 2 +
    minute * 24 +
    second +
    YEAR_ZERO;
  const date = new Date(timestamp * 1000);
  normalOutput.value = date.toLocaleString();
}

function unit(x: number) {
  return Math.floor(x - Math.floor(x / 24) * 24);
}

function pad(n: number, width: number) {
  return n.toString().padStart(width, "0");
}

onMounted(() => {
  updateCurrentLotteTime();
  watchLotteInput();
});

function watchLotteInput() {
  watch(() => ({ ...lotteInput.value }), convertToNormal, { deep: true });
}
</script>
