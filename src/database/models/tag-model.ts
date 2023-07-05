module.exports = (sequelize: any, DataTypes: any) => {
    const Tag = sequelize.define('Tag', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
    });

    Tag.associate = (models: any) => {
        Tag.belongsToMany(models.Todo, { through: 'TodoTag', as: 'todos', foreignKey: 'tag_id' });
    }

    return Tag;
}
