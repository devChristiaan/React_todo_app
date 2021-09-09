import express from 'express'
import { createNote } from '../controllers/notepadRouterControllers'

const notepadRouter = express.Router()

router.route('/')
  .get()
  .patch()
  .post(createNote)


export default notepadRouter