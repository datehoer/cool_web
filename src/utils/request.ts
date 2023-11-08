import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:8080/' // 基础路径
})

export default request
