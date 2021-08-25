import express from 'express'
import { getLists, getListItems } from '../functions/routesfuncs.js'

const router = express.Router()

//Get all lists -- Add async and await if it defaults to err

router.get('/lists', async (req, res) => {
  const lists = await getLists()
  if(lists){
    res.status(200).send(JSON.stringify(lists))
  } else {
    res.status(404).send({notFound:"No Lists Found. Please Create a List"})
  } 
})

router.get('/listitems/:id', async (req, res) => {
  const listItems = await getListItems(req.params.id)
  if(lists){
    res.status(200).send(JSON.stringify(listItems))
  } else {
    res.status(404).send({notFound:"No Lists Items found. Please Create an Item"})
  } 

})

export default router