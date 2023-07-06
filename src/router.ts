import express from 'express'
import {
    getTodoList,
    createTodo,
    updateTodo,
    deleteTodo,
    filterByTags
} from './controllers/todo-controller'
import {
    getTagList,
    createTag,
    updateTag,
    deleteTag } from './controllers/tag-controller'

const router = express.Router()

router.get('/', (req, res) => {
    return res.json({ message: 'This is an API made with Typescript, Express, Sequelize and MySQL! Hire me there Tascom :)' })
})

router.get('/todos', getTodoList)
router.post('/todo', createTodo)
router.put('/todo/:id', updateTodo)
router.delete('/todo/:id', deleteTodo)

router.get('/tags', getTagList)
router.post('/tag', createTag)
router.put('/tag/:id', updateTag)
router.delete('/tag/:id', deleteTag)

router.get('/todos/filters-by-tags/:tags', filterByTags)

export { router }
