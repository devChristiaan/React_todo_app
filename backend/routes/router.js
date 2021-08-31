import express from 'express'
import { getLists, getListItems, addList, addItem, deleteItem } from '../controllers/routesControllers.js'

const router = express.Router()

router.route('/lists')
  .get(getLists)
  .post(addList)


router.route('/listitems/:id')
  .get(getListItems)
  .post(addItem)
  .delete(deleteItem)


export default router