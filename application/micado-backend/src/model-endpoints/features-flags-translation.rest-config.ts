import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {FeaturesFlagsTranslation} from '../models';

const config: ModelCrudRestApiConfig = {
  model: FeaturesFlagsTranslation,
  pattern: 'CrudRest',
  dataSource: 'micadoDS',
  basePath: '/features-flags-translations',
};
module.exports = config;
