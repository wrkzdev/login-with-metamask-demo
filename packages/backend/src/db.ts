import os from 'os';
import path from 'path';
import { INTEGER, Sequelize, STRING } from 'sequelize';

import { User } from './models';

const db_path = process.env.REACT_APP_BACKEND_DB_PATH || os.tmpdir();

const sequelize = new Sequelize('login-with-metamask-database', '', undefined, {
	dialect: 'sqlite',
	storage: path.join(db_path, '/db.sqlite'),
	logging: false,
});

// Init all models
User.init(
	{
		nonce: {
			allowNull: false,
			type: INTEGER.UNSIGNED, // SQLITE will use INTEGER
			defaultValue: (): number => Math.floor(Math.random() * 10000), // Initialize with a random nonce
		},
		publicAddress: {
			allowNull: false,
			type: STRING,
			unique: true,
			validate: { isLowercase: true },
		},
		username: {
			type: STRING,
			unique: false,
		},
	},
	{
		modelName: 'user',
		sequelize, // This bit is important
		timestamps: false,
	}
);

// Create new tables
sequelize.sync();

export { sequelize };
