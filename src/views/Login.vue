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
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
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
      }
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
                message: "登录成果"
              })
              this.$router.push("/home")
            } else if(status === 0) {
              ElMessage({
                type: "error",
                message: "用户名或密码错误"
              })
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
