import Sequelize from 'sequelize';
import { DbInterface } from'typings/DbInterface';
import { PokemonFactory } from './Pokemon';
import { TypeFactory } from './Type';
import { SequelizeConfig } from '../config/sequelizeconfiginterface';

export const createModels = (sequelizeConfig: SequelizeConfig): DbInterface => {
  const { database, username, password, params } = sequelizeConfig;
  const sequelize = new Sequelize(database, username, password, params);

  const db: DbInterface = {
    sequelize,
    Sequelize,
    Pokemon: PokemonFactory(sequelize, Sequelize),
    Type: TypeFactory(sequelize, Sequelize)
  };

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return db;
};