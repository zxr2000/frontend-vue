
<template>
  <div class="manager">
    <div>
        <el-avatar>
          <img src="../assets/portrait.jpg"/>
        </el-avatar>
    </div>
    <div>
      <h5 style="min-width: 100%;" class="mb-2">username{{showUserName}}</h5>
    </div>

    <div style="margin: 10px 0">
      <el-button type="primary" @click="add">编辑用户</el-button>
      <el-button type="primary" @click="jumpback">退出登录</el-button>
    </div>
    <!--query-->
    <div style="margin: 10px 10px ;width:20%;display: flex" >
        <el-input v-model="search" placeholder="请输入查找用户名" />
        <el-button type="primary" style="margin-left: 5px">查询</el-button>
    </div>
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="username" label="username" />
      <el-table-column prop="nickname" label="nickName" />
      <el-table-column prop="password" label="password" />
      <el-table-column prop="type" label="type" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default>
          <el-button link type="primary" size="small" @click="Delete"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog v-model="dialogVisible"
        title="Tips"
        width="30%"
    >
      <el-form :model="form" >
        <el-form-item label="id">
          <el-input v-model="form.id" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="username">
          <el-input v-model="form.username" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="nickname">
          <el-input v-model="form.nickName" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="password">
          <el-input v-model="form.password" style="width:80%"></el-input>
        </el-form-item>
      </el-form>
      <span>新增用户</span>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="save = false">
          Confirm
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>



<script>
import jsCookie from 'js-cookie';
import {request} from "axios";

export default {
  name: "ManagerView",
  components:{

  },

  data(){
    return{
      form:{},
      dialogVisible:false,
      search:'',
      tableData:[
        {
          number: 1,
          name: 'Tom'
        },
      ]
    }
  },
  computed:{
    showUserName(){
      return jsCookie.get('username')
    }
  },
  methods:{
    jumpback() {
      this.$router.push({path:'/login'})
    },
    add(){
      this.dialogVisible=true
      this.form={}
    },
    save(){
      request.post("/user",this.form).then(res=>{
        console.log(res)
      })
    },
    Delete(){},
  }
}
</script>

<style scoped>



</style>
