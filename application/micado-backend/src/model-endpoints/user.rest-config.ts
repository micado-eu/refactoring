import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {User} from '../models';

const config: ModelCrudRestApiConfig = {
  model: User,
  pattern: 'CrudRest',
  dataSource: 'micadoDS',
  basePath: '/users',
};
module.exports = config;
