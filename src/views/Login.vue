<template>
  <div>
    <img src="../assets/img.png" style="height: 200px;width: 280px">
    <el-form ref="form" :model="form" label-width="500px">
      <el-form-item label="ID/user_name:">
        <el-input v-model="form.name" style="width:500px"></el-input>
      </el-form-item>

      <el-form-item label="password:">
        <el-input v-model="form.password" style="width:500px"></el-input>
      </el-form-item>
      <el-form-item label-width="650px">
        <el-button type="primary" @click="onSubmit">log in</el-button>
        <el-button>cancel</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
import axios from "axios";

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
      })
          .then((response) => {
            // 登录成功，保存用户信息到本地
            console.log(response.data.data)
            let status = response.data.data.status === "用户名或密码错误" ? 0 : 1;
            let type = response.data.data.type ?? null;
            console.log("用户类型为:", type)
            if(status === 1) {
              window.localStorage.setItem("user", type);
              window.localStorage.setItem("username", this.form.name);
              window.localStorage.setItem("password", this.form.password);
            } else if(status === 0) {
              alert("error")
            }
          })
    }
  }
}
</script>

<style scoped>

</style>
