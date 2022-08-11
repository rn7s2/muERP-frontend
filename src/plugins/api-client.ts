import axios from 'axios'

const API_BASE = process.env.VUE_APP_API_BASE

async function getItems () {
  return await axios.get(API_BASE + '/items')
}

export default {
  getItems
}
