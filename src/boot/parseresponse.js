export default {
  install (Vue, options) {
    Vue.prototype.$parseResponse = (res) => {
      if (res.status) {
        return true
      } else {
        Vue.prototype.$errNotif(res.message)
        return false
      }
    }
  }
}