module.exports = function(sequelize, DataTypes) {
	return sequelize.define('t_interface_downgrade_conf', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		servant_name: {
			type: DataTypes.STRING(128),
			allowNull: true,
			defaultValue: ''
		},
		interface_name: {
			type: DataTypes.STRING(128),
			allowNull: true,
			defaultValue: ''
		},
		max_failed_num: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		max_failed_ratio: {
			type: DataTypes.FLOAT,
			allowNull: true,
			defaultValue: 0.05
		},
		max_request_num: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		downgrade_desc: {
			type: DataTypes.STRING(256),
			allowNull: true,
			defaultValue: ''
		},
		posttime: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: '0000-00-00 00:00:00'
		},
		lastuser: {
			type: DataTypes.STRING(30),
			allowNull: true
		}
	}, {
		tableName: 't_interface_downgrade_conf',
		timestamps: false
	});
};
