const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors')

// Style console
const chalk = require('chalk');
const log = console.log;

// Creación de la aplicación con express
const app = express();
const api = require('./server/routes/api');

// Creación del server y adaptación de socket.io para comunicación en tiempo real
const server = http.createServer(app);
const io = require('socket.io').listen(server);

// Parse for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS
app.use(cors());

// Logger
app.use(logger('dev'));

// Establecer las rutas creadas en la carpeta server a la aplicacion
app.use('/api', api);

// Establecer ruta inicial de bienvenida
app.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to Bank Account' });
});

// Capturar rutas no permitidas
app.get('*', (req, res) => {
  res.status(404).send({ message: 'Page not found. 404' });
});

// Obtener y establecer el puerto en la aplicación express
const port = process.env.PORT || '3000';
app.set('port', port);

// Socket.io escucha en el puerto provisto para la aplicación
server.listen(port, () => console.info(`API ejecutandose en localhost:${port}`));


// Chalk constants
const successMsg = chalk.bold.green;
const errorMsg = chalk.bold.red;
const promptMainInfo = chalk.cyanBright;
const promptInfo = chalk.grey;


// Socket connection
io.on('connection', socket => {
  log(successMsg('Usuario conectado: ') + promptMainInfo(socket.id));

  socket.on('account saved', (account) => {
    socket.broadcast.emit('account saved', account);
  });

  socket.on('disconnect', function () {
    io.emit('user disconnected');
    log(errorMsg('Usuario desconectado: ') + promptInfo('Vuelve pronto!!!'));
  });
});

