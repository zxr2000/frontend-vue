<template>
  <div class="movie-container">
    <h1>电影总览</h1>
    <div class="allMovie-container">
      <el-tooltip
          v-for="(item, index) in movies"
          effect="dark"
          content="点击进行电影评分"
          placement="top-start"
          :key="index">
        <div class="movie-item"   @click = "() => rateMovie(item)">
          <img :src="require(`../assets/poster${index+10}.png`)" v-if="index<10" alt="电影" loading="lazy">
          <img :src="image" v-if="index>9" alt="电影" loading="lazy">
          <div class="movie-itemTitle">{{ item.title }}</div>
          <div class="movie-itemRating">平均得分:{{item.avg}}</div>
        </div>
      </el-tooltip>
    </div>
  </div>

  <el-dialog v-model="dialogVisible" title="评分" width="30%">
    <div class="rating-container">
      <div>电影名：{{ movieInfo.title }}</div>
      <div>公映日期：{{ movieInfo.date }}</div>
      <el-button type="success" round @click="setScore(0)" size="small" class="btn">评为0分</el-button>
      <el-rate v-model="score"
               :texts="['烂片', '较差片', '普通', '佳作', '影史经典']"
               show-text
               @change="setScore"
               size="large"
      />
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from "vue"
import axios from "axios";
import image from "@/assets/yourname.jpg"
import { ElMessage } from "element-plus";
const movies = ref([]);
const score = ref(0);
const dialogVisible = ref(false);
const movieInfo = reactive({
  title: "",
  date: "",
  movieId: ""
})

axios.get("http://localhost:8888/api/movie/getAll").then((res) => {
  movies.value = res.data.data;
})

function rateMovie(item) {
  console.log(item);
  dialogVisible.value = true;
  movieInfo.title = item.title;
  movieInfo.date = item.date;
  movieInfo.movieId = item.id;
}

function setScore(score) {
  console.log(score)

  const data = new FormData();
  data.append("userId", window.localStorage.getItem("userId"))
  data.append("movieId", movieInfo.movieId)
  data.append("title", movieInfo.title)
  data.append("rating", String(score))
  axios.post("http://localhost:8888/api/rating/addRating", data).then(res => {
    console.log(res);
    dialogVisible.value = false;
    ElMessage({
      type: "success",
      message: "评分成功!!!"
    })
  })
}
</script>

<style scoped>
.btn {
  margin-right: 5px;
}
h1 {
  text-align: center;
  font-weight: 600;
  font-size: 23px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  color: #000;
  border-radius: 5px;
}

.allMovie-container {
  display: flex;
  flex-wrap: wrap;

}

.movie-item {
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  width: 190px;
  height: 300px;
  margin-top: 40px;
  margin-left: 10px;
  transition: all .5s ease;
  border-radius: 10px;
  cursor: pointer;
}

img {
  width: 100%;
  height: 100%;
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
/*  position: absolute;*/
/*  bottom: 10px;*/
/*  left: 50%;*/
/*  transform: translateX(-50%);*/
/*  text-align: center;*/
/*  font-weight: 600;*/
/*  background-color: rgba(0,0,0,0.5);*/
/*  color: #fff;*/
/*}*/
.movie-item:hover {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}
</style>
