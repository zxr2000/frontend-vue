<template>
    <div class="movie-layout">
        <el-container>
            <el-header class="movie-header">Header</el-header>
            <el-container class="movie-body">
                <el-aside width="200px" class="movie-aside">
                    <el-menu active-text-color="#ffd04b" background-color="#545c64" default-active="2" text-color="#fff"
                        class="menu" router>
                        <el-menu-item index="/home/my">
                            <el-icon><icon-menu /></el-icon>
                            <span>关于我的</span>
                        </el-menu-item>
                        <el-menu-item index="/home/friend">
                            <el-icon>
                                <setting />
                            </el-icon>
                            <span>我的好友</span>
                        </el-menu-item>
                        <el-menu-item index="/home/message">
                            <el-icon>
                                <setting />
                            </el-icon>
                            <span>我的消息</span>
                        </el-menu-item>
                        <el-menu-item index="/home/manager" :disabled="disabled">
                            <el-icon><icon-menu /></el-icon>
                            <span>用户管理</span>
                        </el-menu-item>
                        <el-menu-item index="/home/recom">
                            <el-icon>
                                <setting />
                            </el-icon>
                            <span>电影推荐</span>
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
let disabled = ref(true);

if(window.localStorage.getItem("user") === "admin") {
    disabled.value = false;
}
</script>

<style scoped>
.movie-header {
    background-color: #000;
}

.movie-body {
    height: calc(100vh - 60px);
    background-color: antiquewhite;
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