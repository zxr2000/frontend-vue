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
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
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
      currentPage:1,
      pageSum:10
    }
  },
  methods: {
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
  }
}
</script>

<style scoped>

</style>
