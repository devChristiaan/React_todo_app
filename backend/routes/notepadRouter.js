import express from 'express'
import { createNote, getNote } from '../controllers/notepadRouterControllers'

const notepadRouter = express.Router()

router.route('/')
  .get(getNote)
  .patch()
  .post(createNote)


export default notepadRouter