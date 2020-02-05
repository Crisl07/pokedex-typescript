import express from 'express';
import bodyParser from "body-parser";
import { Request, Response } from 'express';
import { createModels } from './models';
import { PokemonInstance } from 'models/Pokemon';
import { TypeInstance } from 'models/Type';
import { SequelizeConfig } from './config/sequelizeconfiginterface';

const cors = require('cors');

const app: express.Application = express();

const sequelizeConfig: SequelizeConfig = require('./config/sequelizeConfig.json');
const db = createModels(sequelizeConfig);
db.sequelize.sync();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'hello, world' });
});

app.get('/pokemons', (req: Request, res: Response) => {
  db.Pokemon.findAll({
    order: ["name"]
  })
    .then((Pokemons: PokemonInstance[]) => res.status(200).json({ Pokemons }))
    .catch(err => res.status(500).json({ err: ['oops', err] }));
});

app.get('/pokemons/:typeId', (req: Request, res: Response) => {
  db.Pokemon.findAll({
    include: [{ model: db.Type, as: 'types', where: { id: req.params.typeId } }],
  })
    .then((Pokemons: PokemonInstance[]) => res.status(200).json({ Pokemons }))
    .catch(err => res.status(500).json({ err: ['oops', err] }));
});

app.get('/pokemon/:id', (req: Request, res: Response) => {
  db.Pokemon.findById(req.params.id)
    .then((Pokemons: PokemonInstance) => res.status(200).json({ Pokemons }))
    .catch(err => res.status(500).json({ err: ['oops', err] }));
});

app.post('/pokemon', (req: Request, res: Response) => {
  db.Pokemon.create(req.body)
    .then((Pokemons: PokemonInstance) => res.status(200).json({ Pokemons }))
    .catch(err => res.status(500).json({ err: ['oops', err] }));
});

app.delete('/pokemon/:id', (req: Request, res: Response) => {
  db.Pokemon.destroy({ 
    where: { id: req.params.id }
   })
    .then(() => res.status(200).send('Pokemon Deleted!'))
    .catch(err => res.status(500).json({ err: ['oops', err] }));
});

app.get('/types', (req: Request, res: Response) => {
  db.Type.findAll()
    .then((Types: TypeInstance[]) => res.status(200).json({ Types }))
    .catch(err => res.status(500).json({ err: ['oops', err] }));
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
});