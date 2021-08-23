import express from 'express'
import { getLists } from '../functions/routesfuncs.js'

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

export default router