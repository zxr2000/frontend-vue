<template>
  <div>
    <div id="graph-chart">
      <div id="main-chart" style="width:100%;height: 100%"></div>
    </div>
  </div>
</template>

<script>
import RelationGraph from 'relation-graph/vue3'
import axios from "axios";
console.log(window.localStorage.getItem("userId"))
//import echarts from "echarts";
 import * as echarts from 'echarts/core';


export default {
  name: 'FriendGraph',
  data() {
    return {
      graph_data:{}
    }
  },
  mounted() {
    this.fetchData();
  },
  created() {
  },

  methods: {
    fetchData(){
        axios.get("http://localhost:8888/api/friendship/getAll", {
          params: {
            userId: window.localStorage.getItem("userId")
          }
        }).then(res=>{
          //this.graph_data.data = res.data.data.username;
          //this.graph_data.link =res.data.data.similarity;
          this.graph_data=res.data.data;
          this.initChart();
          //console.log(this.graph_data);
      }).catch((err)=>{
        console.log(err);
      });
      },
      initChart(){
        let myChart=echarts.init(document.getElementById("main-chart"));
        let option={
          title: {
            text: "朋友关系",
          },
          tooltip: {}, //提示框
          animationDurationUpdate: 1500,
          animationEasingUpdate: "quinticInOut",
          series: [
            {
              type: "graph",
              layout: "force",
              // symbolSize: 50, //倘若该属性不在link里，则其表示节点的大小；否则即为线两端标记的大小
              symbolSize: (value, params) => {
                switch (params.data.category) {
                  case 0:
                    return 100;
                    break;
                  case 1:
                    return 50;
                    break;
                }
              },
              roam: true, //鼠标缩放功能
              label: {
                show: true, //是否显示标签
              },
              focusNodeAdjacency: true, //鼠标移到节点上时突出显示结点以及邻节点和边
              edgeSymbol: ["none", "arrow"], //关系两边的展现形式，也即图中线两端的展现形式。arrow为箭头
              edgeSymbolSize: [4, 10],
              draggable: true,
              edgeLabel: {
                fontSize: 20, //关系（也即线）上的标签字体大小
              },
              force: {
                repulsion: 200,
                edgeLength: 120,
              },
              graph_data: [],
              links: [],
              lineStyle: {
                opacity: 0.9,
                width: 2,
                curveness: 0,
              },
            },
          ],
        };
        myChart.resize();
        myChart.setOption(option);
      },
  }
};
</script>

<style >

</style>
