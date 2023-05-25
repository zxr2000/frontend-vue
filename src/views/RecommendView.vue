<template >

  <div style="margin: 10px 0">
    <el-button type="primary" @click="jumptouser">返回首页</el-button>
  </div>

  <div style="display: flex">
    <el-text class="mx-1">朋友（默认全选）</el-text>
<!--    <class="mb-2 flex items-center text-sm">-->
      <el-radio-group v-model="radio1" class="ml-4">
        <el-radio label="全选" />
      </el-radio-group>
    </div>


    <div>
    <el-table :data="tableData1" border stripe style="width: 100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="username" label="username" />
<!--      <el-scrollbar height="400px">-->
<!--        <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>-->
<!--      </el-scrollbar>-->
    </el-table>
  </div>




  <div style="display: flex">
    <el-text class="mx-1">陌生人（筛选条件下默认全选）</el-text>
    <!--    <class="mb-2 flex items-center text-sm">-->
    <el-radio-group v-model="radio2" class="ml-2">
      <el-radio label="全选" />
    </el-radio-group>
  </div>

  <el-form :model="form" label-width="120px">
    <el-form-item label="Activity zone">
      <el-select v-model="form.region" placeholder="please select your zone">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="Resources">
      <el-radio-group v-model="form.resource">
        <el-radio label="Man" />
        <el-radio label="Woman" />
      </el-radio-group>
    </el-form-item>
    <div  style="display: flex">
      <el-form-item label="upper age limit" prop="age1">
        <el-input v-model.number="form.age1"></el-input>
      </el-form-item>
      <el-form-item label="lower age limit" prop="age2">
        <el-input v-model.number="form.age2"></el-input>
      </el-form-item>
    </div>

    <el-form-item>
      <el-button type="primary" @click="query=false">query</el-button>
    </el-form-item>
  </el-form>


  <div>
    <el-table :data="tableData2" border stripe style="width: 100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="username" label="username" />
<!--      <el-scrollbar height="400px">-->
<!--        <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>-->
<!--      </el-scrollbar>-->
    </el-table>
  </div>

  <div style="margin: 10px 0">
    <el-button type="primary">查看</el-button>
  </div>
</template>



<script>
import { ref } from 'vue'
import {request} from "axios";

export default {
  name: "RecommendView",
  components:{

  },
  data(){
    return{
      tableData1:[
      ],
      tableData2:[
       ],
      form:{
      }
    }
  },

  // created() {
  //   this.load()
  // },
  methods: {
    jumptouser() {
      this.$router.push({path: '/user'})
    },
    query() {
      request.post("/user", this.form).then(res => {
        console.log(res)
      })
    },

    load() {
      request.get("api/user/getAll").then(res => {
        this.tableData1 = res.data.records
        this.tableData2 = res.data.records
      })
    }
  }
}


const radio1 = ref('1')
const radio2 = ref('1')
</script>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>





