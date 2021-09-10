import express from 'express'
import { createNote, getNote, updateNote } from '../controllers/notepadRouterControllers.js'

const notepadRouter = express.Router()

notepadRouter.route('/')
  .get(getNote)
  .patch(updateNote)
  .post(createNote)


export default notepadRouter