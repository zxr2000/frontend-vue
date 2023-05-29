import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/Login";
import UserView from "@/views/UserView";
import UserMy from "@/views/UserMy";
import UserMyMessage from "@/views/UserMyMessage";
import UserMyFriend from "@/views/UserMyFriend";
import RecomRes from "@/views/RecomRes";
import ManagerView from "@/views/ManagerView";
import RecommendView from "@/views/RecommendView";
import StrangerView from "@/views/StrangerView";
import FriendView from "@/views/FriendView";

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/user',
    name: 'user',
    component: UserView
  },
  {
    path: '/manager',
    name: 'manager',
    component: ManagerView
  },
  {
    path: '/user/my',
    name: 'usermy',
    component: UserMy
  },
  {
    path: '/user/my/message',
    name: 'usermymessage',
    component: UserMyMessage
  },
  {
    path: '/user/my/friend',
    name: 'usermyfriend',
    component: UserMyFriend
  },
  {
    path: '/user/recom',
    name: 'userrecom',
    component: RecommendView
  },
  {
    path: '/user/recom/res',
    name: 'userrecomres',
    component: RecomRes
  },
  {
    path: '/user/recom/stranger',
    name: 'userrecomstranger',
    component: StrangerView
  },
  {
    path: '/user/recom/friend',
    name: 'userrecomfriend',
    component: FriendView
  },
  {
    path: '/',
    name: 'home',
    component: Login
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  console.log(to);
  if(to.fullPath === "/fullPath") {
    if(window.localStorage.getItem("user") === "admin") {
      next();
    } else {
      next("/login")
    }
  } else {
    next();
  }

})
export default router;
