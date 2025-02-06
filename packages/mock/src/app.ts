import jsonServer from 'json-server';
import authRouter from './auth/auth';
import pokeApiRouter from './poke-api/poke-api';
import pokemonRouter from './pokemon/pokemon';

const PORT = 9000;
const server = jsonServer.create();
const middlewares = jsonServer.defaults({ noCors: false, logger: false });

const colors = { ERROR: '\x1b[31m', SUCCESS: '\x1b[32m' };

server.use(middlewares);
server.use((req, res, next) => {
  if (res.headersSent) {
    console.log('headersSent is true');
  } else {
    res.on('finish', function () {
      const { operationName } = req.body;
      const isError = res.statusCode >= 400;
      const color = isError ? colors.ERROR : colors.SUCCESS;
      const name = operationName || req.url;
      console.log(`[${req.method}] ${color}${res.statusCode}\x1b[0m - ${name}`);
    });
  }
  next();
});
server.use(jsonServer.bodyParser);

server.use(authRouter);
server.use(pokeApiRouter);
server.use(pokemonRouter);

server.listen(PORT, () => {
  console.log('---------------------------------');
  console.log(`🚀 API is running - PORT:${PORT} 🚀`);
  console.log('---------------------------------');
});
