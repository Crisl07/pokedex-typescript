import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';

export interface TypeAttributes {
  id?: number;
  type: string;
  createdAt?: Date;
  updatedAt?: Date;
  pokemons?: string
};

export interface TypeInstance extends Sequelize.Instance<TypeAttributes>, TypeAttributes {
};

export const TypeFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<TypeInstance, TypeAttributes> => {
  const attributes: SequelizeAttributes<TypeAttributes> = {
    type: {
      type: DataTypes.STRING
    }
  };

  const Type = sequelize.define<TypeInstance, TypeAttributes>('Type', attributes);

  Type.associate = models => {
    Type.hasMany(models.Pokemon, { foreignKey: "typeId", as: 'pokemons' });
  };

  return Type;
};
