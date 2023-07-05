module.exports = (sequelize: any, DataTypes: any) => {
    const TodoTag = sequelize.define('TodoTag', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        todo_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tag_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    });

    return TodoTag;
};
