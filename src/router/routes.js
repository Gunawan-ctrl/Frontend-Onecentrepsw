export default [
  {
    // will match everything
    path: "*",
    component: () => import("../views/404.vue"),
  },
  {
    path: "/",
    name: "Home",
    redirect: "/user/login",
  },
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    layout: "dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
  },
  {
    path: "/bupati/",
    meta: {
      bupati: true,
    },
    component: () => import("../layouts/BupatiLayout.vue"),
    children: [
      {
        name: "dashboardBupati",
        path: "dashboard",
        component: () => import("../views/bupati/Index.vue"),
        meta: {
          title: "Dashboard",
        },
      },
      {
        name: "dataPegawaiBupati",
        path: "data-pegawai",
        component: () => import("../views/bupati/DataPegawai.vue"),
        meta: {
          title: "Data Pegawai",
        },
      },
      {
        name: "dataMapBupati",
        path: "data-map",
        component: () => import("../views/bupati/Map.vue"),
        meta: {
          title: "Data map",
        },
      },
      {
        name: "dashboardPendudukBupati",
        path: "dashboard-penduduk",
        component: () => import("../views/bupati/DashboardPenduduk.vue"),
        meta: {
          title: "Dashboard Penduduk",
        },
      },
      {
        name: "dataPendudukBupati",
        path: "data-penduduk",
        component: () => import("../views/bupati/DataPenduduk.vue"),
        meta: {
          title: "Data Penduduk",
        },
      },
      {
        name: "detailDataPegawaiBupati",
        path: "data-pegawai/detail/:id",
        component: () => import("../views/bupati/DetailPegawai.vue"),
        meta: {
          title: "Detail Data Pegawai",
        },
      },
      {
        name: "detailDataPendudukBupati",
        path: "datapenduduk/:id",
        component: () => import("../views/bupati/DetailPenduduk.vue"),
        meta: {
          title: "Detail Data Penduduk",
        },
      },
      {
        name: "imunisasiNasional",
        path: "imunisasiNasional",
        component: () => import("../views/bupati/imunisasiNasional.vue"),
        meta: {
          title: "Bulan Imunisasi Anak Nasional 2022",
        },
      },

      {
        name: "DetailImunisasiNasional",
        path: "DetailImunisasiNasional/:id",
        component: () => import("../views/bupati/DetailImunisasi.vue"),
        meta: {
          title: "Detail Bulan Imunisasi Anak Nasional 2022",
        },
      },
      {
        name: "ListWebPesawaran",
        path: "ListWebPesawaran",
        component: () => import("../views/bupati/ListWebPesawaran.vue"),
        meta: {
          title: "Detail List Web Pesawaran",
        },
      },
      {
        name: "DetailListWeb",
        path: "DetailListWeb/:id",
        component: () => import("../views/bupati/DetailListWeb.vue"),
        meta: {
          title: "Detail List Web Pesawaran",
        },
      },
    ],
  },
  {
    path: "/poktan/",
    // layout: "poktan",
    meta: {
      // layoutClass: 'layout-poktan',
      poktan: true,
    },
    // name: 'dashboardPoktan',
    component: () => import("../layouts/PoktanLayout.vue"),
    children: [
      {
        name: "dashboardPoktan",
        meta: { title: "Dashboard" },
        path: "dashboard",
        component: () => import("../views/poktan/Index.vue"),
      },
      {
        name: "dataPetaniPoktan",
        meta: { title: "Data Petani" },
        path: "petani",
        component: () => import("../views/poktan/petani/Index.vue"),
      },
      {
        name: "inputDataPetaniPoktan",
        meta: { title: "Insert Petani" },
        path: "petani/insert",
        component: () => import("../views/poktan/petani/Input.vue"),
      },
    ],
  },
  {
    path: "/layout",
    name: "Layout",
    layout: "dashboard",
    component: () => import("../views/Layout.vue"),
  },
  {
    path: "/tables",
    name: "Tables",
    layout: "dashboard",
    component: () => import("../views/Tables.vue"),
  },
  {
    path: "/billing",
    name: "Billing",
    layout: "dashboard",
    component: () => import("../views/Billing.vue"),
  },
  {
    path: "/rtl",
    name: "RTL",
    layout: "dashboard-rtl",
    meta: {
      layoutClass: "dashboard-rtl",
    },
    component: () => import("../views/RTL.vue"),
  },
  {
    path: "/Profile",
    name: "Profile",
    layout: "dashboard",
    meta: {
      layoutClass: "layout-profile",
    },
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/sign-in",
    name: "Sign-In",
    component: () => import("../views/Sign-In.vue"),
  },
  {
    path: "/user/login",
    name: "loginPage",
    component: () => import("../views/user/Login.vue"),
  },
  {
    path: "/sign-up",
    name: "Sign-Up",
    meta: {
      layoutClass: "layout-sign-up",
    },
    component: () => import("../views/Sign-Up.vue"),
  },
];
