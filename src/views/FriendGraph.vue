<template>
  <div class="graph-container">
    <div class="echarts-container" ref="container"></div>
  </div>
</template>
<script setup>
import axios from "axios";
import { ref, onMounted } from "vue"
import * as echarts from 'echarts';

let container = ref(null)
let friendList = null
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
          formatter: `相似度：${item.relation}`
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

  console.log(myChart)
  myChart && myChart.setOption(option)
}

getFriend();

onMounted(() => {

  myChart = echarts.init(container.value);
  console.log(option)
  option && myChart.setOption(option)
})
</script>

<style>
.graph-container {
  width: 100%;
}

.echarts-container {
  height: calc(100vh - 60px);
  width: 100%;
}
</style>