<template>
  <div class="recommend-container">
    <h1>电影推荐</h1>
    <div class="recommendMovies-container" v-loading="loading">
      <div class="movie-item" v-for="(item, index) in recommendMovies" :key="index">
        <img :src="require(`../assets/poster${index+20}.png`)" v-if="index<10" alt="电影" loading="lazy">
        <img :src="imgUrl" v-if="index>9" alt="已评分电影" loading="lazy">
        <div class="movie-itemTitle">{{ item.title }}</div>
        <div class="movie-itemRating">个性化推荐得分：{{item.rating}}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios"
import { ref } from "vue"
import imgUrl from "@/assets/SAO.jpg"

const loading = ref(true)
const recommendMovies = ref([]);
function loadMovies() {
  axios.get("http://121.43.110.55:8888/api/movie/getRecommend", {
    params: {
      userId: window.localStorage.getItem("userId")
    }
  }).then(res => {
    console.log(res.data);
    recommendMovies.value = res.data.data
    loading.value = false;
  })
}
loadMovies()

</script>

<style scoped>
h1 {
  text-align: center;
  font-weight: 600;
  font-size: 23px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  color: #000;
  border-radius: 5px;
}

.recommendMovies-container {
  display: flex;
  flex-wrap: wrap;
  min-height: calc(100vh - 180px);
}

.movie-item {
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  max-width: 190px;
  height: 300px;
  margin-top: 40px;
  margin-left: 10px;
  transition: all .5s ease;
  cursor: pointer;
}
img  {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.movie-item:hover {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}
.movie-itemTitle {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-weight: 600;
  background-color: rgba(0,0,0,0.5);
  color: #fff;
}
/*.movie-itemRating {*/
/*  position: relative;*/
/*  bottom: 10px;*/
/*  left: 50%;*/
/*  transform: translateX(-50%);*/
/*  text-align: center;*/
/*  font-weight: 600;*/
/*  background-color: rgba(0,0,0,0.5);*/
/*  color: #fff;*/
/*}*/

</style>





