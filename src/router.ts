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
import { 
    createUser,
    updateUser,
    deleteUser, 
    login,
    profile
} from './controllers/user-controller'

const router = express.Router()

router.get('/', (req, res) => {
    return res.json({ message: 'This is an API made with Typescript, Express, Sequelize, MySQL and JWT! Hire me there Tascom :)' })
})

router.get('/todos', getTodoList)
router.get('/todos/filters-by-tags/:tags', filterByTags)
router.post('/todo', createTodo)
router.put('/todo/:id', updateTodo)
router.delete('/todo/:id', deleteTodo)

router.get('/tags', getTagList)
router.post('/tag', createTag)
router.put('/tag/:id', updateTag)
router.delete('/tag/:id', deleteTag)

router.post('/login', login)
router.get('/user', profile)
router.post('/user', createUser)
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

export { router }
