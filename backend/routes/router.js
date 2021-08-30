import express from 'express'
import { getLists, getListItems, addList, addItem, assignItemList } from '../controllers/routesControllers.js'

const router = express.Router()

router.route('/lists')
  .get(getLists)

//Get all list items
router.get('/listitems/:id', async (req, res) => {

  const listItems = await getListItems(req.params.id)
  if(listItems !== undefined){
    res.status(200).send(JSON.stringify(listItems))
  } else {
    res.status(404).send({notFound:"No Lists Items found. Please Create an Item"})
  } 

})

//Add a list
router.post('/addlist', async (req, res) => {
  const list = await addList(req.body.content)
  if(list !== undefined){
    res.status(200).send(JSON.stringify(list))
  } else {
    res.status(404).send({notFound:"No Lists found. Please Create a List"})
  } 
})

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