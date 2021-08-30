import express from 'express'
import { getLists, getListItems, addList, addItem, assignItemList } from '../controllers/routesControllers.js'

const router = express.Router()

router.route('/lists')
  .get(getLists)
  .post(addList)


router.route('/listitems/:id')
  .get(getListItems)


//Add an Item and Assign to list
router.post('/additem/:id', async (req, res) => {
  const item = await addItem(req.body.content)
  if(item !== undefined){
    const listAdd = await assignItemList(req.params.id, item.insertId)
    res.status(200).send({message: "Item Added to List"})
  } else {
    res.status(404).send({notFound:"No Lists found. Please Create a List"})
  } 

})


export default router