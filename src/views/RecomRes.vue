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
    RECOMMENDATION
  </div>
  <div style="margin-top: 20px">
    <table>
      <thead>
      <tr>
        <th>图片</th>
        <th>文字</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td><img :src="`/static/img/${item.image}`"></td>
        <td>
          <div>{{ item.title }}</div>
          <div>{{ item.rating }}</div>
          <div>{{ item.details }}</div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "RecomRes",
  data() {
    return {
      myusername: '用户名',
      items:[]
    }
  },
  mounted() {
    axios.get('backend-api-url')
        .then(response => {
          this.items = response.data.items
        })
        .catch(error => {
          console.log(error)
        })
  },
  methods: {
    jumpback() {
      this.$router.push({path: '/user/recom'})
    },
  }
}
</script>

<style scoped>
td div {
  white-space: pre-line;
}
</style>
