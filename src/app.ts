import express from 'express'
import { sequelize } from './database/config/connection'
import { router } from './router'
const bodyParser = require('body-parser')

const port = process.env.APP_PORT || 8080

sequelize.authenticate()
.then(() => {
    const app = express()

    app.use(express.json());
    
    app.use(express.urlencoded({ extended: false }));

    app.use(router)

    app.listen(port, () => {
        console.log(`App listening on port ${port}!`)
    })
})
.catch(err => {
    console.error('Unable to connect to the database:', err)
    }
)
