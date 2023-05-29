
<template>
  <div class="manager">
    <div>
      <el-avatar>
        <img src="../assets/portrait.jpg"/>
      </el-avatar>
    </div>
    <div>
      <h5 style="min-width: 100%;" class="mb-2">username{{showUserName}}</h5>
    </div>

    <div style="margin: 10px 0">
      <el-button type="primary" @click="add">编辑用户</el-button>
      <el-button type="primary" @click="jumpback">退出登录</el-button>
    </div>
    <!--query-->
    <div style="margin: 10px 10px ;width:20%;display: flex" >
      <el-input v-model="search" placeholder="请输入查找用户名" />
      <el-button type="primary" style="margin-left: 5px" @click="searchUsename">查询</el-button>
    </div>
    <el-table :data="showData" border stripe style="width: 100%">
      <el-table-column prop="id" label="id" />
      <el-table-column prop="username" label="username" />
      <el-table-column prop="gender" label="gender" />
      <el-table-column prop="password" label="password" />
      <el-table-column prop="type" label="type" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default>
          <el-button link type="primary" size="small" @click="Delete"
          >删除</el-button>
        </template>
      </el-table-column>
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

    <el-dialog v-model="dialogVisible"
               title="Tips"
               width="30%"
    >
      <el-form :model="form" >
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
          <el-button type="primary" @click="add">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>



<script>
import jsCookie from 'js-cookie';
import axios from "axios";
//import {request} from "axios";
import E from 'wangeditor'
//import request from "@/utils/request";
let user

export default {
  name: "ManagerView",
  components: {},

  data() {
    return {
      form: {},
      search: '',
      currentPage: 1,
      pageSize: 10,
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
      return jsCookie.get('username')
    }
  },
  methods: {
    jumpback() {
      this.$router.push({path: '/login'})
    },

    searchUsename() {
      axios.get("http://localhost:8888/api/user/getUser", {
        params: {
          username: this.search
        }
      }).then(res => {
        console.log(res)
        this.showData =  [res.data.data]
      })
    },

    load() {
      axios.post("http://localhost:8888/api/user/getAll", {
          page: this.currentPage,
          size: this.pageSize,
          //search: this.search
        }
      ).then(res => {
        this.tableData = res.data.data
        this.total = res.data.data.length
        this.showData = this.tableData.slice(this.index, this.index + 20);
      })
    },
    add() {
      this.dialogVisible = true
      console.log(this.form)

      axios.post("http://localhost:8888/api/user/create", {
        createUsername: this.form.username,
        createPassword: this.form.password,
        createAge: this.form.age,
        createGender: this.form.gender,
        createOccupation: this.form.occupation
      }).then(res => {
        console.log(res)
      })
    },
    // save() {
    //   request.post("/api/user/create", this.form).then(res => {
    //     console.log(res)
    //   })
    // },
    save() {
      this.form.content = user.txt.html()  // 获取 编辑器里面的值，然后赋予到实体当中

      if (this.form.id) {  // 更新
        axios.put("api/user/create", this.form).then(res => {
          console.log(res)
          if (res.code === '0') {
            this.$message({
              type: "success",
              message: "更新成功"
            })
          } else {
            this.$message({
              type: "error",
              message: res.msg
            })
          }
          this.load() // 刷新表格的数据
          this.dialogVisible = false  // 关闭弹窗
        })
      } else {  // 新增
        let userStr = sessionStorage.getItem("user") || "{}"
        let user = JSON.parse(userStr)
        this.form.username= user.username

        axios.post("/news", this.form).then(res => {
          console.log(res)
          if (res.code === '0') {
            this.$message({
              type: "success",
              message: "新增成功"
            })
          } else {
            this.$message({
              type: "error",
              message: res.msg
            })
          }

          this.load() // 刷新表格的数据
          this.dialogVisible = false  // 关闭弹窗
        })
      }

    },
    Delete(id) {
      console.log(id)
      axios.delete("api/user/delete" + id).then(res => {
        if (res.code === '0') {
          this.$message({
            type: "success",
            message: "删除成功"
          })
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
        this.load()  // 删除之后重新加载表格的数据
      })
    },
    handleCurrentChange(pageNum) {  // 改变当前页码触发
      this.currentPage = pageNum;
      this.showData = this.tableData.slice( (this.currentPage - 1) *  20 ,  (this.currentPage - 1) * 20 + 20)
      console.log(this.showData)
    }
    // mounted() {
    //   this.load()
    // }
  }
}
</script>

<style scoped>



</style>
