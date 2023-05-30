<template>
  <div class="friendship-container">
    <div class="friendship-title">
      好友列表
    </div>
    <el-empty v-if="friends.length === 0" description="该用户没有好友" />
    <el-table :data="friends" stripe style="width: 100%" v-else>
      <el-table-column prop="username" label="用户名" width="180" />
      <el-table-column prop="password" label="密码" width="180" />
      <el-table-column prop="age" label="年龄" width="180"/>
      <el-table-column prop="gender" label="性别" width="180" />
      <el-table-column prop="type" label="用户类型"  />
  </el-table>
  </div>
</template>

<script setup>
import axios from "axios"
import { ref } from "vue"
const friends = ref([])
axios.get("http://localhost:8888/api/friendship/getAll", {
  params: {
    userId: window.localStorage.getItem("userId")
  }
}).then(res => {
  friends.value = res.data.data;
})
</script>

<style scoped>
.friendship-title {
  margin: 10px auto;
  text-align: center;
  font-size: 20px;
}

ul {
  list-style: none;
  
}
</style>
