import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {FeaturesFlags} from '../models';

const config: ModelCrudRestApiConfig = {
  model: FeaturesFlags,
  pattern: 'CrudRest',
  dataSource: 'micadoDS',
  basePath: '/features-flags',
};
module.exports = config;
