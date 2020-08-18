const routes = [
  {
    path: "/",
    component: () => import("pages/login.vue"),
    name: "login"
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/year",
        component: () => import("pages/year.vue"),
        name: "year"
      },
      {
        path: "/data",
        component: () => import("pages/data.vue"),
        name: "data"
      },
      {
        path: "/user",
        component: () => import("pages/user.vue"),
        name: "user"
      },
      {
        path: "/profile",
        component: () => import("pages/profile.vue"),
        name: "profile"
      },
      {
        path: "/profile/edit",
        component: () => import("pages/profileinput.vue"),
        name: "profileEdit"
      },
      {
        path: "/logout",
        component: () => import("pages/logout.vue"),
        name: "logout"
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
