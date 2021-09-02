import express from 'express'
import { getLists, getListItems, addList, addItem, deleteItem, deleteList, renameList, renameItem } from '../controllers/routesControllers.js'

const router = express.Router()

router.route('/lists')
  .get(getLists)
  .post(addList)
  
router.route('/lists/:id')
  .delete(deleteList)
  .patch(renameList)

router.route('/listitems/:id')
  .get(getListItems)
  .post(addItem)
  .delete(deleteItem)

router.route('/item/:id')
  .patch(renameItem)


export default router