import Vue from 'vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue'
import DefaultLayout from './layouts/Default.vue'
import DashboardLayout from './layouts/Dashboard.vue'
import PoktanLayout from './layouts/PoktanLayout.vue'
import DashboardRTLLayout from './layouts/DashboardRTL.vue'
import router from './router'
// import './plugins/click-away'

import './scss/app.scss';
import Notifications from 'vue-notification'
import VueLoading from 'vuejs-loading-plugin'
import listBoot from './boot/RegistBoot'

listBoot.forEach((plugin) => Vue.use(plugin))

Vue.use(Notifications)

// inject plugin
Vue.use(VueLoading)

Vue.use(Antd)
Vue.config.productionTip = false

// Adding template layouts to the vue components.
Vue.component("layout-default", DefaultLayout);
Vue.component("layout-dashboard", DashboardLayout);
Vue.component("layout-poktan", PoktanLayout);
Vue.component("layout-dashboard-rtl", DashboardRTLLayout);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')