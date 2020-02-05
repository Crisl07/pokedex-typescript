import * as Sequelize from 'sequelize';
import { PokemonInstance, PokemonAttributes } from 'models/Pokemon';
import { TypeInstance, TypeAttributes } from 'models/Type';

export interface DbInterface {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  Pokemon: Sequelize.Model<PokemonInstance, PokemonAttributes>;
  Type: Sequelize.Model<TypeInstance, TypeAttributes>;
}
