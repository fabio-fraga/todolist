import express from 'express'
import { sequelize } from './database/config/data-source'

const port = process.env.APP_PORT || 8080

const router = require('./router')

sequelize.authenticate()
.then(() => {
    const app = express()

    app.use(express.json())

    app.use(router)

    app.listen(port, () => {
        console.log(`App listening on port ${port}!`)
    })
})
.catch(err => {
    console.error('Unable to connect to the database:', err)
    }
)
