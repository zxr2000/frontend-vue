<template>
  <div class="login-container">
    <img src="../assets/img.png" style="height: 200px;width: 280px">
    <el-form ref="form" :model="form">
      <el-form-item label="Username" style="width: 400px">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Password" style="width: 400px">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item style="width: 400px;">
        <el-button type="primary" @click="onSubmit">Login</el-button>
        <el-button type="primary" @click="dialogVisible = true">Register</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
    <el-dialog v-model="dialogVisible" title="Tips" width="30%">
      <el-form :model="form1">
        <el-form-item label="username">
          <el-input v-model="form1.username" style="width:80%"></el-input>
        </el-form-item>

        <el-form-item label="password">
          <el-input v-model="form1.password" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="age">
          <el-input v-model="form1.age" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="gender">
          <el-input v-model="form1.gender" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="occupation">
          <el-input v-model="form1.occupation" style="width:80%"></el-input>
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
import { ElMessage } from "element-plus";
export default {
  name: "Login",
  data() {
    return {

      form: {
        name: '',
        password: ''
      },
      form1: {},
      dialogVisible: false
    }
  },
  methods: {
    onSubmit() {
      const username = this.form.name;
      const password = this.form.password;
      // 发送登录请求给后台 API
      axios.post('http://localhost:8888/api/user/login', {
        username: username,
        password: password
      }).then((response) => {
            // 登录成功，保存用户信息到本地
            console.log(response.data.data)
            let status = response.data.data.status === "用户名或密码错误" ? 0 : 1;
            let type = response.data.data.type ?? null;
            let userId = response.data.data.userId;
            if(status === 1) {
              window.localStorage.setItem("user", type);
              window.localStorage.setItem("username", this.form.name);
              window.localStorage.setItem("password", this.form.password);
              window.localStorage.setItem("userId", userId);
              ElMessage({
                type: "success",
                message: "登录成功"
              })
              this.$router.push("/home")
            } else if(status === 0) {
              ElMessage({
                type: "error",
                message: "用户名或密码错误"
              })
            }
          })
    },
    addItem() {
      const data = new FormData();
      data.append("username", window.localStorage.getItem("username"))
      data.append("password", window.localStorage.getItem("password"))
      data.append("createUsername", this.form1.username)
      data.append("createPassword", this.form1.password)
      data.append("createAge", this.form1.age)
      data.append("createGender", this.form1.gender)
      data.append("createOccupation", this.form1.occupation)
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
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/deep/ .el-form-item__content {
  display: flex;
  justify-content: center!important
}

img {
  margin-bottom: 40px;
}
</style>
