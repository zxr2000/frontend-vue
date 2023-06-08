import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as echarts from "echarts";
//import {Vue} from "vue-demi";

//Vue.prototype.$echarts=echarts;
const app = createApp(App)
app.use(router).use(ElementPlus).mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
