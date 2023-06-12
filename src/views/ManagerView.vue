<template>
  <div class="manager">
    <div style="margin: 10px 0">
      <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
    </div>
    <div style="margin: 10px; width:20%; display: flex">
      <el-input v-model="search" placeholder="请输入查找用户名" />
      <el-button type="primary" style="margin-left: 5px" @click="searchUsename">查询</el-button>
    </div>
    <el-table :data="showData" border stripe style="width: 100%">
      <el-table-column prop="id" label="id" />
      <el-table-column prop="username" label="username" />
      <el-table-column prop="gender" label="gender" />
<!--      <el-table-column prop="password" label="password" />-->
      <el-table-column label="password">******</el-table-column>
      <el-table-column prop="type" label="type" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click.prevent="() => deleteItem(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="prev, pager, next"
        :total="total"
        background
        >
      </el-pagination>
    </div>

    <el-dialog v-model="dialogVisible" title="Tips" width="30%">
      <el-form :model="form">
        <el-form-item label="username">
          <el-input v-model="form.username" style="width:80%"></el-input>
        </el-form-item>

        <el-form-item label="password">
          <el-input v-model="form.password" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="age">
          <el-input v-model="form.age" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="gender">
          <el-input v-model="form.gender" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="occupation">
          <el-input v-model="form.occupation" style="width:80%"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="addItem">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>



<script>
import axios from "axios";
import { ElMessage } from 'element-plus'
export default {
  name: "ManagerView",
  components: {},

  data() {
    return {
      form: {},
      search: '',
      currentPage: 1,
      total: 0,
      dialogVisible: false,
      tableData: [],
      showData: [],
      index: 0
    }
  },

  created() {
    this.load()
  },
  computed: {
    showUserName() {
      return window.localStorage.getItem("username")
    }
  },
  methods: {
    logout() {
      this.$router.push({ path: '/login' });
      window.localStorage.clear();
    },

    searchUsename() {
      axios.get("http://localhost:8888/api/user/getUser", {
        params: {
          username: this.search
        }
      }).then(res => {
        console.log(res)
        this.showData = [res.data.data]
      })
    },

    load() {
      axios.get("http://localhost:8888/api/user/getAll", {
        params: {
          userId: window.localStorage.getItem("userId"),
        }
      }).then(res => {
        this.tableData = res.data.data
        this.total = Math.ceil(res.data.data.length / 20) * 10
        this.showData = this.tableData.slice(this.index, this.index + 20);
      })
    },
    addItem() {
      const data = new FormData();
      data.append("username", window.localStorage.getItem("username"))
      data.append("password", window.localStorage.getItem("password"))
      data.append("createUsername", this.form.username)
      data.append("createPassword", this.form.password)
      data.append("createAge", this.form.age)
      data.append("createGender", this.form.gender)
      data.append("createOccupation", this.form.occupation)
      axios.post("http://localhost:8888/api/user/create", data).then(res => {
        console.log(res);
        if (res.data.status === "FAILURE" || res.data.status === "UNAUTHORIZED") {
          ElMessage({
            message: res.data.data,
            type: "error"
          })
        } else {
          ElMessage({
            message: "成功创建新用户",
            type: "success"
          });
          this.dialogVisible = false;
        }
      })
    },
    deleteItem(index) {
      const userID = this.showData[index].id;
      const data = new FormData();
      data.append("username", window.localStorage.getItem("username"));
      data.append("password", window.localStorage.getItem("password"));
      data.append("deleteId", userID);
      console.log("开始执行删除", userID)
      axios.post("http://localhost:8888/api/user/delete", data).then(res => {
        console.log(res)
        if (res.data.status === "SUCCESS") {
          ElMessage({
            type: "success",
            message: "删除用户成功"
          })
        } else {
          ElMessage({
            type: "error",
            message: res.msg
          })
        }
        this.load()  // 删除之后重新加载表格的数据
      })
    },
    handleCurrentChange(pageNum) {  // 改变当前页码触发
      this.currentPage = pageNum;
      this.showData = this.tableData.slice((this.currentPage - 1) * 20, (this.currentPage - 1) * 20 + 20)
    }
  }
}
</script>

<style scoped>
.pagination {
  margin: 10px;
  /* margin-left: 50%;
  transform: translate(-50%); */
}
</style>

