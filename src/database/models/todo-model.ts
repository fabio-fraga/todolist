'use strict';

import { sequelize } from '../config/connection'

const Sequelize = require('sequelize');

export const Todo = sequelize.define('Todo', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 'pendente'
    },
    description: {
        type: Sequelize.STRING(200),
        allowNull: true
    },
    priority: {
        type: Sequelize.INTEGER(2),
        allowNull: false,
    }
})
