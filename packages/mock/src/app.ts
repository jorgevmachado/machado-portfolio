import jsonServer from 'json-server';
import authRouter from './auth';
import pokeApiRouter from './poke-api';
import pokemonRouter from './pokemon';
import pokemonMoveRouter from './pokemon/pokemon-move';
import pokemonTypeRouter from './pokemon/pokemon-type';
import pokemonAbilityRouter from './pokemon/pokemon-ability';
import financeRouter from './finance';
import expenseGroupRouter from './finance/expense-group';
import expenseCategoryTypeRouter from './finance/expense-category-type';
import expenseCategoryRouter from './finance/expense-category';
import supplierTypeRouter from './finance/supplier-type';
import supplierRouter from './finance/supplier';
import expenseRouter from './finance/expense';

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
server.use(pokemonMoveRouter);
server.use(pokemonTypeRouter);
server.use(pokemonAbilityRouter);
server.use(financeRouter);
server.use(expenseGroupRouter);
server.use(expenseCategoryTypeRouter);
server.use(expenseCategoryRouter);
server.use(supplierTypeRouter);
server.use(supplierRouter);
server.use(expenseRouter);

server.listen(PORT, () => {
  console.log('---------------------------------');
  console.log(`🚀 API is running - PORT:${PORT} 🚀`);
  console.log('---------------------------------');
});
