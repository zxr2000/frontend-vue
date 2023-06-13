<template>
  <div class="friendship-container">

    <el-dialog v-model="dialogTableVisible" title="陌生人列表">
      <el-table :data="strangerList" stripe style="width: 100%">
        <el-table-column prop="username" label="用户名" width="180" />
        <el-table-column prop="age" label="年龄" width="180" />
        <el-table-column prop="gender" label="性别" />
        <el-table-column fixed="right" label="Operations" width="120">
          <template #default="scope">
            <el-button link type="success" @click="followStranger(scope.row.username)">点击关注</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <div class="friendship-title">
      <span>好友/关注列表</span>
    </div>
    <el-empty v-if="friends.length === 0" description="该用户没有好友" />
    <div v-else>
      <el-popover placement="top-start" title="陌生人列表" :width="200" trigger="hover" content="点击查看陌生人列表以便进行及时的关注">
        <template #reference>
          <el-icon class="add" @click="showList">
            <Plus />
          </el-icon>
        </template>
      </el-popover>
      <el-table :data="friends" stripe style="width: 100%">
        <el-table-column prop="username" label="用户名" width="180" />
        <el-table-column prop="password" label="密码" width="180" />
        <el-table-column prop="age" label="年龄" width="180" />
        <el-table-column prop="gender" label="性别" width="180" />
        <el-table-column prop="type" label="用户类型" />
      </el-table>
    </div>

  </div>
</template>

<script setup>
import axios from "axios"
import { ref } from "vue"
import { ElMessage } from "element-plus";
const friends = ref([])
const dialogTableVisible = ref(false);
const strangerList = ref([]);

console.log(window.localStorage.getItem("userId"))

function loadFriends() {
  axios.get("http://121.43.110.55:8888/api/friendship/getAll", {
    params: {
      userId: window.localStorage.getItem("userId")
    }
  }).then(res => {
    friends.value = res.data.data;
  })
}


function showList() {
  dialogTableVisible.value = true;
  //TODO 发生请求获取所有的陌生用户
  axios.get("http://121.43.110.55:8888/api/friendship/getAllStranger", {
    params: {
      userId: window.localStorage.getItem("userId")
    }
  }).then(res => {
    console.log(res.data.data);
    strangerList.value = res.data.data;
  })

}
function followStranger(username) {
  axios.get("http://121.43.110.55:8888/api/friendship/addFriend", {
    params: {
      userId: window.localStorage.getItem("userId"),
      friendName: username
    }
  }).then(res => {
    if (res.data.status === "SUCCESS") {
      ElMessage({
        type: "success",
        message: "关注用户成功"
      })
      dialogTableVisible.value = false;
    } else {
      ElMessage({
        type: "error",
        message: "关注用户失败"
      })
    }
    // 重新加载好友列表
    loadFriends();
  })
}

loadFriends();
</script>

<style scoped>
.add {
  cursor: pointer;
}

.friendship-title {
  margin: 10px auto;
  text-align: center;
  font-size: 23px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: #000;
  font-weight: 600;
  padding: 10px;
  border-radius: 5px;
}

ul {
  list-style: none;

}
</style>
