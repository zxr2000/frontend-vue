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

import axios from "core-js/internals/queue";

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
    jumpback() {
      this.$router.push({path:'/user/my'})
    },
    async search() {
      const response = await axios.get('/api/search', {
        params: { keyword: this.searchKeyword }
      });
      this.results = response.data;
    }
  }
}
</script>

<style scoped>

</style>
