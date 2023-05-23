<template>
  <el-text>查看推荐——陌生人</el-text>

  <el-table :data="tableData" border stripe style="width: 100%">
    <el-table-column type="selection" width="55" />
    <el-table-column prop="id" label="ID" />
    <el-table-column prop="username" label="username" />
  </el-table>
</template>




<script>
export default {
  name: "StrangerView",
  data() {
    return {
      tableData: [
        {
          id: 1,
          username: 'Tom'
        },
      ]
    }
  }
}

</script>

<style scoped>

</style>
