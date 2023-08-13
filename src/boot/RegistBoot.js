import axios from './axios'
import parseResponse from './parseresponse'
import baseNotif from './notify'
import storage from './Storage'
import createToken from './CreateToken'
export default [
  axios,
  parseResponse,
  baseNotif,
  storage,
  createToken
]