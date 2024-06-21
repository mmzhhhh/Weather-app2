<template>
  <div class="font-montserrat bg-pattern dark:bg-pattern-dark">
    <main class=" min-h-screen p-7 bg-gradient-to-b from-opacity-25 to-opacity-100">
      <!-- 搜索框 -->
      <div class="mb-7">
        <input type="text" placeholder="Serach..."
          class="block w-1/3 p-3 text-lg shadow-md bg-white bg-opacity-60 focus:outline-none transition-all duration-500  ring-1 ring-slate-600"
          v-model="query" @keypress="fetchWeather">
      </div>
      <!-- 天气区域 -->
      <div class=" text-center text-slate-800 dark:text-slate-200" v-if="typeof weather.main != 'undefined'">
        <!-- 城市和日期 -->
        <div>
          <div class="text-3xl font-black">{{ weather.name }},{{ weather.sys.country }}</div>
          <div class="text-xl font-bold italic">{{ dateBuilder() }}</div>
        </div>

        <!-- 当前天气和温度 -->
        <div>
          <div
            class="inline-block px-6 py-3 bg-white text-8xl bg-opacity-50 font-black   outline-none rounded-2xl my-8 shadow-md">
            {{ Math.round(weather.main.temp) }}&deg;c</div>
          <div class="text-7xl font-bold italic">{{ weather.weather[0].main }}</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const api_key = 'c4e8db3e6c1d8b35d9271e423bd7240f';
const url_base = 'http://api.openweathermap.org/data/2.5/';

const query = ref('')
const weather = ref({})

//获取天气
const fetchWeather = (e) => {
  if (e.key == 'Enter') {
    fetch(`${url_base}weather?q=${query.value}&units=metric&APPID=${api_key}`)
      .then(res => {
        return res.json();
      }).then(setResults);
  }
}

// 转化获取的天气
const setResults = (res) => {
  weather.value = res;
  console.log(weather);
}

const dateBuilder = () => {
  const now = new Date();
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  console.log(now);

  const localOffset = now.getTimezoneOffset() * 60;//本地时间偏移，秒为单位
  const targetOffset = weather.value.timezone;//天气数据中的时区
  console.log(weather.value.timezone);
  const targetTime = new Date(now.getTime() + (targetOffset + localOffset) * 1000);
  console.log(targetTime);
  let day=days[targetTime.getUTCDay()];
  let date=targetTime.getUTCDate();
  let month=months[targetTime.getUTCMonth()];
  let year=targetTime.getUTCFullYear();

  const hours = targetTime.getHours();
  const minutes = targetTime.getUTCMinutes().toString().padStart(2, '0');
  const seconds = targetTime.getUTCSeconds().toString().padStart(2, '0');

  return `${day} ${date} ${month} ${year} ${hours}:${minutes}:${seconds}`
}

</script>

<style>
input:focus{
  border-radius: 25px;
}
</style>
