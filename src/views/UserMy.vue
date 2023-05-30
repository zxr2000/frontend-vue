<template>
  <h1>我点赞过的电影列表</h1>
  <div class="myMovie-container"> 
    <div class="movie-item" v-for="(item, index) in movies" :key="index">
      <img :src="imgUrl" alt="点赞过的电影" loading="lazy">
      <div class="movie-itemTitle">{{ item.title }}</div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import {ref, reactive } from "vue";
import imgUrl from "@/assets/movie.jpg"
const movies = ref([])
axios.get("http://localhost:8888/api/rating/getByUser", {
  params: {
    userId: window.localStorage.getItem("userId")
  }
}).then(res => {
  console.log(res.data.data);
  movies.value = res.data.data;
})
</script>

<style scoped>
h1 {
  text-align: center;
  font-weight: 600;
  font-size: 23px;
}
.myMovie-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.movie-item {
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  width: 300px;
  height: 400px;
  margin-top: 20px;
  transition: all .5s ease;
  border-radius: 10px;
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
</style>
