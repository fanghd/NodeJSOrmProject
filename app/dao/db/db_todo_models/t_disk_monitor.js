module.exports = function(sequelize, DataTypes) {
	return sequelize.define('t_disk_monitor', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		ip: {
			type: DataTypes.STRING(20),
			allowNull: true,
			defaultValue: ''
		},
		cpu_num: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		load_5: {
			type: DataTypes.DECIMAL(5,2),
			allowNull: false
		},
		load_10: {
			type: DataTypes.DECIMAL(5,2),
			allowNull: false
		},
		load_15: {
			type: DataTypes.DECIMAL(5,2),
			allowNull: false
		},
		mem_total: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		mem_used: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		handle_used: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		createtime: {
			type: DataTypes.DATE,
			allowNull: true
		},
		root_total: {
			type: DataTypes.BIGINT(11),
			allowNull: false
		},
		root_used: {
			type: DataTypes.BIGINT(11),
			allowNull: false
		},
		mnt_total: {
			type: DataTypes.BIGINT(11),
			allowNull: false
		},
		mnt_used: {
			type: DataTypes.BIGINT(11),
			allowNull: false
		},
		description: {
			type: DataTypes.STRING(128),
			allowNull: true
		}
	}, {
		tableName: 't_disk_monitor',
		timestamps: false
	});
};
