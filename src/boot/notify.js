export default {
  install (Vue, options) {
    // let parseResponse = (res) => {
    //   return true
    // }
    const notif = (title, msg, type) => {
      Vue.prototype.$notification[type]({
        // group: 'default',
        message: title,
        description: msg,
        type: 'bottomCenter',
        duration: 2
      })
    }
    const suksesNotif = (msg) => {
      return notif('Sukses', msg, 'success')
    }
    const errNotif = (msg) => {
      return notif('Error', msg, 'error')
    }
    const commonErrorNotif = () => {
      return notif('Error', 'Terjadi Kesalahan Pada Server', 'error')
    }
    Vue.prototype.$notif = suksesNotif
    Vue.prototype.$errNotif = errNotif
    Vue.prototype.$commonErrorNotif = commonErrorNotif
  }
}