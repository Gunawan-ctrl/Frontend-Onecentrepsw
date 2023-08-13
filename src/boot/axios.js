import axios from 'axios'

export default {
  install (Vue, options) {
    // const base = 'http://192.168.43.172:5050'
    // const base = 'http://192.168.1.14:5050'
    const base = 'http://localhost:5050'
    // const base = 'https://one-center-psw-api.psti-ubl.id'
    const axiosInstance = axios.create({
      baseURL: base
    })
    Vue.prototype.$axios = axiosInstance
  }
}