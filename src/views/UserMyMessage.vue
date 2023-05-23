<template>
  <div>
    <el-row>
      <div style="margin-left:400px;margin-right: 500px">
        {{myusername}}
      </div>
      <el-button round @click="jumpback">返回</el-button>
    </el-row>
  </div>
  <div style="margin-left: -300px;margin-top: 50px">
    好友添加请求：
  </div>
  <div style="margin-left: 500px;margin-top: 10px">
    <el-table :data="tableData" stripe style="width:400px">
      <el-table-column prop="username" width="180"/>
      <el-table-column>
        <el-button type="success" plain @click="accept">同意</el-button>
      </el-table-column>
      <el-table-column>
        <el-button type="info" plain @click="refuse">拒绝</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

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
      ]
    }
  },
  methods: {
    jumpback() {
      this.$router.push({path:'/user/my'})
    },
    accept(){
    },
    refuse(){
    }
  }
}
</script>

<style scoped>

</style>
