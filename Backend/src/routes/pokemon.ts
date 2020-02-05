import express from 'express';
import { Request, Response } from 'express';
import { db } from "../database/db";
import { PokemonInstance } from 'models/Pokemon';

export const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'hello, world' });
});

router.get('/pokemons', (req: Request, res: Response) => {
  db.Pokemon.findAll({
    order: ["name"]
  })
    .then((Pokemons: PokemonInstance[]) => res.status(200).json({ Pokemons }))
    .catch(err => res.status(500).json({ err: ['oops', err] }));
});

router.get('/pokemons/:typeId', (req: Request, res: Response) => {
  db.Pokemon.findAll({
    include: [{ model: db.Type, as: 'types', where: { id: req.params.typeId } }],
  })
    .then((Pokemons: PokemonInstance[]) => res.status(200).json({ Pokemons }))
    .catch(err => res.status(500).json({ err: ['oops', err] }));
});

router.get('/pokemon/:id', (req: Request, res: Response) => {
  db.Pokemon.findById(req.params.id)
    .then((Pokemons: PokemonInstance) => res.status(200).json({ Pokemons }))
    .catch(err => res.status(500).json({ err: ['oops', err] }));
});

router.post('/pokemon', (req: Request, res: Response) => {
  db.Pokemon.create(req.body)
    .then((Pokemons: PokemonInstance) => res.status(200).json({ Pokemons }))
    .catch(err => res.status(500).json({ err: ['oops', err] }));
});

router.delete('/pokemon/:id', (req: Request, res: Response) => {
  db.Pokemon.destroy({ 
    where: { id: req.params.id }
   })
    .then(() => res.status(200).send('Pokemon Deleted!'))
    .catch(err => res.status(500).json({ err: ['oops', err] }));
});
