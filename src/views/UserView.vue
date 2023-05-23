<template>
  <div>
    <img src="../assets/img_1.png" style="height: 400px;width: 700px">
    <div style="margin-top: 80px">
      <el-button type="primary" round @click="jumpto1">评分</el-button>
      <el-button type="primary" round @click="jumpto2" style="margin-left: 80px">查看推荐</el-button>
      <el-button type="primary" round @click="jumpto3" style="margin-left: 80px">我的</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserView",
  methods: {
    jumpto1() {
    },
    jumpto2() {
      this.$router.push({path:'/user/recom'})
    },
    jumpto3() {
      this.$router.push({path:'/user/my'})
    }
  }
}
</script>

<style scoped>

</style>
