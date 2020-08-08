import express from 'express';
import cors from 'cors';
import routes from "./routes";

const app = express();

app.use(cors()); // permite que o frontend se comunique com a api que está rodando em outra porta.
app.use(express.json());
app.use(routes);

app.listen(3333); // faz a aplicação ouvir req. http

// Corpo (Request Body): Dados p/ criação ou atualização de um registro
// Route Params: Identificar qual recurso eu quero atualizar ou deletar
// Query Params: Paginação, filtros, ordenação...



