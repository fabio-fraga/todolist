'use strict';

import { sequelize } from '../config/connection';

const Sequelize = require('sequelize');

export const Tag = sequelize.define('Tag', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING(45),
        allowNull: false
    },
    color: {
        type: Sequelize.STRING(45),
        allowNull: false
    },
});
