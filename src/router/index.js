import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: "",
    redirect: "/login"
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Home.vue"),
    redirect: "/home/my",
    children: [
      {
        path: "my",
        name: "my",
        component: () => import("@/views/UserMy.vue")
      },
      {
        path: "friend",
        name: "friend",
        component: () => import("@/views/UserMyFriend.vue")
      },
      {
        path: "recom",
        name: "recom",
        component: () => import("@/views/RecommendView.vue")
      },
      {
        path: "manager",
        name: "manager",
        component:  () => import("@/views/ManagerView.vue") 
      },
      {
        path: "movies",
        name: "movies",
        component: () => import("@/views/MovieView.vue")
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  console.log(to);
  if(to.fullPath === "/home/manager") {
    if(window.localStorage.getItem("user") === "admin") {
      next();
    } else {
      alert("无权限进入该页面");
    }
  } else if(to.fullPath === "/login") {
    if(window.localStorage.getItem("username") && window.localStorage.getItem("password")) {
      next("/home");
    } else {
      next();
    }
  } else {
    next();
  }
})
export default router;
