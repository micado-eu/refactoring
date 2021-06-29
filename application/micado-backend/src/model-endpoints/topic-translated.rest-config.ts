import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {TopicTranslated} from '../models';

const config: ModelCrudRestApiConfig = {
  model: TopicTranslated,
  pattern: 'CrudRest',
  dataSource: 'micadoDS',
  basePath: '/topic-translateds',
};
module.exports = config;
