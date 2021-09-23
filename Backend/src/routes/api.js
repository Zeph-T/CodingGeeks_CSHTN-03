import * as userApi from '../api/controllers/user'
import * as itemApi from '../api/controllers/item'

module.exports = (router) => {
  router.get('/', (req, res) => {
    res.status(200)
    return res.json({ status: 'Up and Running' })
  })
  router.get('/items', itemApi.getItems)
  // router.get('/convertArray',itemApi.filterStringsToArrays);
}
