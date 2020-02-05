import { SequelizeConfig } from '../config/sequelizeconfiginterface';
import { createModels } from '../models/index';

const sequelizeConfig: SequelizeConfig = require('../config/sequelizeConfig.json');
export const db = createModels(sequelizeConfig);
try {
  db.sequelize.sync();
} catch (error) {
  throw error;
}


