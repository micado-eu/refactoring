import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {PictureHotspot} from '../models';

const config: ModelCrudRestApiConfig = {
  model: PictureHotspot,
  pattern: 'CrudRest',
  dataSource: 'micadoDS',
  basePath: '/picture-hotspots',
};
module.exports = config;
