import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {FeaturesFlagsTranslated} from '../models';

const config: ModelCrudRestApiConfig = {
  model: FeaturesFlagsTranslated,
  pattern: 'CrudRest',
  dataSource: 'micadoDS',
  basePath: '/features-flags-translateds',
};
module.exports = config;
