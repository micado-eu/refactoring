import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {DocumentTypeTranslated} from '../models';

const config: ModelCrudRestApiConfig = {
  model: DocumentTypeTranslated,
  pattern: 'CrudRest',
  dataSource: 'micadoDS',
  basePath: '/document-type-translateds',
};
module.exports = config;
