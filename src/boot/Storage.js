export default {
  install (Vue, options) {
    const myStorage = window.localStorage
    Vue.prototype.$setProfile = (data) => {
      return myStorage.setItem('dataUser', JSON.stringify(data))
    }
    Vue.prototype.$getProfile = () => {
      return JSON.parse(myStorage.getItem('dataUser'))
    }
    Vue.prototype.$clearProfile = () => {
      return myStorage.clear()
    }
    // Vue.$prototype.$clearProfile = () => {
    //   console.log('a')
    //   return myStorage.clear()
    // }
  }
}