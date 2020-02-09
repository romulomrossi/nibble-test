import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';
const helmet = require('helmet');

// load all injectable entities.
// the @provide() annotation will then automatically register them.
import { Container } from 'inversify';
import TYPES from './constant/types';

import CustomersRepository from './repositories/CustomersRepository';
import AddressesRepository from './repositories/AddressesRepository';

import './controllers/AddressController';
import './controllers/CustomersController';

import Config from './constant/config';

let container = new Container();

container.bind<CustomersRepository>(TYPES.CustomersRepository)
  .to(CustomersRepository)
  .inSingletonScope();

container.bind<AddressesRepository>(TYPES.AddressesRepository)
  .to(AddressesRepository)
  .inSingletonScope();

mongoose.connect(Config.mongo.connection, {
  useCreateIndex: true,
    useNewUrlParser: true
}, (err: any) => {  
    if(err)
        console.log(err);
});

let server = new InversifyExpressServer(container);

server.setConfig((api) => {
  api.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    return next();
  });
  api.use(bodyParser.urlencoded({
    extended: true
  }));
  api.use(bodyParser.json());
  api.use(helmet());
});

let app = server.build();
app.listen(8080);
console.log('Server started on port 8080 :)');



exports = module.exports = app;