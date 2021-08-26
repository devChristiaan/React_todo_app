import express from 'express'
import { getLists, getListItems, addList } from '../functions/routesfuncs.js'

const router = express.Router()

//Get all lists
router.get('/lists', async (req, res) => {
  const lists = await getLists()
  if(lists !== undefined){
    res.status(200).send(JSON.stringify(lists))
  } else {
    res.status(404).send({notFound:"No Lists Found. Please Create a List"})
  } 
})

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
  const list = await addList(req.body.title)
  if(list !== undefined){
    res.status(200).send(JSON.stringify(list))
  } else {
    res.status(404).send({notFound:"No Lists found. Please Create a List"})
  } 
})

//Add an Item
router.post('/test1', async (req, res) => {

})

//Assign Item to list
router.post('test2', async (req, res) => {

})

export default router