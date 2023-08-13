const listMonth = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'Desember']
export default {
  install (Vue, options) {
    Vue.prototype.$createToken = () => {
      const data = Vue.prototype.$getProfile()
      return {
        headers: {
          'x-access-token': data.token,
          'username': data.nik
        }
      }
    }
    Vue.prototype.$parseDate = (date) => {
      let respon
      if (date === '' || date === null || date === undefined) {
        respon = {
          date: '-',
          dateLocal: '-',
          fullDate: '-',
          timeStap: '-'
        }
      } else {
        const newDate = new Date(date)
        const month = '' + (newDate.getMonth() + 1)
        const tgl = '' + (newDate.getDate())
        const year = newDate.getFullYear()
        const full = `${tgl} ${listMonth[month - 1]} ${year}`
        respon = {
          dateLocal: [year, `${month < 10 ? `0${month}` : (month)}`, `${tgl < 10 ? `0${tgl}` : tgl}`].join('/'),
          fullDate: full,
          timeStap: `${full} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`
        }
      }
      return respon
    }
  }
}