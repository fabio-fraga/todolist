module.exports = (sequelize: any, DataTypes: any) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(90),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(72),
            allowNull: false
        },
    });

    return User;
}
