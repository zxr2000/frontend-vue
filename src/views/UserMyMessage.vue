<template>
  <div style="margin-left: -300px;margin-top: 50px">
    好友添加请求：
  </div>
  <div style="margin-left: 500px;margin-top: 10px">
    <el-table :data="tableData" stripe style="width:400px">
      <el-table-column prop="username" width="180"/>
      <el-table-column>
        <el-button type="success" plain @click="accept(row)">同意</el-button>
      </el-table-column>
      <el-table-column>
        <el-button type="info" plain @click="refuse(row)">拒绝</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "UserMyMessage",
  data() {
    return {
      myusername: '用户名',
      tableData : [
        {
          username: 'Tom',
        },
        {
          username: 'Tommy',
        },
        {
          username: 'Jack',
        },
        {
          username: 'Timmy',
        },
      ],
      selectedRequest: null,
    }
  },
  // created() {
  //   axios.get('/api/friend/requests').then((response) => {
  //     this.tableData = response.data;
  //   });
  // },
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
    accept(row){
      axios.put(`/api/friend/requests/${row.id}`, { status: 'accepted' }).then((response) => {
        row.status = response.data.status;
      });
    },
    refuse(row){
      axios.put(`/api/friend/requests/${row.id}`, { status: 'refused' }).then((response) => {
        row.status = response.data.status;
      });
    }
  },
  mounted() {
    this.updateUsername()
  },
}
</script>

<style scoped>

</style>
