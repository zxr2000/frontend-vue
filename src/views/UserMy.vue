<template>
  <div>
    <el-row>
<!--      <el-col :span="12">-->
<!--        <div class="demo-basic&#45;&#45;circle">-->
<!--          <div class="block"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>-->
<!--          <div class="block" v-for="size in sizeList" :key="size">-->
<!--            <el-avatar :size="size" :src="circleUrl"></el-avatar>-->
<!--          </div>-->
<!--        </div>-->
<!--      </el-col>-->
      <div style="margin-left:200px;margin-right: 600px">
        {{username}}
      </div>
      <el-button type="primary" round @click="jumptofriend">我的好友</el-button>
      <el-button type="primary" round @click="jumptomessage">我的消息</el-button>
      <el-button type="primary" round @click="jumpback">退出登录</el-button>
      <el-button round @click="jumptouser">返回首页</el-button>
    </el-row>
  </div>
  <div style="margin-top: 80px">
    <el-row>
      <el-col :span="4" v-for="(o, index) in 3" :key="o" :offset="3">
        <el-card :body-style="{ padding: '0px' }">
          <img src="imageUrl" class="image">
          <div style="padding: 10px;">
            <span>{{movieName}}</span>
            <div class="bottom clearfix">
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <div style="margin-top: 80px">
      <el-button type="primary" :icon="ArrowLeft" @click="previouspage"/>
      <span style="margin-right: 25px;margin-left: 25px">第{{currentPage}}/{{pageSum}}页</span>
      <el-button type="primary" :icon="ArrowRight" @click="nextpage"/>
  </div>
</template>

<script>
import { ArrowLeft,ArrowRight } from "@element-plus/icons";
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
      username: '用户名',
      movieName:'电影名',
      imgUrl:'',
      currentPage:1,
      pageSum:10
    }
  },
  methods: {
    updateUsername() {
      // 通过请求获取当前已登录用户的用户名，更新username
      // 例如，从后端API获取当前已登录用户的用户名
      axios.get('/api/user').then(response => {
        this.username = response.data.username
      }).catch(() => {
        // 如果没有登录或者请求失败，清空用户名
        this.username = ''
      })
    },
    jumptofriend() {
      this.$router.push({path:'/user/my/friend'})
    },
    jumptomessage() {
      this.$router.push({path:'/user/my/message'})
    },
    jumpback() {
      this.$router.push({path:'/login'})
    },
    jumptouser() {
      this.$router.push({path:'/user'})
    },
    previouspage(){
    },
    nextpage(){
    }
  },
  mounted() {
    this.updateUsername()
  },
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

<style scoped>

</style>
