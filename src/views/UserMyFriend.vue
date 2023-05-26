<template>
  <div>
    <el-row>
      <div style="margin-left:400px;margin-right: 500px">
        {{myusername}}
      </div>
      <el-button round @click="jumpback">返回</el-button>
    </el-row>
  </div>
  <div>
    <input type="text" placeholder="请输入搜索关键词" v-model="searchKeyword">
    <button @click="search">搜索</button>
    <ul>
      <li v-for="result in results">{{ result }}</li>
    </ul>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "UserMyFriend",
  data() {
    return {
      myusername: '用户名',
      searchKeyword: '',
      results:[],
    }
  },
  methods: {
    updateUsername() {
      // 通过请求获取当前已登录用户的用户名，更新username
      // 例如，从后端API获取当前已登录用户的用户名
      axios.get('/api/user').then(response => {
        this.myusername = response.data.username
      }).catch(() => {
        // 如果没有登录或者请求失败，清空用户名
        this.myusername = ''
      })
    },
    jumpback() {
      this.$router.push({path:'/user/my'})
    },
    async search() {
      const response = await axios.get('/api/search', {
        params: { keyword: this.searchKeyword }
      });
      this.results = response.data;
    }
  },
  mounted() {
    this.updateUsername()
  },
}
</script>

<style scoped>

</style>
