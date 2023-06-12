<template>
  <div class="graph-container">
    <div class="echarts-container" ref="container"></div>
  </div>
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
        <el-table-column prop="friendId" label="好友ID" width="180" />
        <el-table-column prop="friendName" label="好友昵称" width="180" />
        <el-table-column prop="relation" label="相似度" />
      </el-table>
    </div>

  </div>

  <el-dialog v-model="showSameMovies" :title="`我和${friendName}共同喜爱的电影`">
    <el-table :data="sameMovies" stripe style="width: 100%">
      <el-table-column prop="title" label="电影名" width="180" />
      <el-table-column prop="date" label="出版日期" width="180" />
      <el-table-column prop="avg" label="平均得分" />
    </el-table>
  </el-dialog>
</template>
<script setup>
import axios from "axios";
import { ref, onMounted } from "vue"
import * as echarts from 'echarts';
import { ElMessage } from "element-plus";
const dialogTableVisible = ref(false);
const strangerList = ref([]);
const friends = ref([])
const sameMovies = ref([]);
const showSameMovies = ref(false)
const friendName = ref(null);
let container = ref(null)
let friendList = []
let data = []
let links = []
let option = null
let myChart = null;
async function getFriend() {
  const res = await axios.get("http://localhost:8888/api/friendship/getAll", {
    params: {
      userId: window.localStorage.getItem("userId")
    }
  })

  friends.value = res.data.data;

  friendList = res.data.data;
  console.log(friendList)
  data = friendList.map(item => {
    return {
      name: item.friendName
    }
  })
  data.push({
    name: window.localStorage.getItem("username"),
    x: 300,
    y: 300
  })

  links = friendList.map(item => {
    return {
      source: window.localStorage.getItem("username"),
      target: item.friendName,
      category: item.relation,
      label: {
        normal: {
          show: true,
          formatter: "点击展示共同电影"
        }
      }
    }
  })

  option = {
    title: {
      text: `用户${window.localStorage.getItem("username")}的好友图谱`
    },
    tooltip: {},

    series: [
      {
        type: "graph", // 类型:关系图
        layout: "force", //图的布局，类型为力导图
        symbolSize: 40, // 调整节点的大小
        roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移,可以设置成 'scale' 或者 'move'。设置成 true 为都开启
        edgeSymbol: ["circle", "arrow"],
        edgeSymbolSize: [2, 10],
        edgeLabel: {                // 连接两个关系对象的线上的标签
          normal: {
            show: true,
            textStyle: {
              fontSize: 14
            },
            formatter: function (param) {        // 标签内容
              return param.data.category;
            }
          }
        },
        force: {
          repulsion: 2500,
          edgeLength: [10, 500],
        },
        draggable: true,
        lineStyle: {
          normal: {
            width: 2,
            color: "#4b565b",
          },
        },
        label: {
          show: true
        },
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
          fontSize: 20
        },
        data,
        links,
        lineStyle: {
          opacity: 0.9,
          width: 2,
          curveness: 0
        }
      }
    ]
  }
  myChart && myChart.setOption(option)
  myChart.on('click', function (param) {
    if (param.dataType == 'node') {
      console.log('点击了节点', param)
    } else {
      let target = param.data.target;
      friendName.value = target;
      axios.get("http://localhost:8888/api/movie/getSameMovie", {
        params: {
          userId: window.localStorage.getItem("userId"),
          friendId: friendList.filter((item) => {
            return item.friendName === target;
          }).map(item => {
            return item.friendId
          })[0]
        }
      }).then(res => {
        console.log(res.data.data);
        sameMovies.value = res.data.data;
        showSameMovies.value = true;
      })
    }
  })
}

function showList() {
  dialogTableVisible.value = true;
  //TODO 发生请求获取所有的陌生用户
  axios.get("http://localhost:8888/api/friendship/getAllStranger", {
    params: {
      userId: window.localStorage.getItem("userId")
    }
  }).then(res => {
    console.log(res.data.data);
    strangerList.value = res.data.data;
  })
}

function followStranger(username) {
  axios.get("http://localhost:8888/api/friendship/addFriend", {
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
    getFriend();
  })
}

getFriend();

onMounted(() => {

  myChart = echarts.init(container.value);
  console.log(option)
  option && myChart.setOption(option)
})
</script>

<style scoped>
.graph-container {
  width: 100%;
}

.add {
  cursor: pointer;
}

.echarts-container {
  height: calc(100vh - 60px);
  width: 100%;
}

ul {
  list-style: none;

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
</style>
