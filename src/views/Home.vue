<template>
    <div class="movie-layout">
        <el-container>
            <el-header class="movie-header">
                <div class="logo-containr">
                    <span>一枝花电影推荐系统</span>
                </div>
                <div class="user-container">
                    <div class="user">
                        {{ username }}
                    </div>
                    <div class="logout" @click="logout">退出登录</div>
                </div>
            </el-header>
            <el-container class="movie-body">
                <el-aside width="200px" class="movie-aside">
                    <el-menu active-text-color="#ffd04b" background-color="#545c64" default-active="2" text-color="#fff"
                        class="menu" router>
                        <el-menu-item index="/home/my">
                            <el-icon><User /></el-icon>
                            <span>关于我的</span>
                        </el-menu-item>
                        <el-menu-item index="/home/movies">
                            <el-icon><View /></el-icon>
                            <span>电影总览</span>
                        </el-menu-item>
                        <el-menu-item index="/home/recom">
                            <el-icon><HelpFilled /></el-icon>
                            <span>电影推荐</span>
                        </el-menu-item>
                        <el-menu-item index="/home/friend">
                            <el-icon><UserFilled /></el-icon>
                            <span>我的好友</span>
                        </el-menu-item>
                        <el-menu-item index="/home/manager" :disabled="disabled">
                            <el-icon><Tools /></el-icon>
                            <span>用户管理</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main class="movie-main">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import {ref} from "vue";
import { useRouter } from "vue-router";
let disabled = ref(true);
let username = window.localStorage.getItem("username")
const router = useRouter();
if(window.localStorage.getItem("user") === "admin") {
    disabled.value = false;
}

function logout() {
    window.localStorage.clear();
    router.push("/login")
}
</script>

<style scoped>
.movie-header {
    background-color: rgba(0,0,0,0.8);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;

}
.logo-containr {
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    background: -webkit-linear-gradient(315deg,#42d392 25%,#647eff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.user-container {
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.logout {
    margin-left: 10px;

}

.logout:hover {
    color: rgb(116, 116, 246)
}


.movie-body {
    height: calc(100vh - 60px);
    background-color: #fff;
}

.movie-body .movie-aside {
    height: 100%;
}
.movie-body .movie-main {
    overflow-y: scroll;
    padding: 10px;
    box-sizing: border-box;
}
.menu {
    height: 100%;
}
</style>
