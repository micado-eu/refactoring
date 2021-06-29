import {DefaultCrudRepository} from '@loopback/repository';
import {ProcessTranslationProd, ProcessTranslationProdRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProcessTranslationProdRepository extends DefaultCrudRepository<
  ProcessTranslationProd,
  typeof ProcessTranslationProd.prototype.id,
  ProcessTranslationProdRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(ProcessTranslationProd, dataSource);
  }
}
