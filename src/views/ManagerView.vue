
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
      <el-button type="primary" style="margin-left: 5px" @click="load">查询</el-button>
    </div>
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="username" label="username" />
      <el-table-column prop="nickname" label="nickName" />
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
        <el-form-item label="id">
          <el-input v-model="form.id" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="username">
          <el-input v-model="form.username" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="nickname">
          <el-input v-model="form.nickname" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="password">
          <el-input v-model="form.password" style="width:80%"></el-input>
        </el-form-item>
      </el-form>
      <span>新增用户</span>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="save = false">
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
      tableData: []
    }
  },

  // created() {
  //   this.load()
  // },
  computed: {
    showUserName() {
      return jsCookie.get('username')
    }
  },
  methods: {
    jumpback() {
      this.$router.push({path: '/login'})
    },

    load() {
      axios.get("api/user/getAll", {
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
    add() {
      this.dialogVisible = true
      this.form = {}

      this.$nextTick(() => {
        // 关联弹窗里面的div，new一个 editor对象
        if (!user) {
          user = new E('#div1')

          // 配置 server 接口地址
          user.config.uploadImgServer = 'http://' + window.server.filesUploadUrl + ':8888/files/user/upload'
          user.config.uploadFileName = "file"  // 设置上传参数名称
          user.create()
        }

        user.txt.html("")

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
    handleSizeChange(pageSize) {   // 改变当前每页的个数触发
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {  // 改变当前页码触发
      this.currentPage = pageNum
      this.load()
    }
    // mounted() {
    //   this.load()
    // }
  }
}
</script>

<style scoped>



</style>
