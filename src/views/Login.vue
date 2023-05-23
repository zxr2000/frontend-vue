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
      axios.post('/api/user/login', {
        username: username,
        password: password
      })
          .then((response) => {
            // 登录成功，保存用户信息到本地
            const token = response.data.token;
            localStorage.setItem('token', token);
            // 跳转到首页
            this.$router.push({path:'/user'});
          })
          .catch((error) => {
            // 登录失败，给出提示
            alert(error.response.data.message);
          });
    }
  }
}
</script>

<style scoped>

</style>
