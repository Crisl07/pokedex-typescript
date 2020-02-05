import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';
import { TypeAttributes } from './Type';

export interface PokemonAttributes {
  id?: number;
  name: string;
  img: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  types?: TypeAttributes | TypeAttributes['id'];
};

export interface PokemonInstance extends Sequelize.Instance<PokemonAttributes>, PokemonAttributes {
  
};

export const PokemonFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<PokemonInstance, PokemonAttributes> => {
  const attributes: SequelizeAttributes<PokemonAttributes> = {
    name: {
      type: DataTypes.STRING
    },
    img: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING(2000) // extra long length
    }
  };

  const Pokemon = sequelize.define<PokemonInstance, PokemonAttributes>('Pokemon', attributes);

  Pokemon.associate = models => {
    Pokemon.belongsTo(models.Type, { as: 'types', foreignKey: 'typeId' });
  };

  return Pokemon;
};
