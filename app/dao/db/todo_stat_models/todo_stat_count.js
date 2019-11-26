module.exports = function (sequelize, DataTypes) {
    return sequelize.define('todo_stat_count', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        f_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            defaultValue: DataTypes.NOW,
            index: "f_date",
            unique: "index"
        },
        slave_name: {
            type: DataTypes.STRING(128),
            allowNull: true,
            defaultValue: '',
            unique: "index"
        },
        interface_name: {
            type: DataTypes.STRING(128),
            allowNull: true,
            defaultValue: '',
            unique: "index"
        },
        succ_count: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue:0
        },
        timeout_count: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue:0
        },
        exce_count: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue:0
        },
        total_time: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue:0
        },
        error_count:{
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue:0
        },
        avg_time: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue:0
        },
        create_time: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        }
    }, {
        tableName: 'todo_stat_count',
        timestamps: false
    });
};
