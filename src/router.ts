import express from 'express'
import {
    getTodoList,
    createTodo,
    updateTodo,
    deleteTodo
} from './controllers/todo-controller'
import {
    getTagList,
    createTag,
    updateTag,
    deleteTag } from './controllers/tag-controller'

const router = express.Router()

router.get('/', (req, res) => {
    return res.json({ message: 'Hello World!' })
})

router.get('/todo', getTodoList)
router.post('/todo', createTodo)
router.put('/todo/:id', updateTodo)
router.delete('/todo/:id', deleteTodo)

router.get('/tag', getTagList)
router.post('/tag', createTag)
router.put('/tag/:id', updateTag)
router.delete('/tag/:id', deleteTag)

export { router }
