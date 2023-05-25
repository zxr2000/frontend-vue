<template>
  <el-text>查看推荐——陌生人</el-text>

  <el-table :data="tableData" border stripe style="width: 100%">
    <el-table-column type="selection" width="55" />
    <el-table-column prop="id" label="ID" />
    <el-table-column prop="username" label="username" />
  </el-table>

  <div style="margin: 10px 0">
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>
</template>




<script>
import request from "@/utils/request";

export default {
  name: "StrangerView",
  data() {
    return {
      search: '',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [
      ]
    }
  },
  // created() {
  //   this.load()
  // },
  methods:{
    load(){
      request.get("api/user/getAll", {
        params: {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          search: this.search
        }
      }).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    handleSizeChange(pageSize) {   // 改变当前每页的个数触发
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {  // 改变当前页码触发
      this.currentPage = pageNum
      this.load()
    }
  }
}

</script>

<style scoped>

</style>
