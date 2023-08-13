import router from '../../router'
import vue from 'vue'
import * as role from '../ListRole'
export default (data) => {
  if (data.role === role.bupati.name) {
    vue.prototype.$setProfile(data)
    router.push({name: role.bupati.index})
  } else {
    vue.prototype.$errNotif('Mohon Maaf Halaman Belum Tersedia')
  }
}