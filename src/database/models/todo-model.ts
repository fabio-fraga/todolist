module.exports = (sequelize: any, DataTypes: any) => {
    const Todo = sequelize.define('Todo', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 'pendente',
        },
        description: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        priority: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    Todo.associate = (models: any) => {
        Todo.belongsToMany(models.Tag, { through: 'TodoTag', as: 'tags', foreignKey: 'todo_id' });
    }

    return Todo;
}
