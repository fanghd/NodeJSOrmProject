module.exports = function (sequelize, DataTypes) {
    return sequelize.define('todo_stat', {
        stattime: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: '0000-00-00 00:00:00'
        },
        f_date: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: '0000-00-00 00:00:00'
        },
        f_tflag: {
            type: DataTypes.STRING(8),
            allowNull: true,
            defaultValue: ''
        },
        source_id: {
            type: DataTypes.STRING(15),
            allowNull: true,
            defaultValue: ''
        },
        master_name: {
            type: DataTypes.STRING(128),
            allowNull: true,
            defaultValue: ''
        },
        slave_name: {
            type: DataTypes.STRING(128),
            allowNull: true,
            defaultValue: ''
        },
        interface_name: {
            type: DataTypes.STRING(128),
            allowNull: true,
            defaultValue: ''
        },
        todo_version: {
            type: DataTypes.STRING(16),
            allowNull: true,
            defaultValue: ''
        },
        master_ip: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: ''
        },
        slave_ip: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: ''
        },
        slave_port: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            defaultValue: 0
        },
        return_value: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            defaultValue: 0
        },
        succ_count: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        timeout_count: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        exce_count: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        interv_count: {
            type: DataTypes.STRING(128),
            allowNull: true,
            defaultValue: ''
        },
        total_time: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        ave_time: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        maxrsp_time: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        minrsp_time: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        }
    }, {
        tableName: 'todo_stat',
        timestamps: false
    });
};
