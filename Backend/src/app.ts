import express from 'express';
import bodyParser from "body-parser";
import { router as pokemons } from "./routes/pokemon";

const cors = require('cors');

const app: express.Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", pokemons);

app.listen(3000, () => {
  console.log('App listening on port 3000');
});