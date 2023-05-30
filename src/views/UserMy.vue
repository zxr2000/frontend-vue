<template>
  <div style="margin-top: 80px">
    <el-row>
        <el-card :body-style="{ padding: '0px' }">
          <img src="imageUrl" class="image">
          <div style="padding: 10px;">
            <span>{{ movieName }}</span>
            <div class="bottom clearfix">
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
    </el-row>
  </div>
  <div style="margin-top: 80px">
    <el-button type="primary" :icon="ArrowLeft" @click="previouspage" />
    <span style="margin-right: 25px;margin-left: 25px">第{{ currentPage }}/{{ pageSum }}页</span>
    <el-button type="primary" :icon="ArrowRight" @click="nextpage" />
  </div>
</template>

<script>
import { ArrowLeft, ArrowRight } from "@element-plus/icons";
import axios from "axios";
export default {
  name: "UserMy",
  setup() {
    return {
      ArrowLeft,
      ArrowRight
    }
  },
  data() {
    return {
      movieName: '电影名',
      imgUrl: '',
      currentPage: 1,
      pageSum: 10
    }
  },
  methods: {},
  created() {
    // 使用axios库，调用后端接口，从数据库中读取电影名及对应的图片url
    // 并将其保存到data属性中
    axios.get('/api/movies/1').then((response) => {
      const data = response.data;
      this.movieName = data.movieName;
      this.imgUrl = data.imgUrl;
    }).catch((err) => {
      console.error('failed to fetch movie data:', err);
    });

    
  },
  computed: {
    imageUrl() {
      // 返回一个由电影名所确定的图片的url
      return `https://example.com/images/${this.imgUrl}`;
    }
  }
}
</script>

<style scoped></style>
