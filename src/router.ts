import express from 'express'
import {
    getTodoList,
    createTodo,
    updateTodo,
    deleteTodo
} from './controllers/todo-controller'

const router = express.Router()

router.get('/', (req, res) => {
    return res.json({ message: 'Hello World!' })
})

router.get('/todo', getTodoList)
router.post('/todo', createTodo)
router.put('/todo/:id', updateTodo)
router.delete('/todo/:id', deleteTodo)

export { router }
