import express from 'express'
import { getLists, getListItems, addList, addItem, deleteItem, deleteList, renameList } from '../controllers/routesControllers.js'

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


export default router